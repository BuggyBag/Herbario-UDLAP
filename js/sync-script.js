/**
 * sync-script.js — Sincronización DwC-A ↔ Firestore
 * Herbario Digital UDLAP
 * =====================================================
 * Script Node.js para ejecutar manualmente o de forma
 * periódica (cron). Importa el Darwin Core Archive
 * exportado desde RDHM y lo sincroniza con Firestore.
 *
 * USO:
 *   node sync-script.js path/to/occurrence.csv
 *
 * DEPENDENCIAS:
 *   npm install firebase-admin csv-parser
 *
 * REQUISITOS:
 *   - Archivo serviceAccountKey.json del proyecto Firebase
 *   - CSV exportado desde RDHM (DwC-A occurrence.csv)
 * =====================================================
 */

const fs    = require("fs");
const path  = require("path");
const csv   = require("csv-parser");
const admin = require("firebase-admin");

/* ── Configuración ──────────────────────────────────── */

// Ruta al archivo de credenciales de servicio Firebase
const SERVICE_ACCOUNT_PATH = path.resolve(__dirname, "serviceAccountKey.json");

// Colección en Firestore donde se almacenan los especímenes
const COLLECTION_NAME = "specimens";

// Colección para logs de errores
const LOGS_COLLECTION = "sync_logs";

/* ── Inicializar Firebase Admin ─────────────────────── */
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(SERVICE_ACCOUNT_PATH)
  });
}

const db = admin.firestore();

/* ── Mapeo DwC-A → Firestore ────────────────────────── */
/**
 * Transforma una fila del CSV DwC-A al formato Firestore.
 * Adaptar los nombres de columna según el export de RDHM.
 */
function dwcaToFirestore(row) {
  return {
    occurrenceID:    row.occurrenceID       || "",
    numCatalogo:     row.catalogNumber      || "",
    nombreComun:     row.vernacularName     || "",
    especie:         `${row.genus || ""} ${row.specificEpithet || ""}`.trim(),
    genero:          row.genus              || "",
    familia:         row.family             || "",
    orden:           row.order              || "",
    clase:           row.class              || "",
    division:        row.phylum             || "",
    reino:           row.kingdom            || "",
    recolector:      row.recordedBy         || "",
    determinador:    row.identifiedBy       || "",
    fechaRecolecta:  row.eventDate          || "",
    lugarRecolecta:  row.locality           || "",
    municipio:       row.municipality       || "",
    estadoMX:        row.stateProvince      || "",
    pais:            row.country            || "México",
    latitud:         parseFloat(row.decimalLatitude)  || null,
    longitud:        parseFloat(row.decimalLongitude) || null,
    altitud:         row.verbatimElevation  || "",
    habitat:         row.habitat            || "",
    notas:           row.occurrenceRemarks  || "",
    estadoConservacion: row.iucnRedListCategory || "",
    imageURL:        row.associatedMedia    || "",
    // Campos propios de Firestore (no sobreescribir si ya existen)
    _lastSynced:     admin.firestore.FieldValue.serverTimestamp()
  };
}

/* ── Lógica de sincronización ───────────────────────── */
async function syncDwCA(filePath) {
  console.log(`\n🌿 Iniciando sincronización — ${new Date().toISOString()}`);
  console.log(`   Archivo: ${filePath}\n`);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Archivo no encontrado: ${filePath}`);
    process.exit(1);
  }

  const rows = [];

  // Leer CSV
  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", row => rows.push(row))
      .on("end", resolve)
      .on("error", reject);
  });

  console.log(`📄 Registros leídos del CSV: ${rows.length}\n`);

  const resultados = {
    actualizados: 0,
    sinID:        0,
    errores:      []
  };

  // Procesar en lotes de 500 (límite Firestore)
  const BATCH_SIZE = 400;
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const lote = rows.slice(i, i + BATCH_SIZE);
    const batch = db.batch();

    for (const row of lote) {
      const occurrenceID = (row.occurrenceID || "").trim();

      if (!occurrenceID) {
        resultados.sinID++;
        resultados.errores.push({
          tipo: "sin_occurrenceID",
          fila: i + lote.indexOf(row) + 2,
          datos: row.catalogNumber || "(sin catálogo)"
        });
        continue;
      }

      try {
        const docRef = db.collection(COLLECTION_NAME).doc(occurrenceID);
        const datos  = dwcaToFirestore(row);

        // merge:true conserva campos propios (citasCount, etc.)
        batch.set(docRef, datos, { merge: true });
        resultados.actualizados++;
      } catch (err) {
        resultados.errores.push({
          tipo: "error_escritura",
          occurrenceID,
          mensaje: err.message
        });
      }
    }

    await batch.commit();
    console.log(`   ✅ Lote ${Math.floor(i/BATCH_SIZE)+1} procesado (${lote.length} registros)`);
  }

  // Guardar log en Firestore
  const logEntry = {
    timestamp:   admin.firestore.FieldValue.serverTimestamp(),
    archivo:     path.basename(filePath),
    totalLeidos: rows.length,
    actualizados: resultados.actualizados,
    sinID:        resultados.sinID,
    errores:      resultados.errores
  };

  if (resultados.errores.length > 0) {
    logEntry.tipo = "sync_partial";
    console.warn(`\n⚠️  ${resultados.errores.length} error(es) durante la sincronización:`);
    resultados.errores.forEach(e => console.warn("  •", JSON.stringify(e)));
  } else {
    logEntry.tipo = "sync_ok";
  }

  await db.collection(LOGS_COLLECTION).add(logEntry);

  console.log(`
─────────────────────────────────────────
✅ Sincronización completada
   Leídos:       ${rows.length}
   Actualizados: ${resultados.actualizados}
   Sin ID:       ${resultados.sinID}
   Errores:      ${resultados.errores.length}
─────────────────────────────────────────\n`);
}

/* ── Entry point ──────────────────────────────────────  */
const archivoCSV = process.argv[2];

if (!archivoCSV) {
  console.error("Uso: node sync-script.js <ruta/al/occurrence.csv>");
  process.exit(1);
}

syncDwCA(archivoCSV).catch(err => {
  console.error("Error fatal:", err);
  process.exit(1);
});

/**
 * db.js — Capa de Acceso a Datos · Herbario UDLAP
 * =================================================
 * Este archivo centraliza TODA la lógica de acceso a datos.
 * Contiene dos secciones claramente separadas:
 *
 *   ① FIREBASE / FIRESTORE (comentado — rellenar credenciales para activar)
 *   ② MOCK ACCESS (activo — usa mock-database.js)
 *
 * Para migrar a Firebase:
 *   1. Rellena las credenciales en la sección ①
 *   2. Comenta o elimina toda la sección ② (Mock)
 *   3. Descomenta la sección ①
 *   4. Asegúrate de cargar los SDK de Firebase en cada HTML
 *      ANTES de cargar este archivo.
 * =================================================
 */


/* ╔══════════════════════════════════════════════════════════════╗
   ║  ①  CONEXIÓN FIREBASE / FIRESTORE                           ║
   ║  ─────────────────────────────────────────────────────────  ║
   ║  Descomenta este bloque completo cuando tengas credenciales  ║
   ╚══════════════════════════════════════════════════════════════╝

// ── Importaciones (módulos ES, si usas bundler o type="module") ──
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
// import { getFirestore, collection, doc, getDoc, getDocs,
//          addDoc, updateDoc, query, where, orderBy, limit,
//          serverTimestamp, increment }
//   from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
// import { getAuth, onAuthStateChanged, signInWithPopup,
//          GoogleAuthProvider, signOut }
//   from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ── Configuración del proyecto Firebase ──────────────────────────
// const firebaseConfig = {
//   apiKey:            "TU_API_KEY",
//   authDomain:        "TU_PROYECTO.firebaseapp.com",
//   projectId:         "TU_PROYECTO_ID",
//   storageBucket:     "TU_PROYECTO.appspot.com",
//   messagingSenderId: "TU_MESSAGING_ID",
//   appId:             "TU_APP_ID"
// };

// ── Inicialización ───────────────────────────────────────────────
// const _app  = initializeApp(firebaseConfig);
// const _db   = getFirestore(_app);
// const _auth = getAuth(_app);

// ══════════════════════════════════════════════════════════════════
// FUNCIONES DE ACCESO — FIREBASE (descomentar junto con lo anterior)
// ══════════════════════════════════════════════════════════════════

// /** Devuelve todos los especímenes (opcional: límite) *
// async function getSpecimens(limitN = 100) {
//   const snap = await getDocs(
//     query(collection(_db, "specimens"), limit(limitN))
//   );
//   return snap.docs.map(d => ({ id: d.id, ...d.data() }));
// }

// /** Busca especímenes por campo de texto (genus, family, commonName) *
// async function searchSpecimens(queryStr, field = "genero") {
//   const snap = await getDocs(
//     query(
//       collection(_db, "specimens"),
//       where(field, ">=", queryStr),
//       where(field, "<=", queryStr + "\uf8ff"),
//       limit(20)
//     )
//   );
//   return snap.docs.map(d => ({ id: d.id, ...d.data() }));
// }

// /** Obtiene un espécimen por su occurrenceID *
// async function getSpecimenById(occurrenceID) {
//   const docSnap = await getDoc(doc(_db, "specimens", occurrenceID));
//   return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
// }

// /** Filtra especímenes por familia, género o estado *
// async function filterSpecimens({ familia, genero, estadoMX } = {}) {
//   let q = collection(_db, "specimens");
//   if (familia)  q = query(q, where("familia", "==", familia));
//   if (genero)   q = query(q, where("genero",  "==", genero));
//   if (estadoMX) q = query(q, where("estadoMX","==", estadoMX));
//   const snap = await getDocs(q);
//   return snap.docs.map(d => ({ id: d.id, ...d.data() }));
// }

// /** Incrementa el contador de citas de un espécimen *
// async function incrementarCita(occurrenceID) {
//   await updateDoc(doc(_db, "specimens", occurrenceID), {
//     citasCount: increment(1)
//   });
// }

// /** Registra un nuevo espécimen *
// async function registrarEspecimen(datos) {
//   const occurrenceID = generarOccurrenceID();
//   const numCatalogo  = generarNumCatalogo(datos.genero, datos.especie);
//   const payload = {
//     ...datos,
//     occurrenceID,
//     numCatalogo,
//     citasCount: 0,
//     fechaRegistro: serverTimestamp()
//   };
//   await addDoc(collection(_db, "specimens"), payload);
//   return { occurrenceID, numCatalogo };
// }

// /** Devuelve talleres ordenados por fecha descendente *
// async function getTalleres() {
//   const snap = await getDocs(
//     query(collection(_db, "workshops"), orderBy("fecha", "desc"))
//   );
//   return snap.docs.map(d => ({ id: d.id, ...d.data() }));
// }

// /** Devuelve materiales disponibles para usuarios autenticados *
// async function getMateriales() {
//   const snap = await getDocs(collection(_db, "materials"));
//   return snap.docs.map(d => ({ id: d.id, ...d.data() }));
// }

// /** Verifica rol del usuario autenticado *
// async function getUserRole(uid) {
//   const docSnap = await getDoc(doc(_db, "users", uid));
//   return docSnap.exists() ? docSnap.data().rol : "guest";
// }

// /** Auth: escucha cambios de sesión *
// function onSession(callback) {
//   return onAuthStateChanged(_auth, callback);
// }

// /** Auth: inicia sesión con Google (cuenta institucional) *
// async function loginConGoogle() {
//   const provider = new GoogleAuthProvider();
//   provider.setCustomParameters({ hd: "udlap.mx" });
//   const result = await signInWithPopup(_auth, provider);
//   return result.user;
// }

// /** Auth: cierra sesión *
// async function logout() {
//   await signOut(_auth);
// }

// ── Credenciales RDHM (para autenticación automática en background) ──
// const RDHM_CREDENTIALS = {
//   url_edit: "https://rdhm.ibunam.com/portal/edit",
//   url_home: "https://rdhm.ibunam.com/portal",
//   username: "udlap_herbario",     // rellenar
//   password: "TU_PASSWORD_RDHM"    // rellenar — NO commitear en git
// };

// /** Abre RDHM con autenticación automática en background *
// async function abrirRDHM(destino = "home") {
//   const creds = await getDoc(doc(_db, "config", "rdhm_credentials"));
//   const { username, password } = creds.data();
//   const url = destino === "edit" ? RDHM_CREDENTIALS.url_edit : RDHM_CREDENTIALS.url_home;
//   // Implementar autenticación automática vía fetch + cookie o similar
//   window.open(url, "_blank");
// }

   ╔══════════════════════════════════════════════════════════════╗
   ║  FIN BLOQUE FIREBASE                                         ║
   ╚══════════════════════════════════════════════════════════════╝ */


/* ╔══════════════════════════════════════════════════════════════╗
   ║  ②  ACCESO MOCK (activo mientras no haya Firebase)          ║
   ║  ─────────────────────────────────────────────────────────  ║
   ║  Usa los datos de mock-database.js                           ║
   ║  Todas las funciones son síncronas envueltas en Promise      ║
   ║  para que la firma sea idéntica a la versión Firebase.       ║
   ╚══════════════════════════════════════════════════════════════╝ */

/**
 * Devuelve todos los especímenes mock.
 * @param {number} limitN - máximo de resultados
 */
async function getSpecimens(limitN = 100) {
  return Promise.resolve([...PLANTAS_MOCK].slice(0, limitN));
}

/**
 * Busca especímenes por texto libre en nombre común, especie,
 * género, familia o recolector.
 * @param {string} queryStr - cadena de búsqueda
 */
async function searchSpecimens(queryStr) {
  const q = queryStr.toLowerCase().trim();
  const resultados = PLANTAS_MOCK.filter(p =>
    [p.nombreComun, p.especie, p.genero, p.familia, p.recolector]
      .some(campo => (campo || "").toLowerCase().includes(q))
  );
  return Promise.resolve(resultados);
}

/**
 * Obtiene un espécimen por su occurrenceID.
 * @param {string} occurrenceID
 */
async function getSpecimenById(occurrenceID) {
  const encontrado = PLANTAS_MOCK.find(p => p.occurrenceID === occurrenceID) || null;
  return Promise.resolve(encontrado);
}

/**
 * Filtra especímenes por familia, género y/o estado.
 * @param {object} filtros - { familia, genero, estadoMX }
 */
async function filterSpecimens({ familia = "", genero = "", estadoMX = "" } = {}) {
  let resultado = [...PLANTAS_MOCK];
  if (familia)  resultado = resultado.filter(p => p.familia  === familia);
  if (genero)   resultado = resultado.filter(p => p.genero   === genero);
  if (estadoMX) resultado = resultado.filter(p => p.estadoMX === estadoMX);
  return Promise.resolve(resultado);
}

/**
 * Incrementa el contador de citas de un espécimen en el mock local.
 * (En Firebase esto actualiza Firestore con increment(1))
 * @param {string} occurrenceID
 */
async function incrementarCita(occurrenceID) {
  const planta = PLANTAS_MOCK.find(p => p.occurrenceID === occurrenceID);
  if (planta) planta.citasCount = (planta.citasCount || 0) + 1;
  return Promise.resolve();
}

/**
 * Registra un nuevo espécimen en el mock array.
 * Genera automáticamente occurrenceID y numCatalogo.
 * @param {object} datos - campos del espécimen sin id ni catálogo
 */
async function registrarEspecimen(datos) {
  const occurrenceID = generarOccurrenceID();
  const numCatalogo  = generarNumCatalogo(datos.genero, datos.especie, PLANTAS_MOCK.length + 1);
  const nuevo = {
    ...datos,
    id: occurrenceID,
    occurrenceID,
    numCatalogo,
    citasCount: 0,
    fechaRegistro: new Date().toISOString().split("T")[0]
  };
  PLANTAS_MOCK.push(nuevo);
  console.log("[MOCK] Espécimen registrado:", occurrenceID, numCatalogo);
  return Promise.resolve({ occurrenceID, numCatalogo });
}

/**
 * Devuelve talleres ordenados por fecha descendente.
 */
async function getTalleres() {
  const ordenados = [...TALLERES_MOCK].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );
  return Promise.resolve(ordenados);
}

/**
 * Devuelve materiales descargables.
 */
async function getMateriales() {
  return Promise.resolve([...MATERIALES_MOCK]);
}

/**
 * Verifica el rol del usuario. Con mock usa SESION_MOCK.
 * @param {string} uid - ignorado en mock, usa SESION_MOCK
 */
async function getUserRole(uid) {
  return Promise.resolve(SESION_MOCK.rolActivo || "guest");
}

/**
 * Simula escucha de estado de sesión.
 * Llama al callback inmediatamente con el usuario mock (o null).
 * @param {function} callback - recibe (user | null)
 */
function onSession(callback) {
  const user = SESION_MOCK.activa ? SESION_MOCK.usuario : null;
  setTimeout(() => callback(user), 50); // simula async
  return () => {}; // función de unsubscribe vacía
}

/**
 * Simula inicio de sesión con cuenta institucional.
 * Activa la sesión mock con rol 'user'.
 */
async function loginConGoogle() {
  SESION_MOCK.activa = true;
  SESION_MOCK.rolActivo = "user";
  SESION_MOCK.usuario = USUARIOS_MOCK[2]; // Dr. Héctor (rol user)
  console.log("[MOCK] Sesión iniciada:", SESION_MOCK.usuario.email);
  return Promise.resolve(SESION_MOCK.usuario);
}

/**
 * Simula cierre de sesión.
 */
async function logout() {
  SESION_MOCK.activa = false;
  SESION_MOCK.rolActivo = "guest";
  SESION_MOCK.usuario = null;
  console.log("[MOCK] Sesión cerrada.");
  return Promise.resolve();
}

/**
 * Simula apertura de RDHM con autenticación automática.
 * @param {string} destino - "home" | "edit"
 */
async function abrirRDHM(destino = "home") {
  const urls = {
    home: "https://rdhm.ibunam.com/portal",
    edit: "https://rdhm.ibunam.com/portal/edit"
  };
  console.log("[MOCK] Abriendo RDHM (simulado) →", urls[destino] || urls.home);
  // En producción aquí se obtienen credenciales de Firestore y se hace auth automática
  window.open(urls[destino] || urls.home, "_blank");
  return Promise.resolve();
}


/* ─────────────────────────────────────────────────────────────
   UTILIDADES COMPARTIDAS (Firebase y Mock usan las mismas)
───────────────────────────────────────────────────────────── */

/**
 * Genera un OccurrenceID único en formato UDLAP:herbarium:XXXXXXXX
 * 8 caracteres hexadecimales aleatorios.
 */
function generarOccurrenceID() {
  const hex = Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
  return `UDLAP:herbarium:${hex}`;
}

/**
 * Genera el número de catálogo con formato geno-espe-#####
 * Toma las 3 primeras letras + la última de género y especie.
 * @param {string} genero
 * @param {string} especie  - solo el epíteto (ej: "annuus")
 * @param {number} numero   - número secuencial de la muestra
 */
function generarNumCatalogo(genero, especie, numero) {
  const fmt = str => {
    const s = (str || "").toLowerCase().replace(/[^a-z]/g, "");
    if (s.length < 4) return s.padEnd(4, "x");
    return s.slice(0, 3) + s.slice(-1);
  };
  const epiteto = especie.includes(" ") ? especie.split(" ")[1] : especie;
  const n = String(numero).padStart(5, "0");
  return `${fmt(genero)}-${fmt(epiteto)}-${n}`;
}

/**
 * Genera el texto de cita académica APA para una muestra.
 * @param {object} especimen
 */
function generarTextoCita(especimen) {
  const año = especimen.fechaRecolecta
    ? especimen.fechaRecolecta.substring(0, 4)
    : new Date().getFullYear();
  return (
    `${especimen.recolector} (${año}). ` +
    `${especimen.especie} [Espécimen de herbario ${especimen.numCatalogo}]. ` +
    `Herbario Digital UDLAP. ` +
    `Número de catálogo: ${especimen.numCatalogo}. ` +
    `OccurrenceID: ${especimen.occurrenceID}. ` +
    `Red de Herbarios Mexicanos.`
  );
}

/**
 * Devuelve lista única de valores para un campo dado
 * (útil para poblar filtros de selección).
 * @param {string} campo - nombre del campo en PLANTAS_MOCK
 */
async function getValoresUnicos(campo) {
  const todos = await getSpecimens();
  const valores = [...new Set(todos.map(p => p[campo]).filter(Boolean))].sort();
  return valores;
}

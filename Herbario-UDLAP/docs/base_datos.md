# Base de Datos — Herbario Digital UDLAP

**Versión:** 1.0 · **Fecha:** 2025

---

## Descripción general

El sistema usa **dos fuentes de datos** según la etapa del proyecto:

| Etapa | Fuente | Archivo |
|---|---|---|
| Desarrollo / pruebas | Datos mock (JavaScript) | `js/mock-database.js` |
| Producción | Firebase Firestore | `js/db.js` (sección Firebase) |

El cambio entre fuentes se hace **únicamente en `js/db.js`**, sin tocar el resto del código.

---

## Identificadores únicos

### OccurrenceID

Identificador principal de cada espécimen, compartido con RDHM.

```
Formato:   UDLAP:herbarium:XXXXXXXX
           │────│ │───────│ │──────│
           Inst. Colección  8 hex aleatorios

Ejemplo:   UDLAP:herbarium:a3f1b2c4
```

**Generado por:** `generarOccurrenceID()` en `js/db.js`

```javascript
function generarOccurrenceID() {
  const hex = Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
  return `UDLAP:herbarium:${hex}`;
}
```

### Número de catálogo

Identificador interno legible, único por combinación de taxón y número.

```
Formato:   geno-espe-#####
           │──│  │──│  │───│
           4 letras  4 letras  5 dígitos
           género    epíteto   secuencial

Ejemplos:
  Helianthus annuus  →  heli-annu-00041
  Bougainvillea glabra  →  boug-glab-00017
  Opuntia ficus-indica  →  opun-ficu-00089
```

**Regla de las 4 letras:** primeras 3 letras + última letra del nombre.

| Nombre | 4 letras |
|---|---|
| Helianthus | heli → heli (h-e-l-i) + s = helis... NO: h-e-l **i** (primera3 = "hel", última = "s") |
| Agave | Primeras 3: "aga" + última: "e" = "agae" |
| Pinus | Primeras 3: "pin" + última: "s" = "pins" |
| Quercus | Primeras 3: "que" + última: "s" = "ques" |

**Generado por:** `generarNumCatalogo(genero, epiteto, numero)` en `js/db.js`

---

## Esquema de colecciones Firestore

### `specimens` — Especímenes botánicos

Documento ID = `occurrenceID`

```javascript
{
  // ── Identificadores ──────────────────────────────────────
  occurrenceID:       "UDLAP:herbarium:a3f1b2c4",  // string, PK = Doc ID
  numCatalogo:        "heli-annu-00041",            // string, formato geno-espe-#####

  // ── Taxonomía ────────────────────────────────────────────
  nombreComun:        "Girasol",                    // string
  especie:            "Helianthus annuus",           // string, género + epíteto
  genero:             "Helianthus",                 // string
  familia:            "Asteraceae",                 // string
  orden:              "Asterales",                  // string
  clase:              "Magnoliopsida",              // string
  division:           "Tracheophyta",               // string
  reino:              "Plantae",                    // string

  // ── Recolecta ─────────────────────────────────────────────
  recolector:         "Dra. Consuelo Vega",         // string → DwC: recordedBy
  determinador:       "Dra. Consuelo Vega",         // string → DwC: identifiedBy
  fechaRecolecta:     "2023-05-14",                 // string ISO → DwC: eventDate
  lugarRecolecta:     "Rancho El Mirador",          // string → DwC: locality
  municipio:          "Tehuacán",                   // string → DwC: municipality
  estadoMX:           "Puebla",                     // string → DwC: stateProvince
  pais:               "México",                     // string → DwC: country
  latitud:            18.4647,                      // number → DwC: decimalLatitude
  longitud:           -97.3923,                     // number → DwC: decimalLongitude
  altitud:            "1850 msnm",                  // string → DwC: verbatimElevation

  // ── Descripción ──────────────────────────────────────────
  habitat:            "Terreno abierto...",         // string → DwC: habitat
  notas:              "Planta cultivada...",        // string → DwC: occurrenceRemarks
  estadoConservacion: "LC",                         // string → DwC: iucnRedListCategory
                                                    // LC, NT, VU, EN, CR, EX, PR

  // ── Medios ───────────────────────────────────────────────
  imageURL:           "https://...",                // string → DwC: associatedMedia
  imagenThumb:        "https://...",                // string, thumb 400px (propio)

  // ── Campos propios UDLAP (no sobreescritos por sync) ──────
  citasCount:         3,                            // number, incrementado por citas
  fechaRegistro:      "2023-05-20",                 // string | Timestamp
  _lastSynced:        Timestamp                     // Timestamp, fecha del último sync
}
```

### `workshops` — Talleres

```javascript
{
  titulo:       "Técnicas de Herborización",  // string
  descripcion:  "Taller práctico...",         // string
  fecha:        "2025-03-15",                 // string ISO
  hora:         "10:00",                      // string HH:MM
  duracion:     "4 horas",                    // string
  lugar:        "Laboratorio de Botánica",    // string
  instructor:   "Dra. Consuelo Vega",         // string
  cupoMax:      20,                           // number
  cupoActual:   18,                           // number
  estado:       "pasado",                     // "pasado" | "proximo"
  registroURL:  "https://registro.udlap.mx/...", // string, solo para próximos
  galeria:      ["https://...", "https://..."]    // string[]
}
```

### `users` — Usuarios del sistema

Documento ID = Firebase Auth UID

```javascript
{
  nombre:    "Consuelo Vega",           // string
  email:     "consuelo.vega@udlap.mx",  // string
  matricula: "126543",                  // string
  rol:       "admin",                   // "guest" | "user" | "admin" | "developer"
  activo:    true                       // boolean
}
```

### `materials` — Materiales descargables

```javascript
{
  titulo:      "Guía de Herborización UDLAP",    // string
  descripcion: "Manual completo...",              // string
  tipo:        "PDF",                             // "PDF" | "XLSX" | "DOCX" | "IMG"
  url:         "https://storage.firebase.../...", // string
  fecha:       "2024-08-15"                       // string ISO
}
```

### `config` — Configuración del sistema

Documento ID = nombre de la configuración

```javascript
// Documento: rdhm_credentials
{
  username: "udlap_herbario",
  password: "••••••••",              // PROTEGIDO por reglas de seguridad
  url_edit: "https://rdhm.ibunam.com/portal/edit",
  url_home: "https://rdhm.ibunam.com/portal"
}
```

### `sync_logs` — Registros de sincronización

```javascript
{
  timestamp:    Timestamp,             // Fecha y hora del sync
  archivo:      "occurrence.csv",      // Nombre del archivo importado
  tipo:         "sync_ok",             // "sync_ok" | "sync_partial"
  totalLeidos:  150,                   // Total de filas en el CSV
  actualizados: 148,                   // Documentos actualizados/creados
  sinID:        0,                     // Filas sin occurrenceID
  errores: [                           // Array de errores (vacío si tipo=sync_ok)
    {
      tipo: "sin_occurrenceID",
      fila: 47,
      datos: "HB-0099"
    }
  ]
}
```

---

## Datos mock disponibles

`js/mock-database.js` incluye:

| Colección | Registros mock |
|---|---|
| `PLANTAS_MOCK` | 12 especímenes con imagen, coordenadas y datos completos |
| `TALLERES_MOCK` | 4 talleres (2 pasados con galería, 2 próximos) |
| `USUARIOS_MOCK` | 3 usuarios (admin, developer, user) |
| `MATERIALES_MOCK` | 4 materiales descargables |
| `FAMILIA_COLORES` | Paleta de colores para 11 familias botánicas |
| `SESION_MOCK` | Control de sesión simulada (configurable) |

---

## Reglas de seguridad Firestore (producción)

Ver sección completa en `docs/manual_administrador.md`.

Resumen:
- **specimens**: lectura pública, escritura solo admin/developer
- **users**: lectura propia o admin, escritura solo admin
- **config**: lectura admin/developer, escritura bloqueada desde cliente
- **sync_logs**: lectura admin, escritura bloqueada desde cliente
- **workshops**: lectura pública
- **materials**: lectura solo autenticados

---

*Documentación de Base de Datos — Herbario Digital UDLAP — v1.0 — 2025*

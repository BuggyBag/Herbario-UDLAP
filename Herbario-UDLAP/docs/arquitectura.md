# Arquitectura del Sistema — Herbario Digital UDLAP

**Versión:** 1.0 · **Fecha:** 2025

---

## Visión general

El portal es una aplicación web estática de una sola capa (sin backend propio),
que consume datos directamente desde Firestore a través del SDK de Firebase
para web. La lógica de acceso a datos está completamente encapsulada en `js/db.js`,
lo que permite operar con datos mock durante el desarrollo y migrar a Firebase
en producción sin modificar ninguna otra parte del código.

```
┌─────────────────────────────────────────────────────────────┐
│                    NAVEGADOR DEL USUARIO                     │
│                                                             │
│  index.html  collection.html  sample.html  admin.html ...   │
│        │           │              │             │           │
│        └───────────┴──────────────┴─────────────┘           │
│                          │                                  │
│                    js/db.js  ◄──── js/mock-database.js      │
│               (capa de acceso)    (datos de prueba)         │
│                          │                                  │
│               js/cards.js  js/filters.js  js/header.js      │
└──────────────────────────┼──────────────────────────────────┘
                           │
              ┌────────────▼────────────┐
              │   Firebase Firestore    │
              │   (producción)          │
              │                         │
              │  Colecciones:           │
              │  · specimens            │
              │  · workshops            │
              │  · users                │
              │  · materials            │
              │  · config               │
              │  · sync_logs            │
              └─────────────────────────┘
                           ▲
                           │ sync-script.js (Node.js)
                           │
              ┌────────────┴────────────┐
              │       RDHM              │
              │  (Red de Herbarios      │
              │   Mexicanos)            │
              │                         │
              │  Exporta:               │
              │  · occurrence.csv       │
              │    (DwC-A format)       │
              └─────────────────────────┘
```

---

## Capas de la aplicación

### Capa de Presentación (HTML + CSS)

| Archivo | Página | Descripción |
|---|---|---|
| `index.html` | Inicio | Buscador, filtros, mosaico principal |
| `collection.html` | Colección | Ficheros por familia + mosaico filtrado |
| `sample.html` | Ficha | Detalle completo del espécimen |
| `workshops.html` | Talleres | Historial + próximos + registro QR |
| `about.html` | Acerca | Contenido estático informativo |
| `profile.html` | Perfil | Auth + materiales descargables |
| `admin.html` | Admin | Panel de control (permisos restringidos) |
| `css/styles.css` | Global | Variables, componentes, responsive, dark mode |

### Capa de Lógica de UI (JavaScript)

| Archivo | Responsabilidad |
|---|---|
| `js/header.js` | Inyección del header, hamburguesa, dark mode, nav activa |
| `js/cards.js` | Creación y renderizado de tarjetas de especímenes |
| `js/filters.js` | Búsqueda de texto, autocompletado, filtros por campo |

### Capa de Acceso a Datos

| Archivo | Responsabilidad |
|---|---|
| `js/mock-database.js` | Datos de prueba: PLANTAS_MOCK, TALLERES_MOCK, USUARIOS_MOCK |
| `js/db.js` | Funciones de acceso: `getSpecimens()`, `searchSpecimens()`, etc. |

### Capa de Sincronización (Node.js, solo backend)

| Archivo | Responsabilidad |
|---|---|
| `js/sync-script.js` | Importar DwC-A CSV de RDHM → Firestore |

---

## Flujo de datos

### Consulta de especímenes (modo mock)

```
Usuario → index.html
  → DOMContentLoaded
  → getSpecimens()               [db.js]
    → PLANTAS_MOCK               [mock-database.js]
  → iniciarFiltros(especimenes)  [filters.js]
  → renderizarGrid(especimenes)  [cards.js]
    → crearTarjeta(planta) × N   [cards.js]
  → Grid visible en pantalla
```

### Consulta de especímenes (modo Firebase)

```
Usuario → index.html
  → DOMContentLoaded
  → getSpecimens()                [db.js]
    → getDocs(collection("specimens"))  [Firestore SDK]
  → iniciarFiltros(especimenes)   [filters.js]
  → renderizarGrid(especimenes)   [cards.js]
  → Grid visible en pantalla
```

### Ver ficha de espécimen

```
Click en tarjeta
  → sample.html?id=UDLAP:herbarium:XXXXXXXX
  → getSpecimenById(id)            [db.js]
  → renderSample(planta)
  → Click en "Generar cita"
    → generarTextoCita(planta)     [db.js - utilidad compartida]
    → mostrarCita()
    → incrementarCita(id)          [db.js]
```

### Sincronización RDHM → Firestore

```
Admin exporta occurrence.csv desde RDHM
  → node sync-script.js occurrence.csv
    → Leer CSV fila por fila
    → Para cada fila:
        → dwcaToFirestore(row)
        → batch.set(docRef, datos, { merge: true })
    → batch.commit()
    → Registrar log en sync_logs
```

---

## Modelo de datos

### Colección: `specimens`

```
Document ID: occurrenceID (ej: "UDLAP:herbarium:a3f1b2c4")
{
  occurrenceID:    string  // "UDLAP:herbarium:a3f1b2c4"
  numCatalogo:     string  // "heli-annu-00041"
  nombreComun:     string
  especie:         string  // "Helianthus annuus"
  genero:          string
  familia:         string
  orden:           string
  clase:           string
  division:        string
  reino:           string
  recolector:      string
  determinador:    string
  fechaRecolecta:  string  // ISO: "2023-05-14"
  lugarRecolecta:  string
  municipio:       string
  estadoMX:        string
  pais:            string
  latitud:         number | null
  longitud:        number | null
  altitud:         string
  habitat:         string
  notas:           string
  estadoConservacion: string  // "LC", "PR", "VU", etc.
  imageURL:        string
  imagenThumb:     string
  citasCount:      number  // Campo propio, no sincronizado desde DwC-A
  fechaRegistro:   string | Timestamp
  _lastSynced:     Timestamp
}
```

### Colección: `workshops`

```
Document ID: auto
{
  titulo:       string
  descripcion:  string
  fecha:        string  // "2025-05-08"
  hora:         string  // "09:00"
  duracion:     string
  lugar:        string
  instructor:   string
  cupoMax:      number
  cupoActual:   number
  estado:       "pasado" | "proximo"
  registroURL:  string  // para próximos
  galeria:      string[]  // URLs de fotos
}
```

### Colección: `users`

```
Document ID: Firebase Auth UID
{
  nombre:    string
  email:     string
  matricula: string
  rol:       "guest" | "user" | "admin" | "developer"
  activo:    boolean
}
```

### Colección: `config`

```
Document ID: "rdhm_credentials"
{
  username: string  // cifrado o protegido por reglas
  password: string  // cifrado o protegido por reglas
  url_edit: string
  url_home: string
}
```

### Colección: `sync_logs`

```
Document ID: auto
{
  timestamp:    Timestamp
  archivo:      string
  tipo:         "sync_ok" | "sync_partial"
  totalLeidos:  number
  actualizados: number
  sinID:        number
  errores:      object[]
}
```

---

## Decisiones de diseño

### ¿Por qué sin framework?

El proyecto prioriza **gratuidad, mantenibilidad y escalabilidad simple**.
Un sitio HTML+CSS+JS vanilla:
- No requiere build tools (webpack, vite, etc.)
- No tiene dependencias npm que gestionar para el frontend
- Puede ser servido desde Firebase Hosting, GitHub Pages o cualquier CDN
- Cualquier desarrollador de UDLAP puede entender y modificar el código

### ¿Por qué `db.js` como capa intermedia?

Para que el cambio de mock a producción sea **un solo punto de modificación**:
el resto del código (HTML, cards, filters) no sabe ni le importa si los datos
vienen de un array local o de Firestore. La firma de las funciones es idéntica
en ambos modos (todas son `async`, todas devuelven promesas).

### ¿Por qué el mock en su propio archivo?

Para que sea **fácil de ubicar, editar y eventualmente eliminar** cuando se
migre a Firebase. Tener los datos de prueba mezclados con la lógica de acceso
dificultaría la migración y el mantenimiento.

---

*Arquitectura — Herbario Digital UDLAP — v1.0 — 2025*

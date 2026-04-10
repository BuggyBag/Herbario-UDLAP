# 🌿 Herbario Digital UDLAP

Portal web de la colección botánica de la **Universidad de las Américas Puebla**,
integrado con la Red de Herbarios Mexicanos (RDHM) y el estándar Darwin Core Archive.

---

## Estructura del proyecto

```
Herbario-UDLAP/
├── index.html            ← Página de inicio (buscador + mosaico)
├── collection.html       ← Colección por familias (ficheros)
├── workshops.html        ← Talleres pasados y próximos
├── about.html            ← Acerca del Herbario
├── profile.html          ← Perfil / sesión institucional
├── sample.html           ← Ficha detallada de espécimen
├── admin.html            ← Panel de Control (admin/developer)
│
├── css/
│   └── styles.css        ← Estilos globales (dark mode, responsive)
│
├── js/
│   ├── mock-database.js  ← 📦 BASE DE DATOS MOCK (datos de prueba)
│   ├── db.js             ← 🔌 CAPA DE ACCESO A DATOS
│   │                         (Firebase comentado arriba, Mock activo abajo)
│   ├── header.js         ← Componente de navegación compartida
│   ├── cards.js          ← Renderizado de tarjetas mosaico
│   ├── filters.js        ← Búsqueda, autocompletado y filtros
│   └── sync-script.js    ← Script Node.js para sincronizar DwC-A ↔ Firestore
│
└── docs/
    ├── manual_navegacion.md
    ├── manual_administrador.md
    ├── arquitectura.md
    ├── base_datos.md
    └── diagrama_sincronizacion.md
```

---

## Archivos clave

| Archivo | Propósito |
|---|---|
| `js/mock-database.js` | **Base de datos mock** — todos los datos de prueba en un solo lugar |
| `js/db.js` | **Capa de acceso** — cambia de mock a Firebase editando solo este archivo |

---

## Inicio rápido (sin servidor)

1. Clona o descarga el repositorio
2. Abre `index.html` en cualquier navegador moderno
3. Todo funciona con datos mock sin necesidad de conexión

> ⚠️ Para funciones que requieren `fetch()` (autocompletado avanzado, etc.)
> usa un servidor local: `npx serve .` o `python -m http.server`

---

## Migrar a Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilita Firestore y Authentication (Google)
3. Abre `js/db.js` y:
   - **Descomenta** el bloque `① FIREBASE / FIRESTORE`
   - **Comenta o elimina** el bloque `② ACCESO MOCK`
   - Rellena `firebaseConfig` con tus credenciales
4. Agrega en cada HTML los SDK de Firebase (ver comentario en `db.js`)

---

## Sincronización con RDHM

```bash
# Instalar dependencias
npm install firebase-admin csv-parser

# Ejecutar sync con el DwC-A exportado desde RDHM
node js/sync-script.js ruta/al/occurrence.csv
```

El script compara occurrenceIDs, actualiza documentos existentes (preservando
`citasCount` y otros campos propios) y registra errores en la colección `sync_logs`.

---

## Tecnologías

- HTML5 / CSS3 / JavaScript ES2020 (vanilla, sin frameworks)
- Firebase Firestore + Authentication *(preparado, pendiente credenciales)*
- Darwin Core Archive (DwC-A) como formato de intercambio
- Fuentes: Cormorant Garamond + Outfit (Google Fonts)

---

## Licencia

Uso interno UDLAP. Consulta `LICENSE` para detalles.

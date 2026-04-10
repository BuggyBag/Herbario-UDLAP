# Manual de Administrador — Herbario Digital UDLAP

**Versión:** 1.0 · **Fecha:** 2025  
**Audiencia:** Administradores y Desarrolladores del sistema

---

## Contenido

1. [Acceso al Panel de Control](#1-acceso-al-panel-de-control)
2. [Registro de nueva muestra](#2-registro-de-nueva-muestra)
3. [Consultar la base de datos](#3-consultar-la-base-de-datos)
4. [Editar registros en RDHM](#4-editar-registros-en-rdhm)
5. [Sincronización DwC-A ↔ Firestore](#5-sincronización-dwc-a-↔-firestore)
6. [Gestión de usuarios y permisos](#6-gestión-de-usuarios-y-permisos)
7. [Migración de Mock a Firebase](#7-migración-de-mock-a-firebase)
8. [Solución de problemas comunes](#8-solución-de-problemas-comunes)

---

## 1. Acceso al Panel de Control

El Panel de Control (`admin.html`) está restringido a usuarios con rol **admin** o **developer**.

### Cómo acceder

**Opción A — Desde el perfil:**
1. Ve a la página **Perfil**
2. Inicia sesión con cuenta institucional `@udlap.mx`
3. Si tienes permisos, aparece el botón **⚙️ Panel de Control**

**Opción B — Desde el menú hamburguesa:**
1. Haz clic en ☰ (izquierda del header)
2. Si tienes permisos, aparece **⚙️ Panel de Control** en el menú desplegable

**Opción C — URL directa:**
Navega directamente a `admin.html`. Si no tienes permisos, verás un mensaje de acceso denegado.

### Verificación de permisos

El sistema verifica el rol del usuario al cargar la página mediante la función `getUserRole()` en `js/db.js`.

En modo **mock**, el rol lo controla `SESION_MOCK.rolActivo` en `js/mock-database.js`:
```javascript
const SESION_MOCK = {
  activa: true,
  rolActivo: "admin",   // Cambia aquí para probar
  usuario: USUARIOS_MOCK[0]
};
```

En **producción (Firebase)**, el rol se obtiene del documento del usuario en la colección `users` de Firestore.

---

## 2. Registro de nueva muestra

### Desde el Panel de Control

1. Haz clic en **🌱 Registro Nuevo**
2. Se abre un modal con el formulario de captura
3. Llena los campos (los marcados con `*` son obligatorios):
   - Nombre Común `*`
   - Género `*` (solo el género, ej: `Helianthus`)
   - Especie `*` (nombre completo, ej: `Helianthus annuus`)
   - Familia `*` (ej: `Asteraceae`)
   - Recolector, Fecha, Localidad, Municipio, Estado, Altitud
   - Hábitat, Notas, URL de imagen
4. Conforme escribes Género y Especie, el sistema genera automáticamente un **preview** del N.° de Catálogo
5. Haz clic en **💾 Guardar registro**

### Identificadores generados automáticamente

| Campo | Formato | Ejemplo |
|---|---|---|
| N.° Catálogo | `geno-espe-#####` | `heli-annu-00041` |
| OccurrenceID | `UDLAP:herbarium:XXXXXXXX` | `UDLAP:herbarium:a3f1b2c4` |

**Algoritmo del N.° de Catálogo:**
- Toma las **3 primeras letras + la última** del género
- Aplica el mismo patrón al epíteto de la especie
- Agrega el número secuencial con 5 dígitos con ceros a la izquierda

```
Helianthus annuus → heli + annu + número = heli-annu-00041
Bougainvillea glabra → boug + glab + número = boug-glab-00017
```

### ⚠️ Importante: registro en RDHM

El registro en el sistema UDLAP **no registra automáticamente en RDHM**.  
Después de guardar en el sistema:

1. Accede al portal RDHM mediante el botón **🌐 Portal RDHM** o **✏️ Editar Base de Datos**
2. Crea el registro manualmente en RDHM usando el mismo OccurrenceID
3. En la próxima sincronización (ver sección 5), el registro se vinculará correctamente

---

## 3. Consultar la base de datos

1. Haz clic en **📊 Consultar Base de Datos**
2. Aparece una tabla con todos los registros con columnas:
   - N.° Catálogo, Nombre Común, Especie, Familia
   - Estado, Recolector, Fecha, OccurrenceID, Citas

La tabla carga hasta **500 registros** en modo mock (en producción ajustar el límite en `db.js`).

---

## 4. Editar registros en RDHM

El sistema abre automáticamente el portal RDHM con autenticación en segundo plano.

### Configuración de credenciales RDHM (producción)

Las credenciales se almacenan en Firestore bajo `config/rdhm_credentials` para
que nunca estén expuestas en el código fuente del cliente:

```
Firestore → Colección: config → Documento: rdhm_credentials
  username: "udlap_herbario"
  password: "••••••••"
  url_edit: "https://rdhm.ibunam.com/portal/edit"
  url_home: "https://rdhm.ibunam.com/portal"
```

La función `abrirRDHM()` en `db.js` recupera estas credenciales y realiza la
autenticación automática antes de abrir la URL destino.

> ⚠️ **Seguridad:** Las credenciales RDHM NUNCA deben estar en el código fuente
> del cliente. Siempre deben estar en Firestore con reglas de seguridad estrictas
> que solo permitan lectura a usuarios autenticados con rol admin/developer.

---

## 5. Sincronización DwC-A ↔ Firestore

Este proceso importa los datos exportados desde RDHM hacia Firestore.

### Cuándo sincronizar

- Después de registrar nuevas muestras en RDHM
- Después de editar o corregir registros en RDHM
- Periódicamente (mensual o cuando sea necesario)

### Proceso paso a paso

**1. Exportar DwC-A desde RDHM**
1. Accede al portal RDHM
2. Ve a tu colección UDLAP
3. Descarga el archivo Darwin Core Archive (`occurrence.csv`)

**2. Ejecutar el script de sincronización**
```bash
# Desde la raíz del proyecto
node js/sync-script.js ruta/al/occurrence.csv
```

**3. Revisar el output**
El script muestra:
```
🌿 Iniciando sincronización — 2025-06-15T10:00:00Z
   Archivo: occurrence.csv

📄 Registros leídos del CSV: 150

   ✅ Lote 1 procesado (150 registros)

─────────────────────────────────────────
✅ Sincronización completada
   Leídos:       150
   Actualizados: 148
   Sin ID:       0
   Errores:      2
─────────────────────────────────────────
```

**4. Revisar errores**
Los errores quedan registrados en Firestore bajo `sync_logs`.  
Un error típico indica un OccurrenceID que existe en RDHM pero no en Firestore
(registro creado directamente en RDHM sin pasar por el sistema UDLAP).

### Control de redundancia

| Caso | Estado | Acción |
|---|---|---|
| OccurrenceID en DwC-A ✅ y en Firestore ✅ | Correcto | Actualización normal |
| OccurrenceID en DwC-A ✅ pero NO en Firestore ❌ | Error | Log + crear manualmente |
| OccurrenceID en Firestore ✅ pero NO en DwC-A ❌ | Advertencia | Revisar en RDHM |
| Fila en DwC-A sin OccurrenceID ❌ | Error | Log + corregir en RDHM |

---

## 6. Gestión de usuarios y permisos

### Roles del sistema

| Rol | Acceso al Portal | Panel de Control | Materiales | Registro en talleres |
|---|---|---|---|---|
| `guest` | ✅ Solo lectura | ❌ | ❌ | Con QR |
| `user` | ✅ | ❌ | ✅ | Con cuenta |
| `admin` | ✅ | ✅ | ✅ | Con cuenta |
| `developer` | ✅ | ✅ | ✅ | Con cuenta |

### Asignar permisos (producción Firebase)

Los permisos se gestionan desde la consola de Firebase:

1. Ve a Firebase Console → Firestore
2. Abre la colección `users`
3. Encuentra el documento del usuario (ID = Firebase UID)
4. Cambia el campo `rol` a `"admin"`, `"developer"` o `"user"`

> En modo mock, modifica `USUARIOS_MOCK` en `js/mock-database.js`

---

## 7. Migración de Mock a Firebase

Cuando el sistema esté listo para producción:

### Paso 1 — Crear proyecto Firebase
1. Ve a [console.firebase.google.com](https://console.firebase.google.com)
2. Crea un nuevo proyecto (ej: `herbario-udlap`)
3. Habilita **Firestore Database** en modo producción
4. Habilita **Authentication** → Google Provider

### Paso 2 — Obtener configuración
En Firebase Console → Configuración del proyecto → Tus apps → Web app:
```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "herbario-udlap.firebaseapp.com",
  projectId: "herbario-udlap",
  storageBucket: "herbario-udlap.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};
```

### Paso 3 — Editar `js/db.js`
1. Descomenta el bloque `① FIREBASE / FIRESTORE`
2. Pega la configuración en `firebaseConfig`
3. Comenta o elimina el bloque `② ACCESO MOCK`

### Paso 4 — Agregar SDKs a los HTML
Antes de `<script src="js/db.js">` en cada página HTML, agrega:
```html
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js"></script>
```

### Paso 5 — Configurar reglas de seguridad Firestore
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Especímenes: lectura pública, escritura solo admin/developer
    match /specimens/{id} {
      allow read: if true;
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.rol
          in ['admin', 'developer'];
    }

    // Usuarios: solo lectura propia o admin
    match /users/{uid} {
      allow read: if request.auth.uid == uid ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.rol == 'admin';
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.rol == 'admin';
    }

    // Configuración (credenciales RDHM): solo admin/developer
    match /config/{doc} {
      allow read: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.rol
          in ['admin', 'developer'];
      allow write: if false; // Solo desde Firebase Console
    }

    // Logs: lectura admin, escritura solo desde backend
    match /sync_logs/{id} {
      allow read: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.rol == 'admin';
      allow write: if false;
    }

    // Talleres y materiales: lectura pública (materiales requieren auth)
    match /workshops/{id} { allow read: if true; }
    match /materials/{id} { allow read: if request.auth != null; }
  }
}
```

### Paso 6 — Primera sincronización
Con Firebase activo, ejecuta el sync script para poblar Firestore desde el DwC-A de RDHM.

### Paso 7 — Primer usuario admin
En Firestore, crea manualmente el documento del primer administrador:
```
Colección: users
Documento ID: (Firebase UID del usuario)
Campos:
  nombre: "Nombre del Admin"
  email: "admin@udlap.mx"
  rol: "admin"
  activo: true
```

---

## 8. Solución de problemas comunes

### El Panel de Control muestra "acceso denegado"
- Verifica que `SESION_MOCK.rolActivo` sea `"admin"` o `"developer"` en `mock-database.js`
- En producción: verifica el campo `rol` en el documento del usuario en Firestore

### Las tarjetas no cargan imágenes
- Las imágenes mock usan URLs de Unsplash — requieren conexión a internet
- Si usas imágenes propias, cárgalas a Firebase Storage y actualiza `imageURL` en Firestore

### El autocompletado no funciona
- Abre el portal desde un servidor local (`npx serve .`), no directamente desde el sistema de archivos
- Los `file://` URLs pueden bloquear algunas funciones de JavaScript

### Error en sync-script: "Cannot find module 'csv-parser'"
```bash
npm install csv-parser firebase-admin
```

### Error en sync-script: "serviceAccountKey.json not found"
- Descarga el archivo desde Firebase Console → Configuración → Cuentas de servicio → Generar nueva clave privada
- Guárdalo como `serviceAccountKey.json` en la raíz del proyecto
- **⚠️ NUNCA subas este archivo a Git** — agrega al `.gitignore`:
  ```
  serviceAccountKey.json
  ```

---

*Manual de Administrador — Herbario Digital UDLAP — v1.0 — 2025*

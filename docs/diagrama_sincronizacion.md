# Diagrama de Sincronización — DwC-A ↔ Firestore

**Herbario Digital UDLAP**

---

## Ciclo completo de un registro

```
┌──────────────────────────────────────────────────────────────────┐
│                   REGISTRO DE NUEVA MUESTRA                      │
└──────────────────────────────────────────────────────────────────┘

[1] Administrador
    │
    ├─ Accede a admin.html → Panel de Control
    │
    ├─ Click en "🌱 Registro Nuevo"
    │
    ├─ Llena el formulario
    │
    └─ Click en "💾 Guardar"
           │
           ▼
    [db.js → registrarEspecimen()]
    ┌──────────────────────────────┐
    │  generarOccurrenceID()       │
    │  → "UDLAP:herbarium:a3f1b2c4"│
    │                              │
    │  generarNumCatalogo()        │
    │  → "heli-annu-00041"         │
    └──────────────────────────────┘
           │
           ▼
    [Mock: push a PLANTAS_MOCK]
    [Firebase: addDoc a specimens/]
           │
           ▼
    ✅ Confirmación en pantalla
       occurrenceID + numCatalogo


[2] Administrador crea el registro en RDHM
    (acceso via botón "Portal RDHM" con auth automática)
    │
    ├─ Usa el mismo occurrenceID generado en [1]
    │
    └─ Guarda en RDHM
           │
           ▼
    Registro existe en:
    ├─ Firestore (sistema UDLAP)  ✅
    └─ RDHM (red nacional)        ✅
```

---

## Ciclo de sincronización periódica

```
┌──────────────────────────────────────────────────────────────────┐
│              SINCRONIZACIÓN RDHM → FIRESTORE                     │
└──────────────────────────────────────────────────────────────────┘

[1] Administrador exporta desde RDHM
    │
    ├─ Portal RDHM → Colección UDLAP → Exportar DwC-A
    │
    └─ Descarga: occurrence.csv
           │
           ▼
[2] Ejecuta sync-script.js
    │
    ├─ node js/sync-script.js occurrence.csv
    │
    └─ El script procesa fila por fila:
    
         occurrence.csv
         ┌─────────────────────────────────────┐
         │ occurrenceID │ catalogNumber │ ...  │
         ├─────────────────────────────────────┤
         │ UDLAP:herb.. │ heli-annu-0.. │ ...  │◄─── fila 1
         │ UDLAP:herb.. │ boug-glab-0.. │ ...  │◄─── fila 2
         │ UDLAP:herb.. │ nopal-opun-.. │ ...  │◄─── fila N
         └─────────────────────────────────────┘
                   │
                   ▼  dwcaToFirestore(row)
         ┌─────────────────────────────────────┐
         │ Mapeo de campos DwC-A → Firestore   │
         │                                     │
         │ genus + specificEpithet → especie   │
         │ recordedBy → recolector             │
         │ identifiedBy → determinador         │
         │ stateProvince → estadoMX            │
         │ decimalLatitude → latitud           │
         │ ... etc.                            │
         └─────────────────────────────────────┘
                   │
                   ▼
         ┌─────────────────────────────────────┐
         │  Firestore: specimens/{occurrenceID}│
         │                                     │
         │  batch.set(docRef, datos,           │
         │    { merge: true })                 │
         │                                     │
         │  merge:true → preserva:             │
         │  ✓ citasCount                       │
         │  ✓ campos propios UDLAP             │
         │  ↻ actualiza campos DwC-A           │
         └─────────────────────────────────────┘
```

---

## Control de errores y redundancia

```
┌──────────────────────────────────────────────────────────────────┐
│                   CONTROL DE CALIDAD                             │
└──────────────────────────────────────────────────────────────────┘

Para cada registro del CSV:
│
├─ ¿Tiene occurrenceID?
│   ├─ NO → ❌ Error tipo "sin_occurrenceID"
│   │         → Log en sync_logs (con número de fila)
│   │         → Continúa con el siguiente registro
│   │
│   └─ SÍ → ¿Existe en Firestore?
│             ├─ SÍ → ✅ Actualización normal (merge)
│             │         (nuevo registro en RDHM no pasó por el sistema)
│             │         → merge:true lo crea con campos base
│             │         → citasCount inicia en 0
│             │
│             └─ NO → ⚠️ Creación nueva con merge
│                       → citasCount: 0
│                       → Log informativo

Al finalizar:
│
├─ ✅ sync_ok  → todos los registros procesados sin error
│
└─ ⚠️ sync_partial → algunos registros con error
     → Ver sync_logs en Firestore para detalle
     → Verificar en RDHM los IDs problemáticos
```

---

## Tabla de estados de sincronización

| occurrenceID en DwC-A | occurrenceID en Firestore | Estado | Acción del sync |
|---|---|---|---|
| ✅ | ✅ | **CORRECTO** | Actualiza campos DwC-A, preserva citasCount |
| ✅ | ❌ | **CREACIÓN** | Crea documento nuevo en Firestore |
| ❌ | ✅ | **SOLO LOCAL** | No afectado por el sync |
| ❌ | ❌ | **ERROR** | Log de error, registro ignorado |

---

## Frecuencia recomendada de sincronización

| Evento | Acción |
|---|---|
| Nuevas muestras en RDHM | Sync inmediato |
| Correcciones menores en RDHM | Sync semanal |
| Sin cambios recientes | Sync mensual |
| Antes de presentaciones/publicaciones | Sync manual verificado |

---

*Diagrama de Sincronización — Herbario Digital UDLAP — v1.0 — 2025*

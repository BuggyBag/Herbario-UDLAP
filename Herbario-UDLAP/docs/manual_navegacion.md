# Manual de Navegación — Herbario Digital UDLAP

**Versión:** 1.0 · **Fecha:** 2025  
**Audiencia:** Usuarios generales, estudiantes y visitantes del portal

---

## Contenido

1. [Acceso al portal](#1-acceso-al-portal)
2. [Navegación general](#2-navegación-general)
3. [Página de Inicio](#3-página-de-inicio)
4. [Tarjetas de especímenes](#4-tarjetas-de-especímenes)
5. [Ficha completa de una muestra](#5-ficha-completa-de-una-muestra)
6. [Colección por familias](#6-colección-por-familias)
7. [Talleres](#7-talleres)
8. [Acerca del Herbario](#8-acerca-del-herbario)
9. [Perfil e inicio de sesión](#9-perfil-e-inicio-de-sesión)
10. [Modo oscuro e idioma](#10-modo-oscuro-e-idioma)

---

## 1. Acceso al portal

El portal web del Herbario Digital UDLAP es accesible desde cualquier navegador
moderno (Chrome, Firefox, Safari, Edge) tanto en computadora de escritorio como
en dispositivos móviles.

**URL de acceso:** *(rellenar con dominio definitivo)*

No es necesario iniciar sesión para consultar la colección. La sesión institucional
solo se requiere para:
- Descargar materiales de estudio
- Registrarse en talleres con cuenta UDLAP
- Acceder al Panel de Control (solo administradores/desarrolladores)

---

## 2. Navegación general

Todas las páginas comparten la misma barra de navegación superior:

```
[☰ Menú]   Herbario Digital · UDLAP        [Inicio] [Colección] [Talleres] [Acerca] [Perfil]
```

### Menú hamburguesa (☰) — lado izquierdo
Al hacer clic se despliega un menú con:
- **🌙 Modo Oscuro** — activa/desactiva el tema oscuro (se recuerda entre visitas)
- **🌐 Idioma / Language** — cambio de idioma *(próximamente)*
- **🌿 Acerca del Herbario** — acceso rápido
- **⚙️ Panel de Control** — visible únicamente para administradores y desarrolladores

### Barra de navegación — lado derecho
| Enlace | Función |
|---|---|
| Inicio | Buscador principal y mosaico de muestras |
| Colección | Explorar por familias botánicas |
| Talleres | Historial y próximas actividades |
| Acerca | Información institucional del herbario |
| Perfil | Iniciar sesión / cerrar sesión / materiales |

---

## 3. Página de Inicio

La página de inicio es el punto central de búsqueda y descubrimiento.

### 3.1 Barra de búsqueda

- Escribe cualquier término: nombre común, nombre científico, familia, recolector o estado.
- A partir del **segundo carácter** aparecen sugerencias de autocompletado.
- Haz clic en una sugerencia para ir directamente a la ficha del espécimen.
- Presiona **Escape** para cerrar las sugerencias.

### 3.2 Filtros expandibles

Debajo del buscador hay un botón **▼ Filtros**. Al hacer clic se expanden tres selectores:

| Filtro | Opciones |
|---|---|
| Familia | Lista de familias botánicas presentes en la colección |
| Género | Lista de géneros |
| Estado | Estados de la República Mexicana |

Puedes combinar búsqueda de texto y filtros simultáneamente.

El botón **✕ Limpiar** restablece todos los filtros y la búsqueda.

### 3.3 Mosaico de muestras

- **Sin búsqueda/filtros:** las muestras aparecen en orden aleatorio (se reorganizan al recargar).
- **Con búsqueda o filtros:** las muestras se ordenan alfabéticamente por nombre común.
- El contador **"N muestras encontradas"** se actualiza en tiempo real.

---

## 4. Tarjetas de especímenes

Cada muestra aparece como una tarjeta visual en el mosaico.

### Al pasar el cursor (hover)

La imagen se oscurece y aparece encima:
- Nombre científico en cursiva
- Familia botánica y estado de recolecta
- Indicador de "Ver ficha completa"

### Al hacer clic

Navega a la ficha completa de la muestra (`sample.html`).

---

## 5. Ficha completa de una muestra

La ficha muestra toda la información registrada del espécimen.

### Información disponible

| Campo | Descripción |
|---|---|
| N.° Catálogo | Identificador interno formato `geno-espe-#####` |
| OccurrenceID | Identificador RDHM formato `UDLAP:herbarium:XXXXXXXX` |
| Taxonomía | Género, Familia, Orden, Clase, División |
| Recolecta | Recolector, determinador, fecha, localidad, coordenadas |
| Estado de conservación | Categoría IUCN / NOM-059 cuando aplica |
| Notas | Observaciones del recolector |
| Citas | Contador de veces que el espécimen ha sido citado |

### Botón "⬇ Descargar imagen"

1. Abre la imagen en alta resolución.
2. Automáticamente muestra el popup de cita (ver abajo).
3. El contador de citas aumenta en 1.

### Botón "📋 Generar cita"

Muestra el popup de cita sin descargar la imagen. El contador también aumenta.

### Popup de cita académica

El popup contiene el texto de cita en formato APA adaptado para herbarios:

```
[Recolector]. ([Año]). [Especie] [Espécimen de herbario [N.° Catálogo]].
Herbario Digital UDLAP. OccurrenceID: UDLAP:herbarium:XXXXXXXX.
Red de Herbarios Mexicanos.
```

- **📋 Copiar** — copia el texto al portapapeles.
- **Cerrar** — cierra el popup.

---

## 6. Colección por familias

Accede desde el enlace **Colección** en la barra de navegación.

Se muestran **tarjetas de fichero** (una por familia botánica), cada una con:
- Icono y nombre de la familia
- Número de muestras en la colección

### Ordenar familias

| Botón | Acción |
|---|---|
| A→Z | Orden alfabético |
| Mayor cantidad | Familias con más muestras primero |
| Menor cantidad | Familias con menos muestras primero |

### Abrir una familia

Al hacer clic en un fichero, se muestran todas las muestras de esa familia en mosaico.  
El botón **← Volver a familias** regresa a la vista de ficheros.

> También puedes acceder directamente a una familia desde la URL:
> `collection.html?family=Asteraceae`

---

## 7. Talleres

Accede desde el enlace **Talleres** en la barra de navegación.

### Historial de talleres

Los talleres pasados se muestran del más reciente al más antiguo, con:
- Fecha, duración y lugar
- Descripción del taller
- Instructor
- Galería de fotos (cuando disponible)
- Número de asistentes

### Próximos talleres (barra lateral)

A la derecha (o debajo en móvil) aparecen los talleres programados con:
- Fecha y hora
- Cupos disponibles
- Botón **Registrarme →**

### Registrarse en un taller

Al hacer clic en **Registrarme**, aparece un modal con dos opciones:

**Opción 1 — Cuenta institucional:**  
Inicia sesión con tu correo `@udlap.mx`. El registro queda vinculado a tu matrícula.

**Opción 2 — Invitado:**  
Se genera un **código QR automático** con el nombre del taller, fecha y hora.  
Presenta el código al ingreso del evento.

---

## 8. Acerca del Herbario

Página informativa con:
- Historia del herbario y su integración a RDHM
- Misión y visión
- Estándares utilizados (DwC-A, OccurrenceID, NOM-059)
- Directorio del equipo con correos de contacto
- Formato de cita académica del herbario

---

## 9. Perfil e inicio de sesión

### Sin sesión iniciada

Se muestran dos botones:
- **🎓 Iniciar sesión con cuenta UDLAP** — autentica con correo institucional `@udlap.mx`
- **👤 Continuar como invitado** — redirige al inicio sin autenticación

### Con sesión iniciada

Se muestra:
- Nombre, correo y rol del usuario (Estudiante / Administrador / Desarrollador)
- **Cerrar sesión**
- **⚙️ Panel de Control** — visible solo para admin y developer
- **📚 Materiales de estudio** — guías, etiquetas y recursos descargables para usuarios autenticados

### Materiales disponibles

| Material | Tipo |
|---|---|
| Guía de Herborización UDLAP | PDF |
| Etiquetas para Prácticas de Campo | PDF |
| Guía de Laboratorio de Botánica | PDF |
| Claves Dicotómicas: Familias de Puebla | PDF |

---

## 10. Modo oscuro e idioma

### Modo oscuro
- Accede desde el **menú hamburguesa ☰ → 🌙 Modo Oscuro**.
- La preferencia se guarda automáticamente entre sesiones.
- Para desactivarlo, abre el mismo menú y selecciona **☀️ Modo Claro**.

### Idioma
- El cambio de idioma (Español ↔ English) estará disponible en una versión futura.
- Por ahora, el portal está completamente en español.

---

*Manual de Navegación — Herbario Digital UDLAP — v1.0 — 2025*

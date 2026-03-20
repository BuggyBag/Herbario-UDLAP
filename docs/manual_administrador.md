# Manual de Administrador

## Acceder al Panel de Control
1. Iniciar sesión con cuenta que tenga permisos de administrador o desarrollador.
2. Desde el menú hamburguesa o página de perfil, seleccionar "Panel de Control".

## Registrar Nueva Muestra
1. En el panel, presionar "Registro Nuevo".
2. El sistema genera automáticamente el número de catálogo y OccurrenceID.
3. Ingresar datos de la muestra.
4. Guardar en Firestore y registrar en RDHM.

## Consultar Base de Datos
1. Presionar "Consultar Base de Datos".
2. Se muestra una tabla con todos los registros de Firestore.

## Editar Base de Datos
1. Presionar "Editar Base de Datos".
2. Se abre automáticamente el portal de RDHM con autenticación.
3. Realizar ediciones en RDHM.

## Acceder a RDHM
1. Presionar "RDHM".
2. Se abre el portal completo de RDHM con autenticación.

## Salir del Panel
1. Presionar "Salir del Panel de Control".
2. Regresar al portal principal.

## Sincronización con RDHM
- Exportar periódicamente Darwin Core Archive desde RDHM.
- Ejecutar script de sincronización para actualizar Firestore.
- Comparar OccurrenceID para integridad.
- Generar logs de errores si no coinciden.
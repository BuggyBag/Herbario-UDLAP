# Diseño de Base de Datos Firestore

## Colecciones Principales

### specimens
- occurrenceID (string, primary key)
- catalogNumber (string)
- genus (string)
- species (string)
- family (string)
- collector (string)
- collectionDate (date)
- location (string)
- imageURL (string)
- citationsCount (number)

### families
- name (string)
- count (number)

### citations
- specimenID (string)
- citationText (string)
- date (timestamp)

### workshops
- title (string)
- date (date)
- description (string)
- images (array of strings)

### users
- uid (string, from Auth)
- email (string)
- role (string: visitor, student, guest, admin, developer)

### logs
- timestamp (timestamp)
- type (string: error, sync, etc.)
- message (string)
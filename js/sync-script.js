# Script de Sincronización con RDHM

// Este script se ejecuta manualmente o periódicamente
// Requiere el archivo DwC-A exportado de RDHM

const fs = require('fs');
const csv = require('csv-parser');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert('path/to/serviceAccountKey.json'),
  databaseURL: 'https://your-project.firebaseio.com'
});

const db = admin.firestore();

function syncDwCA(filePath) {
  const results = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      processData(results);
    });
}

async function processData(data) {
  for (const record of data) {
    const occurrenceID = record.occurrenceID;
    const docRef = db.collection('specimens').doc(occurrenceID);
    const doc = await docRef.get();
    if (doc.exists) {
      // Update existing
      await docRef.update(record);
    } else {
      // Log error
      await db.collection('logs').add({
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: 'sync_error',
        message: `OccurrenceID ${occurrenceID} not found in Firestore`
      });
    }
  }
}

// Usage: syncDwCA('path/to/dwca.csv');
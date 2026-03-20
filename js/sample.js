/* Sample Detail JavaScript */
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
        loadSample(id);
    }
});

async function loadSample(id) {
    const doc = await db.collection('specimens').doc(id).get();
    if (doc.exists) {
        const data = doc.data();
        displaySample(data);
    }
}

function displaySample(data) {
    const detail = document.getElementById('sample-detail');
    detail.innerHTML = `
        <img src="${data.imageURL}" alt="${data.genus} ${data.species}">
        <h1>${data.genus} ${data.species}</h1>
        <p>Familia: ${data.family}</p>
        <p>Colector: ${data.collector}</p>
        <p>Fecha: ${data.collectionDate}</p>
        <p>Ubicación: ${data.location}</p>
        <p>Citas: ${data.citationsCount}</p>
        <button onclick="downloadImage('${data.imageURL}')">Descargar Imagen</button>
        <button onclick="generateCitation('${data.occurrenceID}')">Generar Cita</button>
    `;
}

function downloadImage(url) {
    // Trigger download and show citation popup
    window.open(url, '_blank');
    showCitationPopup('Herbario UDLAP. (2023). Registro botánico [' + data.occurrenceID + ']. Colección del Herbario Universitario.');
}

function generateCitation(id) {
    const citation = 'Herbario UDLAP. (2023). Registro botánico [' + id + ']. Colección del Herbario Universitario.';
    showCitationPopup(citation);
    // Increment citationsCount
}

function showCitationPopup(citation) {
    const popup = document.createElement('div');
    popup.innerHTML = `
        <p>${citation}</p>
        <button onclick="copyToClipboard('${citation}')">Copiar</button>
        <button onclick="closePopup()">Cerrar</button>
    `;
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.background = 'white';
    popup.style.padding = '20px';
    popup.style.border = '1px solid black';
    document.body.appendChild(popup);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert('Copiado al portapapeles');
}

function closePopup() {
    document.querySelector('div[style*="fixed"]').remove();
}
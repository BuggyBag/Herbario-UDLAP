/* Admin Panel JavaScript */
document.addEventListener('DOMContentLoaded', function() {
    const registerBtn = document.getElementById('register-sample');
    const viewBtn = document.getElementById('view-database');
    const editBtn = document.getElementById('edit-database');
    const rdhmBtn = document.getElementById('rdhm-access');
    const exitBtn = document.getElementById('exit-panel');

    registerBtn.addEventListener('click', () => {
        // Generate catalog number and occurrenceID
        const catalogNumber = generateCatalogNumber('genus', 'species', 1);
        const occurrenceID = generateOccurrenceID();
        // Register new sample
        alert(`Nuevo registro: ${catalogNumber}, ${occurrenceID}`);
    });

    viewBtn.addEventListener('click', () => {
        // Display database in table
        window.location.href = 'view-db.html';
    });

    editBtn.addEventListener('click', () => {
        // Redirect to RDHM with auth
        window.open('https://rdhm.example.com/edit', '_blank');
    });

    rdhmBtn.addEventListener('click', () => {
        window.open('https://rdhm.example.com', '_blank');
    });

    exitBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

function generateCatalogNumber(genus, species, count) {
    const g = genus.substring(0,3) + genus.slice(-1);
    const s = species.substring(0,3) + species.slice(-1);
    return `${g}-${s}-${String(count).padStart(5, '0')}`;
}

function generateOccurrenceID() {
    const hex = Math.random().toString(16).substring(2,10);
    return `UDLAP:herbarium:${hex}`;
}
/* Workshops Page JavaScript */
document.addEventListener('DOMContentLoaded', function() {
    loadWorkshops();
});

async function loadWorkshops() {
    const snapshot = await db.collection('workshops').orderBy('date', 'desc').get();
    const workshops = snapshot.docs.map(doc => doc.data());
    displayWorkshops(workshops);
}

function displayWorkshops(workshops) {
    const recent = document.getElementById('recent-workshops');
    const gallery = document.getElementById('gallery');
    // Implement display logic
}
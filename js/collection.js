/* Collection Page JavaScript */
document.addEventListener('DOMContentLoaded', function() {
    loadFamilies();
});

async function loadFamilies() {
    const snapshot = await db.collection('families').get();
    const families = snapshot.docs.map(doc => doc.data());
    displayFamilies(families);
}

function displayFamilies(families) {
    const list = document.getElementById('families-list');
    list.innerHTML = families.map(f => `
        <div class="family-folder" onclick="openFamily('${f.name}')">
            📁 ${f.name} (${f.count})
        </div>
    `).join('');
}

function openFamily(name) {
    // Load specimens for family
    window.location.href = `index.html?family=${name}`;
}
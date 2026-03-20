/* Main App JavaScript */
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const menuDropdown = document.getElementById('menu-dropdown');
    hamburgerBtn.addEventListener('click', () => {
        menuDropdown.style.display = menuDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Language toggle (placeholder)
    const languageToggle = document.getElementById('language-toggle');
    languageToggle.addEventListener('click', () => {
        alert('Cambio de idioma no implementado aún');
    });

    // Search functionality
    const searchBar = document.getElementById('search-bar');
    const autocompleteResults = document.getElementById('autocomplete-results');
    searchBar.addEventListener('input', async (e) => {
        const query = e.target.value;
        if (query.length > 2) {
            const results = await searchSpecimens(query);
            displayAutocomplete(results);
        } else {
            autocompleteResults.innerHTML = '';
        }
    });

    // Filters
    const toggleFilters = document.getElementById('toggle-filters');
    const filterOptions = document.getElementById('filter-options');
    toggleFilters.addEventListener('click', () => {
        filterOptions.style.display = filterOptions.style.display === 'block' ? 'none' : 'block';
    });

    // Load random specimens on load
    loadRandomSpecimens();

    // Auth state
    auth.onAuthStateChanged(user => {
        if (user) {
            // Check permissions
            checkUserPermissions(user);
        }
    });
});

async function searchSpecimens(query) {
    const snapshot = await db.collection('specimens')
        .where('genus', '>=', query)
        .where('genus', '<=', query + '\uf8ff')
        .limit(10)
        .get();
    return snapshot.docs.map(doc => doc.data());
}

function displayAutocomplete(results) {
    autocompleteResults.innerHTML = results.map(r => `<div onclick="selectResult('${r.occurrenceID}')">${r.genus} ${r.species}</div>`).join('');
}

function selectResult(id) {
    window.location.href = `sample.html?id=${id}`;
}

async function loadRandomSpecimens() {
    const snapshot = await db.collection('specimens').limit(20).get();
    const specimens = snapshot.docs.map(doc => doc.data());
    displayMosaic(specimens);
}

function displayMosaic(specimens) {
    const mosaic = document.getElementById('mosaic');
    mosaic.innerHTML = specimens.map(s => `
        <div class="card" onclick="viewSample('${s.occurrenceID}')">
            <img src="${s.imageURL}" alt="${s.genus} ${s.species}">
            <div class="overlay">
                <p>${s.genus} ${s.species}</p>
                <p>Familia: ${s.family}</p>
            </div>
        </div>
    `).join('');
}

function viewSample(id) {
    window.location.href = `sample.html?id=${id}`;
}

async function checkUserPermissions(user) {
    const userDoc = await db.collection('users').doc(user.uid).get();
    if (userDoc.exists) {
        const data = userDoc.data();
        if (data.role === 'admin' || data.role === 'developer') {
            document.getElementById('admin-access').style.display = 'block';
        }
    }
}
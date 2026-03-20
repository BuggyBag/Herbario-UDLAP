/* Profile Page JavaScript */
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const adminPanelBtn = document.getElementById('admin-panel-btn');

    auth.onAuthStateChanged(user => {
        if (user) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
            loadMaterials();
            checkAdmin(user);
        } else {
            loginBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
        }
    });

    loginBtn.addEventListener('click', () => {
        // Implement login with institutional account
        // For now, placeholder
        alert('Login con cuenta institucional');
    });

    logoutBtn.addEventListener('click', () => {
        auth.signOut();
    });

    adminPanelBtn.addEventListener('click', () => {
        window.location.href = 'admin.html';
    });
});

async function loadMaterials() {
    const materialsDiv = document.getElementById('materials');
    materialsDiv.style.display = 'block';
    // Load materials from Firestore
}

async function checkAdmin(user) {
    const userDoc = await db.collection('users').doc(user.uid).get();
    if (userDoc.exists && (userDoc.data().role === 'admin' || userDoc.data().role === 'developer')) {
        document.getElementById('admin-panel-btn').style.display = 'block';
    }
}
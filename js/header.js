/**
 * header.js — Componente de navegación compartida
 * Herbario Digital UDLAP
 *
 * Inyecta el header completo en todas las páginas,
 * activa la pestaña correcta según la URL actual,
 * y conecta dark-mode + hamburguesa.
 */

(function () {
  /* ─── Inyectar el HTML del header ─────────────────────── */
  function buildHeader() {
    const headerEl = document.createElement("header");
    headerEl.innerHTML = `
      <div class="header-inner">

        <!-- Menú hamburguesa (izquierda) -->
        <div class="hamburger-wrap">
          <button class="hamburger-btn" id="hamburger-btn" aria-label="Menú">
            <span></span><span></span><span></span>
          </button>
          <div class="menu-dropdown" id="menu-dropdown">
            <button class="menu-item-btn" id="dark-mode-toggle">
              <span class="menu-icon">🌙</span> Modo Oscuro
            </button>
            <button class="menu-item-btn" id="lang-toggle">
              <span class="menu-icon">🌐</span> Idioma / Language
            </button>
            <a href="about.html" class="menu-item-btn">
              <span class="menu-icon">🌿</span> Acerca del Herbario
            </a>
            <!-- Solo visible para admin/developer -->
            <a href="admin.html" class="menu-item-btn" id="admin-link-ham" style="display:none;">
              <span class="menu-icon">⚙️</span> Panel de Control
            </a>
          </div>
        </div>

        <!-- Logo (centro-izquierda) -->
        <a href="index.html" class="logo">
          <span class="logo-title">Herbario Digital</span>
          <span class="logo-sub">UDLAP · Biología</span>
        </a>

        <!-- Navegación (derecha) -->
        <nav id="main-nav">
          <a href="index.html"      data-page="index">Inicio</a>
          <a href="collection.html" data-page="collection">Colección</a>
          <a href="workshops.html"  data-page="workshops">Talleres</a>
          <a href="about.html"      data-page="about">Acerca</a>
          <a href="profile.html"    data-page="profile">Perfil</a>
        </nav>

      </div>`;
    document.body.insertBefore(headerEl, document.body.firstChild);
  }

  /* ─── Marcar pestaña activa ────────────────────────────── */
  function setActiveNav() {
    const page = document.body.dataset.page || "";
    document.querySelectorAll("#main-nav a").forEach(a => {
      if (a.dataset.page === page) a.classList.add("active");
    });
  }

  /* ─── Hamburguesa ──────────────────────────────────────── */
  function initHamburger() {
    const btn = document.getElementById("hamburger-btn");
    const dropdown = document.getElementById("menu-dropdown");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.classList.toggle("open");
      dropdown.classList.toggle("open");
    });
    document.addEventListener("click", () => {
      btn.classList.remove("open");
      dropdown.classList.remove("open");
    });
  }

  /* ─── Dark mode ────────────────────────────────────────── */
  function initDarkMode() {
    const toggle = document.getElementById("dark-mode-toggle");
    // Restaurar preferencia guardada
    if (localStorage.getItem("dark") === "1") {
      document.body.classList.add("dark-mode");
      toggle.innerHTML = '<span class="menu-icon">☀️</span> Modo Claro';
    }
    toggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-mode");
      localStorage.setItem("dark", isDark ? "1" : "0");
      toggle.innerHTML = isDark
        ? '<span class="menu-icon">☀️</span> Modo Claro'
        : '<span class="menu-icon">🌙</span> Modo Oscuro';
    });
  }

  /* ─── Idioma (placeholder) ─────────────────────────────── */
  function initLang() {
    document.getElementById("lang-toggle").addEventListener("click", () => {
      alert("Cambio de idioma — próximamente disponible");
    });
  }

  /* ─── Mostrar acceso admin si tiene permisos ───────────── */
  async function checkAdminVisibility() {
    try {
      const rol = await getUserRole();
      if (rol === "admin" || rol === "developer") {
        const link = document.getElementById("admin-link-ham");
        if (link) link.style.display = "flex";
      }
    } catch (_) {}
  }

  /* ─── Init ─────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    buildHeader();
    setActiveNav();
    initHamburger();
    initDarkMode();
    initLang();
    checkAdminVisibility();
  });
})();

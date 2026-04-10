/**
 * filters.js — Barra de filtros y búsqueda con autocompletado
 * Herbario Digital UDLAP
 */

const filtrosActivos = {
  busqueda: "",
  familia: "",
  genero: "",
  estadoMX: ""
};

let _todosEspecimenes = [];

/**
 * Inicializa el sistema de filtros.
 * Llama a esto después de tener los datos cargados.
 * @param {Array} especimenes - lista completa de especímenes
 */
function iniciarFiltros(especimenes) {
  _todosEspecimenes = especimenes;

  _poblarSelect("filter-familia", "familia");
  _poblarSelect("filter-genero", "genero");
  _poblarSelect("filter-estado", "estadoMX");

  // Búsqueda con autocompletado
  const searchInput = document.getElementById("search-input");
  const autocompleteList = document.getElementById("autocomplete-list");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      filtrosActivos.busqueda = e.target.value;
      _mostrarAutocompletado(e.target.value, autocompleteList);
      aplicarFiltros();
    });
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        _cerrarAutocompletado(autocompleteList);
        searchInput.blur();
      }
    });
    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target)) _cerrarAutocompletado(autocompleteList);
    });
  }

  // Filtros select
  ["filter-familia", "filter-genero", "filter-estado"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const key = id === "filter-estado" ? "estadoMX" : id.replace("filter-", "");
    el.addEventListener("change", e => {
      filtrosActivos[key] = e.target.value;
      aplicarFiltros();
    });
  });

  // Botón expandir filtros
  const filterToggle = document.getElementById("filter-toggle");
  const filtersPanel = document.getElementById("filters-panel");
  if (filterToggle && filtersPanel) {
    filterToggle.addEventListener("click", () => {
      filtersPanel.classList.toggle("open");
      filterToggle.classList.toggle("active");
      filterToggle.textContent = filtersPanel.classList.contains("open")
        ? "▲ Ocultar filtros"
        : "▼ Filtros";
    });
  }

  // Botón limpiar
  const resetBtn = document.getElementById("reset-btn");
  if (resetBtn) resetBtn.addEventListener("click", resetearFiltros);
}

/**
 * Aplica los filtros activos y re-renderiza el grid.
 */
function aplicarFiltros() {
  const { busqueda, familia, genero, estadoMX } = filtrosActivos;

  let resultado = [..._todosEspecimenes];

  if (busqueda.trim()) {
    const q = busqueda.toLowerCase().trim();
    resultado = resultado.filter(p =>
      [p.nombreComun, p.especie, p.genero, p.familia, p.recolector, p.estadoMX]
        .some(c => (c || "").toLowerCase().includes(q))
    );
  }

  if (familia)  resultado = resultado.filter(p => p.familia  === familia);
  if (genero)   resultado = resultado.filter(p => p.genero   === genero);
  if (estadoMX) resultado = resultado.filter(p => p.estadoMX === estadoMX);

  // Sin filtro: orden aleatorio. Con filtro: alfabético
  const hayFiltro = busqueda || familia || genero || estadoMX;
  if (hayFiltro) {
    resultado.sort((a, b) =>
      (a.nombreComun || "").localeCompare(b.nombreComun || "", "es")
    );
  } else {
    // Orden aleatorio (mezcla Fisher-Yates)
    for (let i = resultado.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [resultado[i], resultado[j]] = [resultado[j], resultado[i]];
    }
  }

  renderizarGrid(resultado);
}

/**
 * Resetea todos los filtros y muestra el grid inicial.
 */
function resetearFiltros() {
  filtrosActivos.busqueda = "";
  filtrosActivos.familia = "";
  filtrosActivos.genero = "";
  filtrosActivos.estadoMX = "";

  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";
  ["filter-familia", "filter-genero", "filter-estado"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  // Render aleatorio inicial
  const shuffled = [..._todosEspecimenes];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  renderizarGrid(shuffled);
}

/* ─── Helpers privados ─────────────────────────────────── */

function _poblarSelect(selectId, campo) {
  const select = document.getElementById(selectId);
  if (!select) return;
  const valores = [...new Set(_todosEspecimenes.map(p => p[campo]).filter(Boolean))].sort();
  valores.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    select.appendChild(opt);
  });
}

function _mostrarAutocompletado(query, listEl) {
  if (!listEl) return;
  if (!query || query.length < 2) {
    _cerrarAutocompletado(listEl);
    return;
  }
  const q = query.toLowerCase();
  const matches = _todosEspecimenes
    .filter(p =>
      (p.nombreComun || "").toLowerCase().includes(q) ||
      (p.especie || "").toLowerCase().includes(q) ||
      (p.familia || "").toLowerCase().includes(q)
    )
    .slice(0, 8);

  if (matches.length === 0) {
    _cerrarAutocompletado(listEl);
    return;
  }

  listEl.innerHTML = matches.map(p => `
    <div class="autocomplete-item" data-id="${p.occurrenceID || p.id}">
      <span>🌿</span>
      <span>
        ${p.nombreComun}
        — <em>${p.especie}</em>
        <span style="font-size:0.72rem;color:var(--muted);margin-left:6px;">${p.familia}</span>
      </span>
    </div>
  `).join("");

  listEl.querySelectorAll(".autocomplete-item").forEach(item => {
    item.addEventListener("click", () => {
      window.location.href = `sample.html?id=${encodeURIComponent(item.dataset.id)}`;
    });
  });

  listEl.style.display = "block";
}

function _cerrarAutocompletado(listEl) {
  if (listEl) { listEl.innerHTML = ""; listEl.style.display = "none"; }
}

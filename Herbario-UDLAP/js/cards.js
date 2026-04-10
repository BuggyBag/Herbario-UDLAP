/**
 * cards.js — Renderizado de tarjetas de especímenes
 * Herbario Digital UDLAP
 *
 * Crea las tarjetas en mosaico Pinterest con:
 *  - Hover: imagen oscurecida + nombre científico encima
 *  - Click: navega a sample.html?id=occurrenceID
 */

/**
 * Crea una tarjeta DOM para un espécimen.
 * @param {object} planta - objeto espécimen del mock/Firestore
 * @returns {HTMLElement}
 */
function crearTarjeta(planta) {
  const colores = (typeof FAMILIA_COLORES !== "undefined" && FAMILIA_COLORES)
    ? (FAMILIA_COLORES[planta.familia] || FAMILIA_COLORES["_default"])
    : { bg: "#f5f5f5", text: "#424242", border: "#bdbdbd" };

  const card = document.createElement("div");
  card.className = "card-specimen animate-in";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `Ver ficha de ${planta.nombreComun}`);

  const imgSrc = planta.imagenThumb || planta.imageURL || planta.imagen ||
    "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&q=70";

  card.innerHTML = `
    <div class="card-img-wrap">
      <img src="${imgSrc}"
           alt="${planta.nombreComun} — ${planta.especie}"
           loading="lazy"
           onerror="this.src='https://images.unsplash.com/photo-1542601906897-ecd2f72ddefb?w=400&q=70'">
      <div class="card-hover-info">
        <div class="card-sci-name">${planta.especie}</div>
        <div class="card-hover-meta">
          ${planta.familia} · ${planta.estadoMX || planta.pais || ""}
        </div>
        <div class="card-hover-meta" style="margin-top:8px;font-size:0.7rem;opacity:0.8;">
          🔬 Ver ficha completa
        </div>
      </div>
    </div>
    <div class="card-foot">
      <span class="card-common-name">${planta.nombreComun}</span>
      <span class="card-family-badge"
            style="background:${colores.bg};color:${colores.text};border:1px solid ${colores.border}">
        ${planta.familia}
      </span>
    </div>`;

  // Navegar a ficha completa al click o Enter
  const navegarAFicha = () => {
    const id = encodeURIComponent(planta.occurrenceID || planta.id);
    window.location.href = `sample.html?id=${id}`;
  };
  card.addEventListener("click", navegarAFicha);
  card.addEventListener("keydown", e => { if (e.key === "Enter") navegarAFicha(); });

  return card;
}

/**
 * Renderiza una lista de especímenes en el grid.
 * @param {Array} lista - array de objetos espécimen
 * @param {string} gridId - id del contenedor grid (default: "cards-grid")
 */
function renderizarGrid(lista, gridId = "cards-grid") {
  const grid = document.getElementById(gridId);
  const emptyState = document.getElementById("empty-state");
  const resultsInfo = document.getElementById("results-info");

  if (!grid) return;
  grid.innerHTML = "";

  if (lista.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    if (resultsInfo) resultsInfo.textContent = "";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (resultsInfo) {
    resultsInfo.textContent = `${lista.length} muestra${lista.length !== 1 ? "s" : ""} encontrada${lista.length !== 1 ? "s" : ""}`;
  }

  const fragment = document.createDocumentFragment();
  lista.forEach((planta, i) => {
    const card = crearTarjeta(planta);
    // Stagger animation
    card.style.animationDelay = `${Math.min(i * 0.05, 0.5)}s`;
    fragment.appendChild(card);
  });
  grid.appendChild(fragment);
}

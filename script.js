function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  menu.style.left = menu.style.left === "0px" ? "-260px" : "0px";
}

function searchSpecimen() {
  const query = document.getElementById("searchBox").value.trim();
  if (!query) return;

  // Example: REMIB (Red Mundial de Información sobre Biodiversidad - CONABIO)
  const url = `https://www.enciclovida.mx/busqueda?tipo=especie&q=${encodeURIComponent(query)}`;

  window.open(url, "_blank");
}



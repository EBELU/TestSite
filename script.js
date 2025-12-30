let plants = [];

fetch("plants.json")
  .then(res => res.json())
  .then(data => {
    plants = data;
    populateCategoryFilter(plants);
    renderTable(plants);
  });

const tableBody = document.querySelector("#plant-table tbody");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("category-filter");
const invasiveFilter = document.getElementById("invasive-filter");

/* ===== RENDER TABELL ===== */
function renderTable(data) {
  tableBody.innerHTML = "";

  data.forEach(plant => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${plant.kategori}</td>
      <td>${plant.namn}</td>
      <td><em>${plant.latinsktNamn}</em></td>
      <td>${plant.invasiv ? "Ja ⚠️" : "Nej"}</td>
    `;

    row.style.cursor = "pointer";
    row.onclick = () => {
      window.location.href = `plant.html?id=${plant.id}`;
    };

    tableBody.appendChild(row);
  });
}

/* ===== FILTER KATEGORIER ===== */
function populateCategoryFilter(data) {
  const categories = [...new Set(data.map(p => p.kategori))];
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

/* ===== FILTRERING + SÖK ===== */
function applyFilters() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const invasiveValue = invasiveFilter.value;

  const filtered = plants.filter(plant => {
    const matchesSearch =
      plant.namn.toLowerCase().includes(searchText) ||
      plant.latinsktNamn.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "" || plant.kategori === selectedCategory;

    const matchesInvasive =
      invasiveValue === "" ||
      String(plant.invasiv) === invasiveValue;

    return matchesSearch && matchesCategory && matchesInvasive;
  });

  renderTable(filtered);
}

/* ===== EVENTS ===== */
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
invasiveFilter.addEventListener("change", applyFilters);

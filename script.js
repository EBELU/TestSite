document.addEventListener("DOMContentLoaded", () => {

  let plants = [];

  // Hämta element
  const tableBody = document.querySelector("#plant-table tbody");
  const searchNameInput = document.getElementById("search-name");
  const searchLatinInput = document.getElementById("search-latin");
  const categoryFilter = document.getElementById("category-filter");
  const invasiveFilter = document.getElementById("invasive-filter");

  // Hämta JSON-data
  fetch("plants.json")
    .then(res => res.json())
    .then(data => {
      plants = data;
      populateCategoryFilter(plants);
      renderTable(plants);
    })
    .catch(err => {
      console.error("Fel vid hämtning av plants.json:", err);
      tableBody.innerHTML = "<tr><td colspan='4'>Kunde inte ladda växterna.</td></tr>";
    });

  // RENDER TABELL
  function renderTable(data) {
    tableBody.innerHTML = "";

    if (data.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='4'>Inga växter matchar filtret.</td></tr>";
      return;
    }

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

  // FYLL PÅ KATEGORIFILTER
  function populateCategoryFilter(data) {
    const categories = [...new Set(data.map(p => p.kategori))];
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });
  }

  // FILTRERA DATA
  function applyFilters() {
    const nameText = searchNameInput.value.toLowerCase();
    const latinText = searchLatinInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const invasiveValue = invasiveFilter.value;

    const filtered = plants.filter(plant => {
      const matchesName = plant.namn.toLowerCase().includes(nameText);
      const matchesLatin = plant.latinsktNamn.toLowerCase().includes(latinText);
      const matchesCategory = selectedCategory === "" || plant.kategori === selectedCategory;
      const matchesInvasive = invasiveValue === "" || String(plant.invasiv) === invasiveValue;

      return matchesName && matchesLatin && matchesCategory && matchesInvasive;
    });

    renderTable(filtered);
  }

  // EVENT LISTENERS
  searchNameInput.addEventListener("input", applyFilters);
  searchLatinInput.addEventListener("input", applyFilters);
  categoryFilter.addEventListener("change", applyFilters);
  invasiveFilter.addEventListener("change", applyFilters);

});

fetch("plants.json")
  .then(res => res.json())
  .then(data => {

    // INDEX – tabell
    const tableBody = document.querySelector("#plant-table tbody");
    if (tableBody) {
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

    // DETAIL PAGE
    const info = document.getElementById("plant-info");
    if (info) {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      const plant = data.find(p => p.id === id);

      if (!plant) {
        info.innerHTML = "<p>Växten hittades inte.</p>";
        return;
      }

      info.innerHTML = `
        <h2>${plant.namn}</h2>
        <p><em>${plant.latinsktNamn}</em></p>
        <p><strong>Kategori:</strong> ${plant.kategori}</p>
        <p><strong>Invasiv i Sverige:</strong> ${plant.invasiv ? "Ja" : "Nej"}</p>
        <p>${plant.beskrivning}</p>
        <p><strong>Ursprung:</strong> ${plant.ursprung}</p>
      `;
    }
  });

fetch("plants.json")
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById("plant-list");
    const info = document.getElementById("plant-info");

    // Om vi är på index.html
    if (list) {
      data.forEach(plant => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${plant.namn}</strong>
          (<em>${plant.latinsktNamn}</em>) –
          ${plant.kategori}
          ${plant.invasiv ? "⚠️ Invasiv" : ""}
        `;
        li.onclick = () => {
          window.location.href = `plant.html?id=${plant.id}`;
        };
        list.appendChild(li);
      });
    }

    // Om vi är på plant.html
    if (info) {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      const plant = data.find(p => p.id === id);

      if (plant) {
        info.innerHTML = `
          <h2>${plant.namn}</h2>
          <p><em>${plant.latinsktNamn}</em></p>
          <p><strong>Kategori:</strong> ${plant.kategori}</p>
          <p><strong>Invasiv i Sverige:</strong> ${plant.invasiv ? "Ja" : "Nej"}</p>
          <p>${plant.beskrivning}</p>
          <p><strong>Ursprung:</strong> ${plant.ursprung}</p>
        `;
      }
    }
  });

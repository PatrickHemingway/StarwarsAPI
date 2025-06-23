const baseUrl = `http://localhost:9001/api`;

addEventListener('DOMContentLoaded', () => {
    const sp = new URLSearchParams(window.location.search);
    const id = sp.get('id');
    fetchPlanet(id);
});

async function fetchPlanet(id) {
    const url = `${baseUrl}/planets/${id}`;
    const planet = await fetch(url)
      .then(res => res.json());

    // Populate the HTML with planet data
    document.getElementById('name').textContent = planet.name;
    document.getElementById('climate').textContent = planet.climate;
    document.getElementById('surface_water').textContent = planet.surface_water;
    document.getElementById('diameter').textContent = planet.diameter;
    document.getElementById('rotation_period').textContent = planet.rotation_period;
    document.getElementById('orbital_period').textContent = planet.orbital_period;
    document.getElementById('terrain').textContent = planet.terrain;
    document.getElementById('gravity').textContent = planet.gravity;
    document.getElementById('population').textContent = planet.population;

    console.log(url, planet);
}

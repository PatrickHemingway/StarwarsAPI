const baseUrl = `https://swapi.info/api`;

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

    // Fetch and render films and residents
    await renderFilms(planet.films);
    await renderResidents(planet.residents);

    console.log(url, planet);
}

async function renderFilms(filmUrls) {
    const filmsSection = document.getElementById('films');
    const filmsLis = await Promise.all(filmUrls.map(async url => {
        const film = await fetch(url).then(res => res.json());
        const filmUrl = new URL(film.url);
        const filmId = filmUrl.pathname.split('/').filter(Boolean).pop();
        return `<li><a href="/films/film.html?id=${filmId}">${film.title}</a></li>`;
    }));
    filmsSection.innerHTML = `<h2>Films</h2><ul>${filmsLis.join("")}</ul>`;
}

async function renderResidents(residentUrls) {
    const residentsSection = document.getElementById('residents');
    const residentsLis = await Promise.all(residentUrls.map(async url => {
        const resident = await fetch(url).then(res => res.json());
        const residentUrl = new URL(resident.url);
        const residentId = residentUrl.pathname.split('/').filter(Boolean).pop();
        return `<li><a href="/character.html?id=${residentId}">${resident.name}</a></li>`;
    }));
    residentsSection.innerHTML = `<h2>Residents</h2><ul>${residentsLis.join("")}</ul>`;
}

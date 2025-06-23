let filmH1;
let planetsSection;
let charactersSection;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  filmH1 = document.querySelector('h1#film');
  planetsSection = document.querySelector('section#planets');
  charactersSection = document.querySelector('section#characters');
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get('id');
  getFilm(id);
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id);
    film.planets = await fetchPlanets(film);
    film.characters = await fetchCharacters(film);
  } catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderFilm(film);
}

async function fetchFilm(id) {
  const filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json());
}

async function fetchPlanets(film) {
  const url = `${baseUrl}/films/${film?.id}/planets`;
  const planets = await fetch(url)
    .then(res => res.json());
  return planets;
}

async function fetchCharacters(film) {
  const url = `${baseUrl}/films/${film?.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json());
  return characters;
}

const renderFilm = film => {
  document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say the film title
  filmH1.textContent = film?.title;

  const planetsLis = film?.planets?.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</a></li>`);
  planetsSection.innerHTML = `<h2>Planets</h2><ul>${planetsLis.join("")}</ul>`;

  const charactersLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</a></li>`);
  charactersSection.innerHTML = `<h2>Characters</h2><ul>${charactersLis.join("")}</ul>`;
}

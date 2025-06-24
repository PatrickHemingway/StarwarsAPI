let filmH1;
let planetsSection;
let charactersSection;
const baseUrl = `https://swapi.info/api`;

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
  const planetUrls = film.planets;
  const planets = [];

  for (const url of planetUrls) {
    const planet = await fetch(url)
      .then(res => res.json());
    planets.push(planet);
  }
  return planets;
}

async function fetchCharacters(film) {
  const characterUrls = film.characters;
  const characters = [];

  for (const url of characterUrls) {
    const character = await fetch(url)
      .then(res => res.json());
    characters.push(character);
  }
  console.log("Characters: ", characters)
  return characters;
}

const renderFilm = film => {
  document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say the film title
  filmH1.textContent = film?.title;

  const planetsLis = film?.planets?.map(planet => {
    const planetUrl = new URL(planet.url);
    const planetId = planetUrl.pathname.split('/').filter(Boolean).pop(); // Extract the last segment
    return `<li><a href="/planet.html?id=${planetId}">${planet.name}</a></li>`;
  });

  planetsSection.innerHTML = `<h2>Planets</h2><ul class="planets-list">${planetsLis.join("")}</ul>`;

  const charactersLis = film?.characters?.map(character => {
    const characterUrl = new URL(character.url);
    const characterId = characterUrl.pathname.split('/').filter(Boolean).pop(); // Extract the last segment
    return `<li><a href="/character.html?id=${characterId}">${character.name}</a></li>`;
  });

  charactersSection.innerHTML = `<h2>Characters</h2><ul class="characters-list">${charactersLis.join("")}</ul>`;
}

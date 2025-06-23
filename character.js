let nameH1;
let birthYearSpan;
let heightSpan;
let massSpan;
let filmsDiv;
let planetDiv;
const baseUrl = `https://swapi.info/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  birthYearSpan = document.querySelector('span#birth_year');
  massSpan = document.querySelector('span#mass');
  heightSpan = document.querySelector('span#height');
  homeworldSpan = document.querySelector('span#homeworld');
  filmsUl = document.querySelector('#films>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getCharacter(id)
});

async function getCharacter(id) {
  let character;
  try {
    character = await fetchCharacter(id)
    character.homeworld = await fetchHomeworld(character)
    character.films = await fetchFilms(character)
  }
  catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  renderCharacter(character);

}
async function fetchCharacter(id) {
  let characterUrl = `${baseUrl}/people/${id}`;
  return await fetch(characterUrl)
    .then(res => res.json())
}

async function fetchHomeworld(character) {
  const tempUrl = new URL(character.homeworld);
  const pathnameParts = tempUrl.pathname.split('/');
  const planetId = pathnameParts[pathnameParts.lastIndexOf('planets') + 1];

  const url = `${baseUrl}/planets/${planetId}`;
  const planet = await fetch(url)
    .then(res => res.json())
  return planet;
}

async function fetchFilms(character) {
  const url = `${baseUrl}/characters/${character?.id}/films`;

  const filmUrls = character.films;
  const films = [];

  for (const url of filmUrls) {
    const film = await fetch(url)
      .then(res => res.json());
    films.push(film);
  }

  return films;
}

const renderCharacter = character => {
  document.title = `SWAPI - ${character?.name}`;  // Just to make the browser tab say their name
  nameH1.textContent = character?.name;
  heightSpan.textContent = character?.height;
  massSpan.textContent = character?.mass;
  birthYearSpan.textContent = character?.birth_year;

  console.log("Character: ", character)

  const tempUrl = new URL(character.homeworld.url);
  const pathnameParts = tempUrl.pathname.split('/');
  const planetId = pathnameParts[pathnameParts.lastIndexOf('planets') + 1];

  homeworldSpan.innerHTML = `<a href="/planet.html?id=${planetId}">${character?.homeworld.name}</a>`;
  const filmsList = character?.films?.map(film => {

    const tempUrl = new URL(film.url);
    const pathnameParts = tempUrl.pathname.split('/');
    const filmId = pathnameParts[pathnameParts.lastIndexOf('films') + 1];

    return `<li><a href="films/film.html?id=${filmId}">${film.title}</li>`
  })
  filmsUl.innerHTML = filmsList.join("");
}

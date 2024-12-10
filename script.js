const urrl = "https://pokeapi.co/api/v2/pokemon";


async function fetchApi() {
  const pl = document.getElementById("pokemonList");
  const lm = document.getElementById("loadingMessage");
  const em = document.getElementById("errorMessage");

  try {
    lm.textContent = "Loading Pokemon...";
    em.textContent = "";

    const res = await fetch(`${urrl}?limit=50`);
    if (!res.ok) {
      throw new Error("Failed to load Pokemon.");
    }

    const data = await res.json();
    lm.textContent = "";


    pl.innerHTML = data.results
      .map(
        (pokemon) =>
          `<div class="pokemon-item">${pokemon.name.toUpperCase()}</div>`
      )
      .join("");
  } catch (error) {
    lm.textContent = "";
    em.textContent = error.message;
  }
}


async function searchPokemon() {
    const searchInp = document.getElementById("searchInput").value.toLowerCase();
    const pokelis = document.getElementById("pokemonList");
    const errmes = document.getElementById("errorMessage");
    const loadmsg = document.getElementById("loadingMessage");
  
    if (!searchInp) {
      errmes.textContent = "Please type the Pokemon name.";
      return;
    }
  
    try {
      loadmsg.textContent = "Searching Pokemon...";
      errmes.textContent = "";
  
      const response = await fetch(`${urrl}/${searchInp}`);
      if (!response.ok) {
        throw new Error("Pokemon not found.");
      }
  
      const data = await response.json();
      loadmsg.textContent = "";
  
      // Display Pokémon details
      pokelis.innerHTML = `
        <div class="pokemon-item">
          <h3>${data.name.toUpperCase()}</h3>
          <img src="${data.sprites.front_default}" alt="${data.name}" />
          <p>Height: ${data.height}</p>
          <p>Weight: ${data.weight}</p>
          <p>Base Experience: ${data.base_experience}</p>
        </div>
      `;
    } catch (error) {
      loadmsg.textContent = "";
      errmes.textContent = error.message;
    }
  }

  
  fetchApi();

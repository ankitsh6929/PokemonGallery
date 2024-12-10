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
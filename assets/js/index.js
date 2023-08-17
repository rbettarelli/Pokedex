const pokemonList = document.getElementById("pokemonList");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const limit = 10;
let offset = 0;

function upperCaseFirst(string) {
  return string[0].toUpperCase() + string.substring(1);
}

function loadPokemonItem(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) =>
          `<li class="pokemon ${pokemon.type}">
      <span class="number">${pokemon.number}</span>
      <span class="name"> ${upperCaseFirst(pokemon.name)} </span>
      <div class="detail">
        <ol class="types">
          ${pokemon.types
            .map((type) => `<li class="type ${type}"> ${upperCaseFirst(type)}`)
            .join(" ")}
        </ol>
        <img
        src="${pokemon.photo}"
          alt="${pokemon.name}"
        />
      </div>
  
      
    </li>`
      )
      .join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItem(offset, limit);

loadMoreBtn.addEventListener("click", () => {
  offset += limit;
  loadPokemonItem(offset, limit);
});

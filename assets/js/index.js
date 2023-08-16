const limit = 10;
const offset = 0;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

function returnPokemonToOl(pokemon) {
  return `<li class="pokemon">
    <span class="number">#001</span>
    <span class="name"> ${pokemon.name} </span>
    <div class="detail">
      <ol class="types">
        <li class="type">Grass</li>
        <li class="type">Grass</li>
      </ol>
      <img
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/35.svg"
        alt="${pokemon.name}"
      />
    </div>

    
  </li>`;
}

const pokemonList = document.getElementById("pokemonList");

pokeApi.getPokemons().then((pokemons = []) => {
  pokemonList.innerHTML += pokemons.map(returnPokemonToOl).join('');
  
  
});

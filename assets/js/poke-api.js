const pokeApi = {};

function convertPokeDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  pokemon.weight = pokeDetail.weight;
  pokemon.height = pokeDetail.height;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
  const types = (pokemon.types = pokeDetail.types.map(
    (typeSlot) => typeSlot.type.name
  ));
  const [type] = types;
  pokemon.type = type;

  const abilities = (pokemon.abilities = pokeDetail.abilities.map(
    (ability) => ability.ability.name
  ));
  console.log(abilities); // Verifique se as habilidades estão sendo exibidas corretamente no console
  pokemon.abilities = abilities;

  const stats = pokeDetail.stats.map((stat) => {
    return {
      base_stat: stat.base_stat,
      name: stat.stat.name
    };
  });
  
  pokemon.base_stat = stats.map((stat) => stat.base_stat);
  pokemon.stat_name = stats.map((stat) => stat.name);
  pokemon.stats = stats

 
  return pokemon;
}

pokeApi.getPokemonById = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return fetch(url).then((response) => response.json());
};

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailReqeust) => Promise.all(detailReqeust))
    .then((pokemonDetails) => pokemonDetails);
};

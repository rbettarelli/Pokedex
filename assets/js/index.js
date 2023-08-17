const pokemonList = document.getElementById("pokemonList");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const pokemons = document.querySelectorAll(".pokemon");
const modal = document.getElementById("myModal");
const modalClose = document.getElementById("modalClose");

const modalContent = document.getElementById("modal-content");

const closeBtn = document.getElementsByClassName("close")[0];

const limit = 10;
let offset = 0;
let pokemonsData = [];
const maxRecords = 151;

function loadPokemonItem(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonsData = pokemons;
    const newHtml = pokemons
      .map(
        (pokemon) =>
          `<li class="pokemon ${pokemon.type}" id="${pokemon.number}">
      <span class="number">${pokemon.number}</span>
      <span class="name"> ${pokemon.name} </span>
      <div class="detail">
        <ol class="types">
          ${pokemon.types
            .map((type) => `<li class="type ${type}"> ${type}`)
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
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItem(offset, newLimit);

    loadMoreBtn.parentElement.removeChild(loadMoreBtn);
  } else {
    loadPokemonItem(offset, limit);
  }
});

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

// ...
pokemonList.addEventListener("click", (e) => {
  const selectedPokemon = e.target.closest(".pokemon");
  if (selectedPokemon) {
    const clickedPokemonId = parseInt(selectedPokemon.id, 10);
    const clickedPokemon = pokemonsData.find(
      (pokemon) => pokemon.number === clickedPokemonId
    );

    if (clickedPokemon) {
      const modalContent = document.getElementById("modal-content");
      
      
      modalContent.innerHTML = `
      
        <div class="modalPhoto">
        <img src="${clickedPokemon.photo}" />
        </div>
        <div class="modalInfo"> 
        <p><strong>Name:</strong> ${clickedPokemon.name}</p>
        <p><strong>Number:</strong> ${clickedPokemon.number}</p>
        <p><strong>Type:</strong> ${clickedPokemon.type}</p>
        <p><strong>Abilitiy:</strong> ${clickedPokemon.abilities.join(", ")}</p>
        <p><strong>Weight:</strong> ${clickedPokemon.weight}</p>
        <p><strong>Height:</strong> ${clickedPokemon.height}</p>
        <ul id="stats-list">
          <!-- Aqui serão adicionados os elementos dos stats -->
        </ul>
      </div>
      
      `;

      const statsList = document.getElementById("stats-list");
      statsList.innerHTML = "";

      // Adiciona os elementos dos stats à lista com barras de progresso e cores condicionais
      clickedPokemon.stats.forEach((stat) => {
        const statItem = document.createElement("li");
        let colorClass = "";

        if (stat.base_stat < 45) {
          colorClass = "red";
        } else if (stat.base_stat < 70) {
          colorClass = "yellow";
        } else {
          colorClass = "green";
        }

        statItem.innerHTML = `
          ${stat.name}: ${stat.base_stat}
          <div class="progress">
            <div class="progress-bar ${colorClass}" style="width: ${stat.base_stat}%;"></div>
          </div>
        `;
        statsList.appendChild(statItem);
      });

      modal.style.display = "block";
    } else {
      console.error(
        `Pokemon with ID ${clickedPokemonId} not found in pokemonsData.`
      );
    }
  }
});

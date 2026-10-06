const container = document.getElementById('pokedex');
const API_URL = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=100';

async function fetchPokemon() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        for (const pokemon of data.results) {
            // Consultamos cada Pokémon para obtener su imagen oficial
            const pokeRes = await fetch(pokemon.url);
            const pokeData = await pokeRes.json();
            createCard(pokeData);
        }
    } catch (error) {
        console.error('Error al cargar la Pokédex:', error);
    }
}

function createCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card');

    const sprite = pokemon.sprites.front_default || '';

    card.innerHTML = `
    <img src="${sprite}" alt="${pokemon.name}">
    <h3>#${pokemon.id} ${pokemon.name}</h3>
  `;

    container.appendChild(card);
}

fetchPokemon();
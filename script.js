const container = document.getElementById('pokedex');
const API_URL = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=100';

// Paleta de colores pastel por tipo de Pokémon
const pastelColors = {
    grass: '#d2f3e0',
    fire: '#ffe1d6',
    water: '#d6eefc',
    bug: '#e2f3c2',
    normal: '#ece8e1',
    poison: '#edd6f8',
    electric: '#fff3c4',
    ground: '#f6e4ce',
    fairy: '#fcddef',
    fighting: '#f8d2d4',
    psychic: '#ffd8e8',
    rock: '#e8e0d0',
    ghost: '#dcd3f5',
    ice: '#dcf5f7',
    dragon: '#dcd3ff',
    dark: '#d5d0cd',
    steel: '#dbe4eb',
    flying: '#e3ecff'
};

async function fetchPokemon() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        for (const pokemon of data.results) {
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

    // Obtener el tipo principal para el fondo pastel
    const primaryType = pokemon.types[0].type.name;
    const bgColor = pastelColors[primaryType] || '#f0f0f0';
    card.style.backgroundColor = bgColor;

    const sprite = pokemon.sprites.other['official-artwork'].front_default ||
        pokemon.sprites.front_default;

    const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;

    const typesHTML = pokemon.types.map(t =>
        `<span class="type-badge">${t.type.name}</span>`
    ).join('');

    card.innerHTML = `
    <span class="poke-id">${formattedId}</span>
    <div class="img-container">
      <img src="${sprite}" alt="${pokemon.name}">
    </div>
    <h3>${pokemon.name}</h3>
    <div class="types">${typesHTML}</div>
  `;

    container.appendChild(card);
}

fetchPokemon();
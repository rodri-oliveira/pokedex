const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHtml = pokemons => listPokemons = pokemons.reduce((acc, pokemon) => {

    const types = pokemon.types.map(typeInfo => typeInfo.type.name)

    acc += `
            <li class="card ${types[0]}">
            <img class="card-image" alt="${pokemon.name}" src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
                <h2 class="card-title"> ${pokemon.id}. ${pokemon.name} </h2>
                <p class="card-subtitle"> ${types.join(' | ')} </p>
            </li>
        `
    return acc
}, '')

const insertPokemonsIntoPages = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHtml)
    .then(insertPokemonsIntoPages)
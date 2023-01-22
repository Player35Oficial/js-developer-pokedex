const ol = document.getElementById('pokemonList')
const offset = 0
const limit = 1


function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon  ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            
            <img src="${pokemon.photo}"
            alt="${pokemon.name}">
        </div>
        <ol class="detail_status">
            <li> HP <progress value="${pokemon.stats.hp}" max="100">${pokemon.stats.hp}</progress> ${pokemon.stats.hp} </li>
            <li> Ataque <progress value="${pokemon.stats.attack}" max="100">${pokemon.stats.attack}</progress> ${pokemon.stats.attack} </li>
        </ol>
    </li>
    `
}

pokeApi.getPokemons().then((pokemons = []) => {
        ol.innerHTML += pokemons.map(convertPokemonToLi).join('')
    })

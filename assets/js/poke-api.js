
pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.stats.hp = pokeDetail.stats[0].base_stat
    pokemon.stats.attack = pokeDetail.stats[1].base_stat
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default 

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch (pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => { 
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    
    return fetch (url) // fez o fetch no servidor
    .then((Response) => Response.json()) // converteu a lista para Json
    .then((jsonBody) => jsonBody.results) // pegamos os pokemons dentro do json
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // transformamos a lista em uma outra lista, De promessas, dos detalhe do pokemon,  em Json
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails)
}
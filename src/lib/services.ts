//List of async functions
const getPokemon = async (pokemon:string) => {
    const fetchData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await fetchData.json();

    return data;
}

const getSpecies = async(pokemon:string) =>{
    const fetchData = await fetch (`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`)
    const data = await fetchData.json()

    return data
}
const getEvolution = async(evolutionChain:string) =>{
    const fetchData = await fetch(evolutionChain)
    const data = await fetchData.json()


    return data
}
const getLocation = async (id:number) => {
    const fetchData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`)
    const data = await fetchData.json()

    return data;
}

export {getPokemon, getSpecies, getEvolution, getLocation}
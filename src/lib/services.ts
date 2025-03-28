import { Santiago } from "@/context/context";

//List of async functions
const getPokemon = async (pokemon: Santiago) => {
    let fetchData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    let data = await fetchData.json();
    let counter=0
    if(typeof pokemon === 'number'){
        console.log(counter++)
        if(pokemon<650){
            return data
        }
        else{
            fetchData = await fetch(`https://pokeapi.co/api/v2/pokemon/ditto`)
            data = await fetchData.json()
            alert("You cannot search any pokemon above Generation V")
        }
    }
    else if(typeof pokemon == 'string') {
        if(data.id>649){
            fetchData = await fetch(`https://pokeapi.co/api/v2/pokemon/ditto`)
            data = await fetchData.json()
            alert("You cannot search any pokemon above Generation V")
        }
    }
    return data;
}

const getSpecies = async (pokemon: string) => {
    const fetchData = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`)
    const data = await fetchData.json()

    return data
}
const getEvolution = async (evolutionChain: string) => {
    const fetchData = await fetch(evolutionChain)
    const data = await fetchData.json()


    return data
}
const getLocation = async (id: number) => {
    const fetchData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`)
    const data = await fetchData.json()

    return data;
}

const getLocalStorage = () => {
    if (typeof window === 'undefined') return [];

    let localStorageData = localStorage.getItem("NextJSPokemon")

    if (localStorageData == null) return [];

    return JSON.parse(localStorageData)
}

const removeFromLocalStorage = (pokemon: string | undefined) => {
    if (typeof window === 'undefined') return; // Prevents error on server

    if (pokemon != undefined) {
        let namesArr = getLocalStorage();

        let nameindex = namesArr.indexOf(pokemon);

        if (nameindex !== -1) {
            namesArr.splice(nameindex, 1);
            localStorage.setItem('NextJSPokemon', JSON.stringify(namesArr));
        }
    }

}
const saveToLocalStorageByName = (pokemon: string | undefined) => {
    if (typeof window === 'undefined') return; // Prevents error on server

    if (pokemon != undefined) {
        let namesArr = getLocalStorage();

        if (!namesArr.includes(pokemon)) {
            namesArr.push(pokemon);
        }

        localStorage.setItem('NextJSPokemon', JSON.stringify(namesArr));
    }
}
const findPokemon = (pokemon: string) => {
    if (typeof window !== 'undefined') {
        let namesArr = getLocalStorage();

        if (namesArr.includes(pokemon)) return true
    }
    return false
}

//npm run build
//Correct all error
// Host on vercel after fixing the error!!!

export { getPokemon, getSpecies, getEvolution, getLocation, getLocalStorage, saveToLocalStorageByName, removeFromLocalStorage, findPokemon }
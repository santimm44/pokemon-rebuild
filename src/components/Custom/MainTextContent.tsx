'use client'

import { getEvolution, getLocalStorage, getLocation, getPokemon, getSpecies } from '@/lib/services';
import { useAppContext } from '../../context/context'
import React, { useEffect, useState } from 'react'

const MainTextContent = () => {
  const myAppContext = useAppContext();
  interface PokemonTypes {
    typeOne: string,
    typeTwo: string
  }

  const [pokemonType, setPokemonType] = useState<PokemonTypes>()
  const [pokemonName, setPokemonName] = useState("")
  const [pokemonId, setPokemonId] = useState("")
  const [pokemonEncounters, setPokemonEncounter] = useState<string[]>([])
  const [pokemonAbilities, setPokemonAbilities] = useState<string[]>([])
  const [pokemonMoves, setPokemonMoves] = useState<string[]>([])
  const [evolutionChain, setEvolutionChain] = useState("")
  const [pokemonEvolutions, setPokemonEvolutions] = useState<string[]>([])
  const [buttonClicked, setButtonClick] = useState<string>("Location")
  const [favoriteList, setFavoriteList] = useState<string[]>([])
  const buttonNames: string[] = ["Location", "Abilities", "Moves", "Evolution"]

  const handleButtonClick = (buttonName: string) => {
    setButtonClick(buttonName)
  }

  const handleFavoriteButtons = (name: string) => {
    myAppContext.setSearchPokemon(name)
  }

  useEffect(() => {
    setFavoriteList(getLocalStorage())
    if (myAppContext.showFavorites == true) {
      setButtonClick("Favorites")
    }
  }, [myAppContext.showFavorites])


  useEffect(() => {
    const fetchPokemon = async () => {

      const pokemonData = await getPokemon(myAppContext.searchPokemon != undefined || myAppContext.searchPokemon != null ? myAppContext.searchPokemon : "eevee")

      setPokemonId(pokemonData.id);
      setPokemonName(pokemonData.name)
      for (let i = 0; i < pokemonData.types.length; i++) {

        if (i == 0) setPokemonType({
          typeOne: pokemonData.types[i].type.name,
          typeTwo: ""
        })

        if (i == 1) setPokemonType({
          typeOne: pokemonData.types[i - 1].type.name,
          typeTwo: pokemonData.types[i].type.name
        })
      }
    }

    const fetchAbilitiesAndMoves = async () => {
      const pokemonData = await getPokemon(myAppContext.searchPokemon != undefined || myAppContext.searchPokemon != null ? myAppContext.searchPokemon : "eevee")

      for (let i = 0; i < pokemonData.abilities.length; i++) {
        setPokemonAbilities(existingArray => [...existingArray, pokemonData.abilities[i].ability.name])
      }

      for (let i = 0; i < pokemonData.moves.length; i++) {
        setPokemonMoves(existingArray => [...existingArray, pokemonData.moves[i].move.name])
      }
    }

    setPokemonEvolutions([])
    setPokemonAbilities([])
    setPokemonEncounter([])
    setPokemonMoves([])
    fetchAbilitiesAndMoves()
    fetchPokemon()
  }, [myAppContext.searchPokemon])

  useEffect(() => {

    const fetchLocation = async (idNumber: number) => {
      const pokemonLocationData: { location_area: { name: string } }[] = await getLocation(idNumber)

      if (pokemonLocationData.length > 0) {

        for (let i = 0; i < pokemonLocationData.length; i++) {
          setPokemonEncounter(existingArray => [...existingArray, pokemonLocationData[i].location_area.name])
        }
      }
      else setPokemonEncounter(["N/A"]);
    }

    if (pokemonId != "") {
      fetchLocation(parseInt(pokemonId))
    }
  }, [pokemonId])

  useEffect(() => {
    const fetchEvolutions = async () => {

      const pokemonSpeciesData = await getSpecies(pokemonName)
      if (pokemonSpeciesData.evolution_chain != undefined) {
        setEvolutionChain(pokemonSpeciesData.evolution_chain.url)
      }

    }

    fetchEvolutions()
  }, [pokemonName])

  useEffect(() => {
    const secondEvoultionUseEffect = async () => {

      const pokemonEvolutionData = await getEvolution(evolutionChain)

      if (pokemonEvolutionData.chain.evolves_to.length != null) {

        if (pokemonEvolutionData.chain.evolves_to.length > 1) {
          setPokemonEvolutions(existingArray => [...existingArray, pokemonEvolutionData.chain.species.name])
          for (let i = 0; i < pokemonEvolutionData.chain.evolves_to.length; i++) {
            const checkPokeId = await getPokemon(pokemonEvolutionData.chain.evolves_to[i].species.name)
            if (checkPokeId.id < 650) {
              setPokemonEvolutions(existingArray => [...existingArray, pokemonEvolutionData.chain.evolves_to[i].species.name])
            }
          }
        }
        else {
          let newChain = pokemonEvolutionData.chain;
          const tempArray: string[] = [];

          setPokemonEvolutions([])
          do {
            const checkPokeId = await getPokemon(newChain.species.name)

            if (checkPokeId.id < 650) {
              tempArray.push(newChain.species.name)
            }

            newChain = newChain.evolves_to[0];
          }
          while (newChain != null);
          setPokemonEvolutions(tempArray)
        }
      }
    }

    secondEvoultionUseEffect()
  }, [evolutionChain])



  return (
    <div className='flex flex-col h-full gap-y-6 '>
      <div className='flex justify-around row-start-1 row-end-2 col-start-1 col-end-13'>
        {buttonNames.map((names, index) => {
            return (
              <div key={index}>
                <button value={names} onClick={() => handleButtonClick(names)} className='cursor-pointer  hover:underline lg:row-start-1 lg:row-end-2 lg:col-start-5 lg:col-end-7 max-lg:col-start-8 max-lg:col-end-12 mt-4 text-black'>{names}</button>
              </div>
            )
          })}
      </div>

      <div className=''>
        <div className='flex justify-between ps-8 pt-4 pe-8 col-start-1 col-end-13 row-start-1 row-end-2'>
          <h2 className='font-bold max-sm:text-[.9rem] max-sm:flex max-sm:flex-col'>Type: {pokemonType?.typeOne} {pokemonType?.typeTwo != undefined ? pokemonType?.typeTwo : ""}</h2>
          <h2 className='font-bold max-sm:text-[.9rem] max-sm:flex max-sm:flex-col'>Name: {pokemonName}</h2>
          <h2 className='font-bold max-sm:text-[.9rem] max-sm:flex max-sm:flex-col'>Pokedex#{pokemonId}</h2>
        </div>
        <div id='bodyOfText'>
          <p className={`col-start-1 col-end-13 row-start-2 row-end-13 ${buttonClicked == "Evolution" ? "" : "hidden"}`}>
            {pokemonEvolutions.length > 1 ? pokemonEvolutions.join(" | ") : pokemonEvolutions}
          </p>
          <p className={`col-start-1 col-end-13 row-start-2 row-end-13 ${buttonClicked == "Location" ? "" : "hidden"}`}>
            {pokemonEncounters.length > 1 ? pokemonEncounters.join(" | ") : pokemonEncounters}
          </p>
          <p className={`col-start-1 col-end-13 row-start-2 row-end-13 ${buttonClicked == "Moves" ? "" : "hidden"}`}>
            {pokemonMoves.length > 1 ? pokemonMoves.join(" | ") : pokemonMoves}
          </p>
          <p className={`col-start-1 col-end-13 row-start-2 row-end-13 ${buttonClicked == "Abilities" ? "" : "hidden"}`}>
            {pokemonAbilities.join(" | ")}
          </p>

          <div className={`p-5 col-start-1 col-end-13 row-start-2 row-end-13 ${buttonClicked == "Favorites" ? "" : "hidden"}`}>
            Your Favorite Pokemon:
            <div className='grid grid-cols-3 '>
              {favoriteList.map((pokemon, index) => {
                return (
                  <div key={index}>
                    <br />
                    <button onClick={() => handleFavoriteButtons(pokemon)} className='underline hover:text-blue-500'>
                      {pokemon}
                    </button>
                  </div>
                )})}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainTextContent
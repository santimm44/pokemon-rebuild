'use client'

import { getEvolution, getLocation, getPokemon, getSpecies } from '@/lib/services';
import { useAppContext } from '../../context/context'

import React, { useEffect, useState } from 'react'

const MainTextContent = () => {
  const myAppContext = useAppContext();


  interface PokemonTypes {
    typeOne: string,
    typeTwo: string
  }

  let [pokemonType, setPokemonType] = useState<PokemonTypes>()
  let [pokemonName, setPokemonName] = useState("")
  let [pokemonId, setPokemonId] = useState("")
  let [pokemonEncounters, setPokemonEncounter] = useState<string[]>([])
  let [pokemonAbilities, setPokemonAbilities] = useState<string[]>([])
  let [pokemonMoves, setPokemonMoves] = useState<string[]>([])
  let [evolutionChain, setEvolutionChain] = useState("")
  let [pokemonEvolutions, setPokemonEvolutions] = useState<string[]>([])
  let [buttonClicked, setButtonClick] = useState<string>("Location")

  const buttonNames: string[] = ["Location", "Abilities", "Moves", "Evolution"]



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

      //for loop to push all moves into variable moves
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
  
  useEffect(()=>{

    const fetchLocation = async (idNumber: number) => {
      const pokemonLocationData: { location_area: { name: string } }[] = await getLocation(idNumber)

      if (pokemonLocationData.length > 0) {

        for (let i = 0; i < pokemonLocationData.length; i++) {
          setPokemonEncounter(existingArray => [...existingArray, pokemonLocationData[i].location_area.name])
        }
      }
      else setPokemonEncounter(["N/A"]);
    }
    
    if(pokemonId != ""){
      fetchLocation(parseInt(pokemonId))
    }
  },[pokemonId])

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
            let checkPokeId = await getPokemon(pokemonEvolutionData.chain.evolves_to[i].species.name)
            if (checkPokeId.id < 650) {
              setPokemonEvolutions(existingArray => [...existingArray, pokemonEvolutionData.chain.evolves_to[i].species.name])
            }
          }
        }
        else {
          let newChain = pokemonEvolutionData.chain;
          let tempArray: string[] = [];
          
          setPokemonEvolutions([])
          do {
            let checkPokeId = await getPokemon(newChain.species.name)

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

  const handleButtonClick = (buttonName: string) => {
    console.log(buttonName)
    setButtonClick(buttonName)
  }

  return (
    <div>

      <div className='flex justify-around row-start-1 row-end-2 col-start-1 col-end-13'>
        {
          buttonNames.map((names, index) => {
            return (
              <div key={index}>
                <button value={names} onClick={(e) => handleButtonClick(names)} className='hover:border-[#FF6961] hover:bg-white hover:underline lg:row-start-1 lg:row-end-2 lg:col-start-5 lg:col-end-7 max-lg:col-start-8 max-lg:col-end-12 rounded-[4rem] border-2 mt-4 text-black border-black bg-white'>{names}</button>
              </div>
            )
          })
        }
      </div>

      <div className='bg-[#ffffffBE]'>

        <div className='flex justify-between ps-8 pt-4 pe-8 col-start-1 col-end-13 row-start-1 row-end-2'>
          <h2 className='font-bold max-sm:text-[.9rem] max-sm:flex max-sm:flex-col'>Type: {pokemonType?.typeOne} {pokemonType?.typeTwo != undefined ? pokemonType?.typeTwo : ""}</h2>
          <h2 className='font-bold max-sm:text-[.9rem] max-sm:flex max-sm:flex-col'>Name: {pokemonName}</h2>
          <h2 className='font-bold max-sm:text-[.9rem] max-sm:flex max-sm:flex-col'>Pokedex#{pokemonId}</h2>
        </div>
        <div className=''>

        </div>
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
      </div>
    </div>
  )
}

export default MainTextContent
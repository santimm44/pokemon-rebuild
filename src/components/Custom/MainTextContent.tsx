'use client'

import { getEvolution, getLocation, getPokemon, getSpecies } from '@/lib/services';
import { useAppContext } from '../../context/context'

import React, { useEffect, useState } from 'react'


const MainTextContent = () => {
  const myAppContext = useAppContext();

  const [userPokemonInput, setUserPokemonInput] = useState("")

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

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonData = await getPokemon(userPokemonInput != undefined || userPokemonInput != null ? "eevee" : userPokemonInput)

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

    const fetchLocation = async (idNumber: number) => {
      const pokemonLocationData: { location_area: { name: string } }[] = await getLocation(idNumber)

      if (pokemonLocationData.length > 0) {

        for (let i = 0; i < pokemonLocationData.length; i++) {
          setPokemonEncounter(existingArray => [...existingArray, pokemonLocationData[i].location_area.name])
        }
      }
      else setPokemonEncounter(["N/A"]);
    }

    const fetchAbilitiesAndMoves = async () => {
      const pokemonData = await getPokemon(userPokemonInput != undefined || userPokemonInput != null ? "eevee" : userPokemonInput)

      for (let i = 0; i < pokemonData.abilities.length; i++) {
        setPokemonAbilities(existingArray => [...existingArray, pokemonData.abilities[i].ability.name])
      }

      //for loop to push all moves into variable moves
      for (let i = 0; i < pokemonData.moves.length; i++) {
        setPokemonMoves(existingArray => [...existingArray, pokemonData.moves[i].move.name])
      }
    }


    fetchAbilitiesAndMoves()
    fetchPokemon()
    fetchLocation(133)
  }, [])

  // useEffect(() => {
  //   const fetchEvolutions = async () => {

  //     const pokemonSpeciesData = await getSpecies(pokemonName)
  //     setEvolutionChain(pokemonSpeciesData.evolution_chain.url)

  //   }

  //   fetchEvolutions()
  // }, [pokemonName])

  // useEffect(() => {

  //   const secondEvoultionUseEffect = async () => {

  //     const pokemonEvolutionData = await getEvolution(evolutionChain)


  //     if (pokemonEvolutionData.chain.evolves_to.length != null) {

  //       if (pokemonEvolutionData.chain.evolves_to.length > 1) {
  //         setPokemonEvolutions(existingArray => [...existingArray, pokemonEvolutionData.chain.species.name])

  //         for (let i = 0; i < pokemonEvolutionData.chain.evolves_to.length; i++) {
  //           let checkPokeId = await getPokemon(pokemonEvolutionData.chain.evolves_to[i].species.name)
  //           if (checkPokeId.id < 650) {
  //             setPokemonEvolutions(existingArray => [...existingArray, pokemonEvolutionData.chain.evolves_to[i].species.name])
  //           }
  //         }
  //       }
  //       else {
  //         let newChain = pokemonEvolutionData.chain;
  //         do {
  //           let checkPokeId = await getPokemon(newChain.species.name)
  //           if (checkPokeId.id < 650) {
  //             setPokemonEvolutions(existingArray => [...existingArray, newChain.species.name])
  //           }

  //           newChain = newChain.evolves_to[0];
  //         }
  //         while (newChain != null);
  //       }
  //     }

  //     console.log(pokemonEvolutions)
  //   }

  //   secondEvoultionUseEffect()
  // }, [evolutionChain])


  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const pokemonSpeciesData = await getSpecies(pokemonName);
  
        if (!pokemonSpeciesData || !pokemonSpeciesData.evolution_chain) {
          console.error("No evolution chain found for:", pokemonName);
          return;
        }
  
        setEvolutionChain(pokemonSpeciesData.evolution_chain.url);
      } catch (error) {
        console.error("Error fetching species data:", error);
      }
    };
  
    fetchSpecies();
  }, [pokemonName]);
  
  useEffect(() => {
    if (!evolutionChain) return; // Wait until evolutionChain is available
  
    const fetchEvolutions = async () => {
      try {
        const pokemonEvolutionData = await getEvolution(evolutionChain);
  
        if (!pokemonEvolutionData?.chain) return;
  
        if (pokemonEvolutionData.chain.evolves_to.length > 1) {
          setPokemonEvolutions(existingArray => [
            ...existingArray,
            pokemonEvolutionData.chain.species.name
          ]);
  
          for (let i = 0; i < pokemonEvolutionData.chain.evolves_to.length; i++) {
            let checkPokeId = await getPokemon(pokemonEvolutionData.chain.evolves_to[i].species.name);
            if (checkPokeId.id < 650) {
              setPokemonEvolutions(existingArray => [
                ...existingArray,
                pokemonEvolutionData.chain.evolves_to[i].species.name
              ]);
            }
          }
        } else {
          let newChain = pokemonEvolutionData.chain;
          do {
            let checkPokeId = await getPokemon(newChain.species.name);
            if (checkPokeId.id < 650) {
              setPokemonEvolutions(existingArray => [...existingArray, newChain.species.name]);
            }
            newChain = newChain.evolves_to[0];
          } while (newChain);
        }
      } catch (error) {
        console.error("Error fetching evolution data:", error);
      }
    };
  
    fetchEvolutions();
  }, [evolutionChain]); // Now this runs only when evolutionChain is available
  

  return (
    <div>
      <div className='flex justify-between ps-8 pt-4 pe-8 col-start-1 col-end-13 row-start-1 row-end-2'>
        <h2 className='font-bold max-sm:text-[.9rem] max-sm:flex max-sm:flex-col'>Type: {pokemonType?.typeOne} {pokemonType?.typeTwo != undefined ? pokemonType?.typeTwo : ""}</h2>
        <h2 className='font-bold max-sm:text-[.9rem] max-sm:flex max-sm:flex-col'>Name: {pokemonName}</h2>
        <h2 className='font-bold max-sm:text-[.9rem] max-sm:flex max-sm:flex-col'>Pokedex#{pokemonId}</h2>
      </div>
      <p className='col-start-1 col-end-13 row-start-2 row-end-13 hidden'>
        {pokemonEncounters.length > 1 ? pokemonEncounters.join(" | ") : pokemonEncounters}
      </p>
      <p className='col-start-1 col-end-13 row-start-2 row-end-13'>
        {pokemonMoves.length > 1 ? pokemonMoves.join(" | ") : pokemonMoves}
      </p>
      <p className='col-start-1 col-end-13 row-start-2 row-end-13'>
        {pokemonAbilities.join(" | ")}
      </p>
    </div>
  )
}

export default MainTextContent
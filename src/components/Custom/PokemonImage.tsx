'use client'

import { useAppContext } from '@/context/context';
import { getPokemon } from '@/lib/services'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const PokemonImage = () => {
  const myAppContext = useAppContext();

  let [pokemonName, setPokemonName] = useState("")
  let [pokemonSrcImage, setPokemonSrcImage] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png")
  let [pokemonSrcShinyImage, setPokemonSrcShinyImage] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png")
  let [shinyOrNot, setShinyOrNot] = useState()
  let [pokeData, setPokeData] = useState<boolean>(false)

  useEffect(() => {
    const fetchPokemonImage = async () => {
      const pokemonData = await getPokemon(myAppContext.searchPokemon != undefined || myAppContext.searchPokemon != null ? myAppContext.searchPokemon : "eevee")
      
      if (pokemonData != null || pokemonData != undefined) setPokeData(true)
      else setPokeData(false)
      
      if (pokeData) {
        setPokemonSrcImage(pokemonData.sprites.front_default)
        if (pokemonData.sprites.shiny_default) setPokemonSrcShinyImage(pokemonData.sprites.shiny_default)
        setPokemonName(pokemonData.name)
      }
    }
    fetchPokemonImage()
  }, [myAppContext.searchPokemon, pokeData])


  return (
    <div>
      <img width={325} src={
        !shinyOrNot ? pokemonSrcImage : pokemonSrcShinyImage} alt={pokemonName} />
    </div>
  )
}

export default PokemonImage
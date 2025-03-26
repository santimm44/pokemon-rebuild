'use client'

import { getPokemon } from '@/lib/services'
import React, { useEffect, useState } from 'react'

const PokemonImage = () => {
  const [userPokemonInput, setUserPokemonInput] = useState("")
  let[pokemonName, setPokemonName]=useState("")
  let [pokemonSrcImage, setPokemonSrcImage] = useState("")
  let [pokemonSrcShinyImage, setPokemonSrcShinyImage]= useState("")

  useEffect(() => {
    const fetchPokemonImage = async () => {
      const pokemonData = await getPokemon(userPokemonInput != undefined || userPokemonInput != null ? "eevee" : userPokemonInput)
      
      setPokemonSrcImage(pokemonData.sprites.front_default)
      if(pokemonData.sprites.shiny_default) setPokemonSrcShinyImage(pokemonData.sprites.shiny_default)
        setPokemonName(pokemonData.name)
    }
  fetchPokemonImage()
  }, [])

  return (
    <div>
      <img src={pokemonSrcImage != "" ? pokemonSrcImage : "#"} alt={pokemonName} />
    </div>
  )
}

export default PokemonImage
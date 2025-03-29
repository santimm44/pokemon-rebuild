'use client'

import { useAppContext } from '@/context/context';
import { getPokemon } from '@/lib/services'
import React, { useEffect, useState } from 'react'

const PokemonImage = () => {
  const myAppContext = useAppContext();

  const [pokemonName, setPokemonName] = useState("")
  const [pokemonSrcImage, setPokemonSrcImage] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png")
  const [pokemonSrcShinyImage, setPokemonSrcShinyImage] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png")
  const [shinyOrNot, setShinyOrNot] = useState(false)
  const [pokeData, setPokeData] = useState<boolean>(false)

  useEffect(() => {
    const fetchPokemonImage = async () => {
      const pokemonData = await getPokemon(myAppContext.searchPokemon != undefined || myAppContext.searchPokemon != null ? myAppContext.searchPokemon : "eevee")
      
      if (pokemonData != null || pokemonData != undefined) setPokeData(true)
      else setPokeData(false)
      
      if (pokeData) {
        console.log(pokemonData)
        setPokemonSrcImage(pokemonData.sprites.front_default)
        console.log(pokemonData.sprites.front_shiny)
        setPokemonSrcShinyImage(pokemonData.sprites.shiny_default)
        setPokemonName(pokemonData.name)
      }
    }
    fetchPokemonImage()
  }, [myAppContext.searchPokemon, pokeData])

  useEffect(()=>{
    if(myAppContext.switchOn) setShinyOrNot(true)
      else setShinyOrNot(false)
  },[myAppContext.switchOn])


  return (
    <div>
      <img width={325} src={
        !shinyOrNot ? pokemonSrcImage : pokemonSrcShinyImage} alt={pokemonName} />
    </div>
  )
}

export default PokemonImage
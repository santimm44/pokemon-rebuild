'use client'

import { useAppContext } from '@/context/context';
import { getPokemon } from '@/lib/services'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const PokemonImage = () => {
  const myAppContext = useAppContext();

  const [pokemonName, setPokemonName] = useState("")
  const [pokemonSrcImage, setPokemonSrcImage] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png")
  const [pokemonSrcShinyImage, setPokemonSrcShinyImage] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png")
  const [shinyOrNot, setShinyOrNot] = useState(false)

  useEffect(() => {
    const fetchPokemonImage = async () => {
      const pokemonData = await getPokemon(myAppContext.searchPokemon ? myAppContext.searchPokemon : "eevee");

      if (pokemonData) {
        setPokemonSrcImage(pokemonData.sprites.front_default);

        if (pokemonData.sprites.front_shiny) {
          setPokemonSrcShinyImage(pokemonData.sprites.front_shiny);
        }
        setPokemonName(pokemonData.name);
      }
    };

    fetchPokemonImage();
  }, [myAppContext.searchPokemon]);

  useEffect(() => {
    if (myAppContext.switchOn) setShinyOrNot(true)
    else setShinyOrNot(false)
  }, [myAppContext.switchOn])


  return (
    <div>
      <Image width={325} height={100} src={
        !shinyOrNot ? pokemonSrcImage : pokemonSrcShinyImage} alt={pokemonName} />
    </div>
  )
}

export default PokemonImage
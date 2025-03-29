'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import heart from '/public/heart-regular.svg'
import solidHeartImg from '/public/heart-solid.svg'
import { Button } from '../ui/button'
import { findPokemon, getPokemon, removeFromLocalStorage, saveToLocalStorageByName } from '@/lib/services'
import { useAppContext } from '@/context/context'

const Heart = () => {

  const myAppContext = useAppContext();

  const [pokemonName, setPokemonName] = useState<string>()
  const [solidHeart, setSolidHeart] = useState<boolean>()
  const [pokemonNameDefined, setpokemoneNameDefined] = useState<boolean>(true)
  useEffect(() => {
    setPokemon()
  }, [myAppContext.searchPokemon])

  useEffect(() => {

    if (pokemonName == undefined) setpokemoneNameDefined(false)
    else setpokemoneNameDefined(true)

    if (pokemonName && pokemonNameDefined) {
      setSolidHeart(findPokemon(pokemonName))
    }
  }, [pokemonName, pokemonNameDefined])

  const handleOnClick = () => {
    if (solidHeart) {
      removeFromLocalStorage(pokemonName)
      setSolidHeart(false)
    }
    else {
      setSolidHeart(true)
      saveToLocalStorageByName(pokemonName)
    }
  }

  const setPokemon = async () => {
    const pokemonData = await getPokemon(myAppContext.searchPokemon)
    setPokemonName(pokemonData.name)
  }

  return (
    <Button variant="ghost" onClick={handleOnClick} className='hover:bg-transparent'>
      <Image className='h-[40px] w-auto' src={solidHeart ? solidHeartImg : heart} alt={solidHeart ? "Solid Heart Icon" : "Regular Heart Icon"} />
    </Button>
  )
}

export default Heart
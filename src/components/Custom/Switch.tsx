'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import switcher from '/public/arrow-right-arrow-left-solid.svg'
import { Button } from '../ui/button'
import { getPokemon } from '@/lib/services'

export const Switch = () => {

    const [userPokemonInput, setUserPokemonInput] = useState("")
    let [pokemonName, setPokemonName] = useState("")
    let [pokemonSrcImage, setPokemonSrcImage] = useState("")
    let [pokemonSrcShinyImage, setPokemonSrcShinyImage] = useState("")

    useEffect(() => {
        const fetchPokemonImage = async () => {
            const pokemonData = await getPokemon(userPokemonInput != undefined || userPokemonInput != null ? "eevee" : userPokemonInput)

            setPokemonSrcImage(pokemonData.sprites.front_default)
            if (pokemonData.sprites.shiny_default) setPokemonSrcShinyImage(pokemonData.sprites.shiny_default)
            setPokemonName(pokemonData.name)
        }
        fetchPokemonImage()
    }, [])

    return (
        <Button variant="ghost" className='hover:bg-transparent'>
            <Image className='h-[40px] w-auto ' src={switcher} alt='arrow right arrow left solid icon'>

            </Image>
        </Button>
    )
}

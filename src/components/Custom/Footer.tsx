'use client'
import React, { useEffect, useState, KeyboardEvent } from 'react'
import Shuffle from './Shuffle'
import Arrow from './Arrow'
import { useAppContext } from '@/context/context'

const Footer = () => {

    const myAppContext = useAppContext();

    const [userInput, setUserInput] = useState<string>("")
    const handleInput = (pokemonEntered: string) => {
        setUserInput(pokemonEntered)
    }

    const setSearchPokemon = () => {
        if(userInput != null && userInput != undefined){
            myAppContext.setSearchPokemon(userInput)
        }
    }
    const setSearchPokemonKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == "Enter" && userInput != null && userInput != undefined) {
            console.log("OnKeyDown occurs")
            myAppContext.setSearchPokemon(userInput)
        }
    }

    useEffect(() => {
        console.log(userInput)
        console.log(myAppContext.searchPokemon)

    }, [userInput])

    useEffect(() => {
        console.log(myAppContext.searchPokemon)
    }, [myAppContext.searchPokemon])

    return (
        <div className='flex w-full'>
            <div id='favorites' className='bg-white w-1/3'>
                <button className='flex'>
                    <p>Favorites</p>
                    <Shuffle />
                </button>
            </div>
            <div id='search-bar' className='bg-blue-400 flex align-baseline w-1/3 justify-between'>
                <input onKeyDown={(event) => setSearchPokemonKeyDown(event)} onChange={(event) => handleInput(event.target.value)} className='h-full' placeholder='Enter pokemon' type='text' />
                <button onClick={setSearchPokemon} >
                    <Arrow />
                </button>
            </div>
            <div id='randomizer' className='bg-white w-1/3'>
                <button>
                    <p>Randomizer</p>
                </button>
            </div>
        </div>
    )
}

export default Footer
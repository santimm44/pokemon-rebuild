'use client'
import React, { useEffect, useState, KeyboardEvent } from 'react'
import Shuffle from './Shuffle'
import Arrow from './Arrow'
import { useAppContext } from '@/context/context'
import { getPokemon } from '@/lib/services'

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
    const setSearchPokemonKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == "Enter" && userInput != null && userInput != undefined) {

            const parsedValue = parseInt(userInput, 10)

            //logic to prevent names from pokemons past gen v from being searched
            if(isNaN(parsedValue) && userInput != ""){
                
                let tempResponse = await getPokemon(userInput)

                if(tempResponse.id >649){
                    alert ("Sorry, but only pokemon below Gen V are searchable.\nHere is a ditto instead")
                    myAppContext.setSearchPokemon("ditto")
                }
                else myAppContext.setSearchPokemon(userInput)

            }
            //logic to prevent id#s from pokemon past gen v from being searched
            else if (!isNaN(parsedValue)){
                if (parsedValue > 649){
                    alert ("Sorry, but only pokemon below Gen V are searchable.\nHere is a ditto instead")
                    myAppContext.setSearchPokemon("ditto")
                } else myAppContext.setSearchPokemon(userInput)
            }
            console.log("OnKeyDown occurs")
            
        }
    }

    const handleRandomizer=()=>{
        const idNumber:number = Math.floor(Math.random() * 649);
        myAppContext.setSearchPokemon(idNumber)
    }

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
                <button onClick={handleRandomizer}>
                    <p>Randomizer</p>
                </button>
            </div>
        </div>
    )
}

export default Footer
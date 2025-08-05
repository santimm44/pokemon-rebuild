'use client'
import React, {  useState, KeyboardEvent } from 'react'
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

            if(isNaN(parsedValue) && userInput != ""){

                const tempResponse = await getPokemon(userInput)

                if(tempResponse.id >649){
                    myAppContext.setSearchPokemon("ditto")
                }
                else myAppContext.setSearchPokemon(userInput)

            }

            else if (!isNaN(parsedValue)){
                if (parsedValue > 649){
                    myAppContext.setSearchPokemon("ditto")
                } else myAppContext.setSearchPokemon(userInput)
            }
        }
    }

    const handleRandomizer=()=>{
        const idNumber:number = Math.floor(Math.random() * 649);
        myAppContext.setSearchPokemon(idNumber)
    }
    const handleClick = ()=>{
        if(!myAppContext.showFavorites) myAppContext.setShowFavorites(true)
          else myAppContext.setShowFavorites(false)
      }

    return (
        <div className='flex w-full'>
            <div id='favorites' className='bg-[#DFC5FE] w-1/3 rounded-4xl border-black border-2'>
                <button onClick={handleClick} className='flex w-full justify-around cursor-pointer'>
                    <p>Favorites</p>
                    <Shuffle />
                </button>
            </div>
            <div id='search-bar' className='bg-[#DFC5FE] flex align-baseline w-1/3 justify-between rounded-4xl border-black border-2'>
                <input onKeyDown={(event) => setSearchPokemonKeyDown(event)} onChange={(event) => handleInput(event.target.value)} className='h-full' placeholder='Enter pokemon' type='text' />
                <button onClick={setSearchPokemon} >
                    <Arrow />
                </button>
            </div>
            <div id='randomizer' className='bg-[#DFC5FE] w-1/3 rounded-4xl border-black border-2'>
                <button className='cursor-pointer w-full' onClick={handleRandomizer}>
                    <p>Randomizer</p>
                </button>
            </div>
        </div>
    )
}

export default Footer
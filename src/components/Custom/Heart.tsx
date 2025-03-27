'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import heart from '/public/heart-regular.svg'
import solidHeartImg from '/public/heart-solid.svg'
import { Button } from '../ui/button'
import { findPokemon, getLocalStorage, removeFromLocalStorage, saveToLocalStorageByName } from '@/lib/services'
import { useAppContext } from '@/context/context'


const Heart = () => {

  const myAppContext = useAppContext();

  const [heartSolidStatus, setHeartSolidStatus] = useState<boolean>()

  let solidHeart: boolean//instead of true use a turnery to see if it is in localstorage for favorites
  useEffect(() => {
    solidHeart=findPokemon(myAppContext.searchPokemon);
    if(solidHeart)setHeartSolidStatus(true)
      else setHeartSolidStatus(false)
  }, [myAppContext.searchPokemon])

  console.log()

  const handleOnClick = () => {
    if (solidHeart) {
      removeFromLocalStorage(myAppContext.searchPokemon)
      setHeartSolidStatus(false)
    }
    else {
      saveToLocalStorageByName(myAppContext.searchPokemon)
      setHeartSolidStatus(true)
    }
  }




  return (
    <Button variant="ghost" onClick={handleOnClick} className='hover:bg-transparent'>
      <Image className='h-[40px] w-auto' src={heartSolidStatus ? solidHeartImg : heart} alt={heartSolidStatus ? "Solid Heart Icon" : "Regular Heart Icon"} />
    </Button>
  )
}

export default Heart
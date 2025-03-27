'use client'
import React from 'react'
import Image from 'next/image'
import shuffle from '/public/shuffle-solid.svg'
import { Button } from '../ui/button'
const Shuffle = () => {
  return (
    <div className='hover:bg-transparent'>

      <Image className='h-[40px] w-auto' src={shuffle} alt="shufle" />
    </div>
  )
}

export default Shuffle
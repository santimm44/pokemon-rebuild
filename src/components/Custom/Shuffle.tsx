'use client'
import React from 'react'
import Image from 'next/image'
import shuffle from '/public/shuffle-solid.svg'
import { useAppContext } from '@/context/context'
const Shuffle = () => {

  return (
    <div className='cursor-pointer bg-[#DFC5FECC] rounded-xl hover:bg-red-500'>

      <Image className='h-[40px] w-auto'  src={shuffle} alt="shufle" />
    </div>
  )
}

export default Shuffle
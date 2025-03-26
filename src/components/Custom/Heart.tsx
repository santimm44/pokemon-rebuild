'use client'
import Image from 'next/image'
import React from 'react'
import heart from '/public/heart-regular.svg'
import { Button } from '../ui/button'


const Heart = () => {
  return (
    <Button variant="ghost" className='hover:bg-transparent'>
      <Image className='h-[40px] w-auto' src={heart} alt=''/>
    </Button>
  )
}

export default Heart
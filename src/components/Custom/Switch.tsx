'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import switcher from '/public/arrow-right-arrow-left-solid.svg'
import { Button } from '../ui/button'
import { getPokemon } from '@/lib/services'
import { useAppContext } from '@/context/context'

export const Switch = () => {
const switchContext = useAppContext

    const handleClick =()=>{
        // <switchContext className="set"></switchContext>
        
    }

    return (
        <Button onClick={handleClick} variant="ghost" className='hover:bg-transparent'>
            <Image className='h-[40px] w-auto ' src={switcher} alt='arrow right arrow left solid icon'>

            </Image>
        </Button>
    )
}

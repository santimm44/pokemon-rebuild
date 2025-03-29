'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import switcher from '/public/arrow-right-arrow-left-solid.svg'
import { Button } from '../ui/button'
import { useAppContext } from '@/context/context'

export const Switch = () => {
const { switchOn, setSwitchOn } = useAppContext()

    const handleClick =()=>{
        if(!switchOn) setSwitchOn(true)
            else setSwitchOn(false)  
        console.log(switchOn)
    }

    useEffect(()=>{
        console.log(switchOn)
    },[switchOn])

    return (
        <Button onClick={handleClick} variant="ghost" className='hover:bg-transparent'>
            <Image className='h-[40px] w-auto ' src={switcher} alt='arrow right arrow left solid icon'>

            </Image>
        </Button>
    )
}

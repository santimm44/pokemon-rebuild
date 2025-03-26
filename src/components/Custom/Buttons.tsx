'use client'
import React from 'react'
import { Button } from '../ui/button'

const Buttons = ({btnName}: {btnName: string}) => {
  return (
    <Button className='hover:border-[#FF6961] hover:bg-white hover:underline lg:row-start-1 lg:row-end-2 lg:col-start-5 lg:col-end-7 max-lg:col-start-8 max-lg:col-end-12 rounded-[4rem] border-2 mt-4 text-black border-black bg-white'>
        {btnName}
    </Button>
  )
}

export default Buttons
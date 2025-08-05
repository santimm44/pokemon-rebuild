import React from 'react'
import Heart from '@/components/Custom/Heart'
import MainTextContent from '@/components/Custom/MainTextContent'
import PokemonImage from '@/components/Custom/PokemonImage'
import { Switch } from '@/components/Custom/Switch'

const page = () => {

  return (
    <div className='grid grid-cols-12 grid-rows-12 '>
      <div className='col-start-1 col-end-6 row-start-1 row-end-13'>
        <div>
          <PokemonImage />
        </div>
        <div>
          <div className='flex justify-between'>
            <Switch/>
            <Heart />
          </div>
        </div>
      </div>

      <div className=' col-start-6 col-end-13 row-start-1 row-end-13 grid grid-cols-12 grid-rows-12 rounded-lg '>
        <div className='row-start-1 row-end-13 col-start-1 col-end-13'>
          <MainTextContent />
        </div>
      </div>
    </div>
  )
}

export default page
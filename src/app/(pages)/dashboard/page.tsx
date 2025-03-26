import Buttons from '@/components/Custom/Buttons'
import React from 'react'
import Heart from '@/components/Custom/Heart'
import Shuffle from '@/components/Custom/Shuffle'
import MainTextContent from '@/components/Custom/MainTextContent'
import PokemonImage from '@/components/Custom/PokemonImage'


const page = () => {
  const buttonNames: string[] = ["Location", "Abilities", "Moves", "Evolution"]

  return (
    <div className='grid grid-cols-12 grid-rows-12 '>

      <div className='col-start-1 col-end-6 row-start-1 row-end-13'>
        <div>
          <PokemonImage/>
        </div>
        <div>
          <div className='flex justify-between'>
            <Heart />
            <Shuffle />
          </div>
        </div>
      </div>


      <div className='col-start-6 col-end-13 row-start-1 row-end-13 grid grid-cols-12 grid-rows-12'>
        <div className='flex justify-around row-start-1 row-end-2 col-start-1 col-end-13'>
          {
            buttonNames.map((names, index) => {
              return (
                <div key={index}>
                  <Buttons btnName={names} />
                </div>
              )
            })
          }
        </div>
        <div className='bg-[#ffffffBE] col-start-1 col-end-13 row-start-2 row-end-13 grid grid-cols-12 grid-rows-12 lg:col-start-5 lg:col-end-12 lg:row-start-3 lg:row-end-12 max-lg:col-start-2 max-lg:col-end-12 max-lg:row-start-12 max-lg:row-end-6 rounded-lg '>
          <div className='row-start-1 row-end-13 col-start-1 col-end-13'>
            <MainTextContent />
          </div>
        </div>
      </div>


    </div>
  )
}

export default page
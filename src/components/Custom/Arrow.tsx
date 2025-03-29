import Image from 'next/image'
import React from 'react'
import arrowPicture from '/public/arrow-right-solid.svg'
const Arrow = () => {
    return (
        <div>
            <div className='hover:bg-transparent'>
                <Image className='h-[40px] w-auto' src={arrowPicture} alt="arrow" />
            </div>
        </div>
    )
}

export default Arrow
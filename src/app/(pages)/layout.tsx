import React from 'react'
import { Card } from '@/components/ui/card'
import Footer from '@/components/Custom/Footer'
const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='background-dots grid grid-rows-12 grid-cols-12 h-screen w-screen '>

            <Card className=' bg-[#DFC5FE]  border-black border-4 min-sm:col-start-2 rounded-[1rem] min-sm:col-end-12 min-sm:row-start-2 min-sm:row-end-10  max-sm:col-start-2 max-sm:col-end-12 max-sm:row-start-1 max-sm:mt-3 max-sm:row-end-12  grid grid-rows-12 grid-cols-12'>
                <div className='h-full p-[2rem_4rem] row-start-1 row-end-13 col-start-1 col-end-13'>
                    {children}
                </div>
            </Card>
            <div className='flex flex-col justify-around min-sm:col-start-2 min-sm:col-end-12 min-sm:row-start-10 min-sm:row-end-12 max-sm:col-start-2 max-sm:col-end-12 max-sm:row-start-1 max-sm:mt-3 max-sm:row-end-1'>
                <Footer/>
            </div>
        </div>
    )
}

export default layout
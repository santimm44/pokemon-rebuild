import React from 'react'
import { Card } from '@/components/ui/card'
const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='bg-[url(/background.jpeg)] grid grid-rows-12 grid-cols-12 h-screen w-screen overflow-clip'>
            
            <Card className=' bg-[#DFC5FECC]  border-black border-4 min-sm:col-start-2 rounded-[1rem] min-sm:col-end-12 min-sm:row-start-2 min-sm:row-end-10  max-sm:col-start-2 max-sm:col-end-12 max-sm:row-start-1 max-sm:mt-3 max-sm:row-end-12  grid grid-rows-12 grid-cols-12'>
                <div className='bg-red-300 h-full p-[2rem_4rem] overflow-clip row-start-1 row-end-13 col-start-1 col-end-13'>
                    {children}
                </div>
            </Card>
        </div>
    )
}

export default layout
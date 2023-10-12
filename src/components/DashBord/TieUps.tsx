import { Avatar } from '@mui/material'
import React from 'react'

const ArrayForTimePass = [
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
]

export default function TieUps() {
  return (
    <div className='w-full h-full overflow-auto p-2 mt-2'>
      {/*PITCH */}
      <p className='my-3 p-3 text-left text-lg font-bold'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <main className='w-full h-auto flex flex-row flex-wrap gap-y-7 gap-5 justify-center'>
        {ArrayForTimePass.map((item, index) => {
          return (
            <>
              <div className='flex flex-col xl:w-[45%] md:w-4/5 w-full rounded-lg shadow-md cursor-pointer' key={index}>
                <section className='flex md:flex-row flex-col'>
                  <div className='md:w-4/5 w-full p-1 border-r '>
                    <div className='flex flex-row p-4 border-b'>
                      <Avatar
                        alt="Remy Sharp"
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Xd1JPf1c116E6Y6-iCPZDcctVfJmtX6s2kPfcsoyJEsWsr7Y8_tzW7YU9YTF5A7R8a4H&s=10'
                        sx={{ width: 95, height: 95 }}
                        className="rounded-full border-4 border-white shadow-lg"
                      />
                      <span className='text-left w-full my-auto mx-4'>
                        <p className='text-lg font-bold'>{`Harsh Panchal's Pitch `}</p>
                        <p className='text-sm text-gray-500 font-bold mt-2'>{`Bio is going to be here `}</p>
                      </span>
                    </div>
                    <div className='p-2'>
                      <p className='text-lg text-left'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis, reiciendis.
                        <span className='text-blue-700 mx-2'>Leran More..</span>
                      </p>
                    </div>
                  </div>
                  <div className='md:w-1/5 w-full bg-slate-200 '>
                    <div className='flex md:flex-col flex-row gap-3'>
                      <div className='border-b flex-1 p-1'>
                        <p className='text-xl my-1'>$100M</p>
                        <p className='text-sm text-gray-600'>Valuation</p>
                      </div>
                      <div className='border-b flex-1 p-1'>
                        <p className='text-xl my-1'>$1M</p>
                        <p className='text-sm text-gray-600'>Seeking for</p>
                      </div>
                      <div className='border-b flex-1 p-1'>
                        <p className='text-xl my-1'>1.5%</p>
                        <p className='text-sm text-gray-600'>Equity</p>
                      </div>
                      <div className='border-b flex-1 p-1'>
                        <p className='text-xl my-1'>Seed</p>
                        <p className='text-sm text-gray-600'>Type</p>
                      </div>

                    </div>
                  </div>
                </section>
                <div className='w-full  hidden md:block'>
                <p className='text-sm text-gray-500 font-bold mt-2 text-left'>
                 Publish On {`12/10/2032`}
                </p>
                </div>
              </div>
            </>
          )
        })
        }
      </main>
    </div>
  )
}



//  Side Bar for Tie-Ups

/**
 *  1. Interested 
 *  2. Activity 
 *  3. Request 
 *  4.    
 * 
 * 
 * 
 * 
 * Totla Feature : List of Pitches , interested , 
 */

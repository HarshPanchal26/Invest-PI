import React, { useEffect, useState } from 'react'
import { Avatar, Button } from '@mui/material'

const peopleObj = [
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
]



export default function SuggestedPeople() {
    
    const [size , setSize] = useState<Number | null>(null);

    const sizeForDevice = ()=>{
        const isMobile = window.innerWidth <= 600;
        if(isMobile) {
            setSize(60);
        }else{
            setSize(140);
        }
    }

    useEffect(()=>{
        sizeForDevice();   
    } , [])

    window.addEventListener("resize", ()=>{
        // alert("resize is done")
        sizeForDevice();
    });

    return (
        <div className='w-full my-4'>
            <div className='flex flex-row flex-wrap w-full gap-2 justify-center'>
                {peopleObj.map((item, index) => {
                    return (
                        <div className='w-auto h-auto border bg-slate-100 rounded-lg' key={index}>
                            {size===140 &&  
                            <Avatar
                                alt="Remy Sharp"
                                src={'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcREiyKK9yDiO8n4AJ2ddzgaUGtfJscwIJNK9AWWIK2zDz4YwkQUCtouFFAGv9cS6B8b-qLF1rMBCK0IrfXSKZeFJLD4DTg9xNU4eAn3MHON'}
                                sx={{ width: 140 , height: 140}}
                                className="rounded-full border-4 border-white shadow-lg my-4 mx-10"
                            />
                            }
                            {size === 60 &&  <Avatar
                                alt="Remy Sharp"
                                src={'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcREiyKK9yDiO8n4AJ2ddzgaUGtfJscwIJNK9AWWIK2zDz4YwkQUCtouFFAGv9cS6B8b-qLF1rMBCK0IrfXSKZeFJLD4DTg9xNU4eAn3MHON'}
                                sx={{ width: 60 , height: 60}}
                                className="rounded-full border-4 border-white shadow-lg my-4 mx-10"
                            />}
                            <div>
                                <p className='text-lg font-sans font-bold text-center my-2'>Rahul Gandhi</p>
                                <p className='text-sm font-sans text-center text-gray-600'>@RahulGandhi</p>
                            </div>
                            <div className='my-5 flex justify-center'>
                                <Button variant='outlined' color='primary' className='mx-10 '>Follow</Button>
                                {/* <p className='text-sm font-serif text-center'>{'I am a good boy '}</p> */}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

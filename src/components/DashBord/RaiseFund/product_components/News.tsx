import React from 'react'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


const ObjForNews = [
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
]
export default function News() {
    return (
        <div className='h-full overflow-auto w-full mt-5'>
            <div className='flex flex-row justify-between'>
                <p className='text-2xl font-bold text-left mx-3 my-2 border-b'>
                    Published News</p>
                <IconButton
                    aria-label="upload picture"
                    component="span"
                    className="h-12 w-12 my-2 cursor-pointer bg-black mx-10"
                    style={{ color: 'black' }}
                // onClick={() => navigate(-1)}
                >
                    <EditIcon />
                </IconButton>
            </div>
            <main className='w-full h-auto'>
                {ObjForNews.map((item, index) => {
                    return (
                        <div className='w-full text-left p-1 border-b cursor-pointer'>
                            <p><span className='mx-3'><NewspaperIcon /></span>News</p>
                            <p className='font-bold mx-10 mt-3'>
                                <span className='mx-2'><FiberManualRecordIcon style={{ width: '15px', height: '15px' }} /></span>Lorem ipsum dolor sit amet consectetur adipisicing.
                            </p>
                            <p className='text-left mx-10'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, repudiandae?..............
                                <span className='text-blue-700'>Read More</span>
                            </p>
                        </div>
                    )
                })}
            </main>
        </div>
    )
}

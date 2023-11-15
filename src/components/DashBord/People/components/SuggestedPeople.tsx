import React, { useEffect, useState } from 'react'
import { Avatar, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
type Props = {
    userData: any
}

export default function SuggestedPeople({ userData }: Props) {

    const [size, setSize] = useState<Number | null>(null);
    const navigate = useNavigate()
    const sizeForDevice = () => {
        const isMobile = window.innerWidth <= 600;
        if (isMobile) {
            setSize(60);
        } else {
            setSize(140);
        }
    }

    const handleFollowButton = (id : string)=>{ 
        const btnElm = document.getElementById(id) as HTMLElement;
        btnElm.innerHTML = 'Following'
    }

    useEffect(() => {
        console.log("Data", userData)
        sizeForDevice();
    }, [])

    window.addEventListener("resize", () => {
        // alert("resize is done")
        sizeForDevice();
    });

    return (
        <div className='w-full my-4'>
            <div className='flex flex-row flex-wrap w-full gap-2 justify-center'>
                {userData.map((item: any, index: number) => {
                    return (
                        <div className='w-auto h-auto border bg-slate-100 rounded-lg' key={index}>
                            {size === 140 &&
                                <Avatar
                                    alt="Remy Sharp"
                                    src={item.profileImage}
                                    sx={{ width: 140, height: 140 }}
                                    className="rounded-full border-4 border-white shadow-lg my-4 mx-10 cursor-pointer"
                                    onClick={()=>navigate(`/profile/${item.username}/`)}
                                />
                            }
                            {size === 60 && <Avatar
                                alt="Remy Sharp"
                                src={item.profileImage}
                                sx={{ width: 60, height: 60 }}
                                className="rounded-full border-4 border-white shadow-lg my-4 mx-10 cursor-pointer"
                                onClick={()=>navigate(`/profile/${item.username}/`)}
                            />}
                            <div>
                                <p className='text-lg font-sans font-bold text-center my-2 cursor-pointer' onClick={()=>navigate(`/profile/${item.username}/`)}>{item.name}</p>
                                <p className='text-sm font-sans text-center text-gray-600 cursor-pointer' onClick={()=>navigate(`/profile/${item.username}/`)}>@{item.username}</p>
                            </div>
                            <div className='my-5 flex justify-center'>
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    className='mx-10'
                                    id={item._id}
                                    onClick={() => handleFollowButton(item._id)}
                                >
                                    Follow</Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

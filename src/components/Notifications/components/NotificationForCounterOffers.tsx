import React, { useEffect, useState, useContext } from 'react'
import { Avatar } from '@mui/material'
import { CommanUserDataStotage, GenerateObjForCommanUserData } from '../../../utils/factory/ObjForUser'
import axios from '../../../../axios.config'
import Loading from '../../../Assets/Loading'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { ContextForDashBord } from '../../../context/contextForDashBord'
import { useNavigate } from 'react-router-dom'

type Props = {
    objForNotification: any
    usedFor: 'Notification' | 'Normal_Component'
}

type TypeOfCommanData = {
    _id: string,
    name: string,
    username: string,
    profileImage: string,
    type: string
}

type TypeForCounterObj = {
    _id: string,
    type: string,
    pitchId: string,
    offerFor: string,
    offerBy: string,
    offereAmount: string,
    offeredEquity: string,
    accepted: boolean,
    rejected: boolean,
    createdAt: string
}

export default function NotificationForCounterOffers({ objForNotification, usedFor }: Props) {

    const [ObjForOfferMaker, setObjForOfferMaker] = useState<TypeOfCommanData | null>(null);
    const [Visible , setVisible] = useState<'hidden' | 'block'>('block')
    const contextForDashBord = useContext(ContextForDashBord);
    const navigate = useNavigate()

    const fetchUser = async (id: String) => {
        let findLocal: any = [];
        if (CommanUserDataStotage.length > 0) {
            findLocal = CommanUserDataStotage.filter((item: any) => item._id === id);
        }
        if (findLocal[0]) {
            let userData = GenerateObjForCommanUserData(findLocal[0]);
            setObjForOfferMaker(userData);
        } else {
            try {
                if (id) {
                    const array = await axios.get(`${import.meta.env.VITE_APP_API_URL}profile/filter/?find=${id}`);
                    console.log("array", array.data)
                    let userData = GenerateObjForCommanUserData(array.data);
                    setObjForOfferMaker(userData);
                } else {
                    alert('Check Id ' + id)
                }
            } catch (error: any) {
                console.log("error", error);
            }
        }
    }

    const handleAcceptCounter = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}pitches/counter/action/accept`, objForNotification);
            console.log("Result of action ", res)
            let elm = document.getElementById('notification') as HTMLElement;
            elm.classList.add('hidden')
        } catch (error) {
            console.log("error", error)
        }
    }

    const handleDeclineOfCounter = async() => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}pitches/counter/action/decline`, objForNotification);
            console.log("Result of action ", res)
            let elm = document.getElementById('notification') as HTMLElement;
            elm.classList.add('hidden')
        } catch (error) {
            console.log("error", error)
        }

    }

    useEffect(() => {
        console.log("Check User", objForNotification)
        fetchUser(objForNotification.offerBy)
    }, [objForNotification])

    return (
        <div className='px-4 py-2 cursor-pointer text-left border-b w-full'
            onClick={() => navigate('/tieups/requests')}
            id='notification'
        >
            {(!ObjForOfferMaker) && (
                <Loading />
            )}
            {ObjForOfferMaker && usedFor === 'Notification' && (
                <div className='flex flex-col h-auto'>
                    <div className='flex flex-row gap-3 justify-between'>
                        <div className='p-1'>
                            <Avatar
                                alt="Remy Sharp"
                                src={ObjForOfferMaker.profileImage}
                                sx={{ width: 60, height: 60 }}
                                className="rounded-full border-4 border-white shadow-lg"
                            />
                        </div>
                        <div className='p-2'>
                            <p className='text-base text-left' >
                                <span className='font-extrabold underline' onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/profile/${ObjForOfferMaker.username}/`);
                                }}>{ObjForOfferMaker.name}</span> wants to counter your offer by
                            </p>
                            <div className='w-fit flex flex-row gap-14 bg-gray-200 p-3 rounded-lg mt-4'>
                                <div className='border text-blue-700'>
                                    <p className='text-xl font-bold'>${objForNotification.offereAmount}M</p>
                                </div>
                                <div className='border '>
                                    <p className='text-xl font-bold'>For</p>
                                </div>
                                <div className='border text-blue-700'>
                                    <p className='text-xl font-bold'>{objForNotification.offeredEquity}%</p>
                                </div>
                            </div>
                        </div>
                        <div className='p-1'>
                            <Avatar
                                alt="Remy Sharp"
                                src={contextForDashBord.USER.PROFILEIMAGE}
                                sx={{ width: 60, height: 60 }}
                                className="rounded-full border-4 border-white shadow-lg"
                            />
                        </div>
                    </div>
                    <div className='mt-2 flex flex-row justify-between'>
                        {/* <div className=' p-2'>
                            <p className='text-sm text-gray-700 mb-2'>Investors</p>

                        </div> */}
                        {/* <div className='block my-5 mx-6'>
                            <Stack direction="row" spacing={1}>
                                <Chip icon={<CheckIcon />} label="Accept" variant='filled' color='primary' style={{
                                    padding: '20px'
                                }} />
                                <Chip icon={<ClearIcon />} label="Decline" variant="outlined" color='primary' style={{
                                    padding: '20px'
                                }} />
                            </Stack>
                        </div> */}
                        <div className='block my-5 mx-6'>
                            <Stack direction="row" spacing={1}>
                                <button type='button' onClick={(e) => {
                                    e.stopPropagation();
                                    handleAcceptCounter()
                                }}>
                                    <Chip
                                        icon={<CheckIcon />}
                                        label="Accept"
                                        variant='filled'
                                        color='primary'
                                        style={{
                                            padding: '20px'
                                        }}
                                    /></button>
                                <button type='button' onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeclineOfCounter()
                                }}>
                                    <Chip icon={<ClearIcon />} label="Decline" variant="outlined" color='primary' style={{
                                        padding: '20px'
                                    }} /></button>
                            </Stack>
                        </div>
                    </div>
                </div>
            )}
            {ObjForOfferMaker && usedFor === 'Normal_Component' && (
                <div className='flex flex-col h-auto w-1/2 '>
                    <div className='flex flex-row gap-3 justify-between '>
                        <div className='p-1'>
                            <Avatar
                                alt="Remy Sharp"
                                src={ObjForOfferMaker.profileImage}
                                sx={{ width: 100, height: 100 }}
                                className="rounded-full border-4 border-white shadow-lg"
                            />
                        </div>
                        <div className='p-2'>
                            <p className='text-base text-left' >
                                <span className='font-extrabold underline' onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/profile/${ObjForOfferMaker.username}/`);
                                }}>{ObjForOfferMaker.name}</span> wants to counter your offer by
                            </p>
                            <div className='w-fit flex flex-row gap-14 bg-gray-200 p-3 rounded-lg mt-4 mx-auto'>
                                <div className='border text-blue-700'>
                                    <p className='text-xl font-bold'>${objForNotification.offereAmount}M</p>
                                </div>
                                <div className='border '>
                                    <p className='text-xl font-bold'>For</p>
                                </div>
                                <div className='border text-blue-700'>
                                    <p className='text-xl font-bold'>{objForNotification.offeredEquity}%</p>
                                </div>
                            </div>
                        </div>
                        <div className='p-1'>
                            <Avatar
                                alt="Remy Sharp"
                                src={contextForDashBord.USER.PROFILEIMAGE}
                                sx={{ width: 100, height: 100 }}
                                className="rounded-full border-4 border-white shadow-lg"
                            />
                        </div>
                    </div>
                    <div className='mt-2 flex flex-row justify-between'>
                        {/* <div className=' p-2'>
                            <p className='text-sm text-gray-700 mb-2'>Investors</p>

                        </div> */}
                        <div className='block my-5 mx-6'>
                            <Stack direction="row" spacing={1}>
                                <button type='button' onClick={(e) => {
                                    e.stopPropagation();
                                    handleAcceptCounter()
                                }}>
                                    <Chip
                                        icon={<CheckIcon />}
                                        label="Accept"
                                        variant='filled'
                                        color='primary'
                                        style={{
                                            padding: '20px'
                                        }}
                                    /></button>
                                <button type='button' onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeclineOfCounter()
                                }}>
                                    <Chip icon={<ClearIcon />} label="Decline" variant="outlined" color='primary' style={{
                                        padding: '20px'
                                    }} /></button>
                            </Stack>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { NotificationContext } from '../../../../context/NotificationContext'
import NotificationForClaimedInvestor from '../../../Notifications/components/NotificationForClaimedInvestor';
import { Avatar } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AvatarGroup from '@mui/material/AvatarGroup';


export default function MyInvestments() {
    const notificationContext = useContext(NotificationContext);
    const [StateForNewNotification, setStateForNewNotification] = useState<[] | null>(null);

    useEffect(() => {
        let arrayForNewNotifications: any = notificationContext?.NotificationState.notificationForClaims;
        setStateForNewNotification(arrayForNewNotifications);
    }, [notificationContext])


    return (
        <>
            <div className='p-1 my-4'>
                <p className='text-xl font-bold text-left my-3 mx-5 border-b'>My Investments</p>
                <main className='w-full h-auto flex flex-row flex-wrap gap-y-7 gap-5 justify-center'>
                    <div className='flex flex-col xl:w-[45%] md:w-4/5 w-full rounded-lg shadow-md cursor-pointer p-1'>
                        <div className='w-full hidden md:block'>
                            <p className='text-sm text-gray-500 font-bold mt-2 text-left'>
                                On {`12/10/2032`}
                            </p>
                        </div>
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
                                    <p className='text-xl text-left font-bold'>
                                        Investors
                                    </p>
                                    <div className='my-2 border'>
                                        <AvatarGroup max={4}>
                                            <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                                            <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                                            <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                                            <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                                            <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                                            <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                                        </AvatarGroup>

                                    </div>

                                </div>
                            </div>
                            <div className='md:w-1/5 w-full bg-slate-200 '>
                                <div className='flex md:flex-col flex-row gap-3'>
                                    <div className='border-b flex-1 p-1'>
                                        <p className='text-xl my-1'>$10M</p>
                                        <p className='text-sm text-gray-600'>Investmenst</p>
                                    </div>
                                    <div className='border-b flex-1 p-1'>
                                        <p className='text-xl my-1'>5</p>
                                        <p className='text-sm text-gray-600'>Total Investors</p>
                                    </div>
                                    <div className='border-b flex-1 p-1'>
                                        <p className='text-xl my-1'>Seed</p>
                                        <p className='text-sm text-gray-600'>Type</p>
                                    </div>
                                    <div className='border-b flex-1  bg-red-700 p-5'>
                                        <BlockIcon />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className='flex flex-col xl:w-[45%] md:w-4/5 w-full rounded-lg shadow-md cursor-pointer p-1'>
                        <div className='w-full hidden md:block'>
                            <p className='text-sm text-gray-500 font-bold mt-2 text-left'>
                                On {`12/10/2032`}
                            </p>
                        </div>
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
                                        <p className='text-xl my-1'>$10M</p>
                                        <p className='text-sm text-gray-600'>Investmenst</p>
                                    </div>
                                    <div className='border-b flex-1 p-1'>
                                        <p className='text-xl my-1'>5</p>
                                        <p className='text-sm text-gray-600'>Total Investors</p>
                                    </div>
                                    <div className='border-b flex-1 p-1'>
                                        <p className='text-xl my-1'>Seed</p>
                                        <p className='text-sm text-gray-600'>Type</p>
                                    </div>
                                    <div className='border-b flex-1  bg-green-700 p-5'>
                                        <AddTaskIcon />
                                    </div>

                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
            <div className='my-4'>
                <main className='w-full h-auto'>
                    {/* Area for new claims of Investments */}
                    {StateForNewNotification && StateForNewNotification.length > 0 && (
                        <div className='p-2'>
                            <p className='font-bold text-left my-3 text-2xl'>New Offers</p>
                            <div className='p-4'>
                                {StateForNewNotification.map((item) => {
                                    return (
                                        <NotificationForClaimedInvestor objForNotification={item} />
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    )
}

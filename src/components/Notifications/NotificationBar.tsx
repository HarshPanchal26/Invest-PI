import React, { useEffect, useContext, useState } from 'react'
import { Avatar } from '@mui/material';
import { NotificationContext } from '../../context/NotificationContext';
import Loading from '../../Assets/Loading';
import NotificationForClaimedInvestor from './components/NotificationForClaimedInvestor';
import { useNavigate } from 'react-router-dom';
import NotificationForCounterOffers from './components/NotificationForCounterOffers';
import NotificationForOfferResults from './components/NotificationForOfferResults';

export interface INotificationDatatForState {
    notificationForPosts: [] | null,
    notificationForInvestments: [] | null,
    notificationForClaims: [] | null,
    notificationForInterest: [] | null,
    notificationForFollow: [] | null,
    notificationForCounter: [] | null,
    notificationForResultOfOffers: [] | null,
}
export default function NotificationBar() {

    const notificationContext = useContext(NotificationContext)
    const navigate = useNavigate();
    const [stateForNotificationData, setStateForNotificationData] = useState<INotificationDatatForState | null>(null);

    useEffect(() => {
        const data = notificationContext?.NotificationState
        if (data) {
            let newObj: INotificationDatatForState = {
                notificationForPosts: data.notificationForNewPosts,
                notificationForInvestments: data.notificationForNewInvestments,
                notificationForClaims: data.notificationForClaims,
                notificationForInterest: data.notificationForNewInterest,
                notificationForFollow: data.notificationForFollow,
                notificationForCounter: data.notificationForCounter,
                notificationForResultOfOffers: data.notificationForResultOfOffers
            }
            setStateForNotificationData(newObj)
        }
    }, [notificationContext?.NotificationState])

    return (
        <>
            {stateForNotificationData && (
                <div>
                    {/* Notification For Posts */}
                    {stateForNotificationData.notificationForPosts && stateForNotificationData.notificationForPosts.map((item, index) => {
                        return (
                            <div
                                className='bg-green-400 flex flex-row px-4 py-2 text-sm text-gray-700 cursor-pointer text-left border-b items-center'
                            // onClick={() => handleClickForAccount(item.value)}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src={''}
                                    sx={{ width: 60, height: 60 }}
                                    className="rounded-full border-4 border-white shadow-lg"
                                />
                                <div className='text-lg w-full p-2'>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ipsa!
                                </div>
                            </div>)
                    })}
                    {stateForNotificationData.notificationForInvestments && stateForNotificationData.notificationForInvestments.map((item, index) => {
                        return (
                            <div
                                className='bg-green-400 flex flex-row px-4 py-2 text-sm text-gray-700 cursor-pointer text-left border-b items-center'

                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src={''}
                                    sx={{ width: 60, height: 60 }}
                                    className="rounded-full border-4 border-white shadow-lg"
                                />
                                <div className='text-lg w-full p-2'>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ipsa!
                                </div>
                            </div>)
                    })}
                    {stateForNotificationData.notificationForResultOfOffers && stateForNotificationData.notificationForResultOfOffers.map((item, index) => {
                        return (
                            <NotificationForOfferResults objForNotification={item} />
                        )
                    })}
                    {stateForNotificationData.notificationForCounter && stateForNotificationData.notificationForCounter.map((item, index) => {
                        console.log("New Notification is", item)
                        return (
                            <NotificationForCounterOffers objForNotification={item} usedFor='Notification' />
                        )
                    })}
                    {stateForNotificationData.notificationForClaims && stateForNotificationData.notificationForClaims.map((item, index) => {
                        return (
                            <NotificationForClaimedInvestor objForNotification={item} />)
                    })}
                    {stateForNotificationData.notificationForClaims === null && (
                        <div>
                            {'Loading......'}
                        </div>
                    )}
                    {stateForNotificationData.notificationForInterest && stateForNotificationData.notificationForInterest.map((item, index) => {
                        return (
                            <div
                                className='bg-green-400 flex flex-row px-4 py-2 text-sm text-gray-700 cursor-pointer text-left border-b items-center'
                            // onClick={() => handleClickForAccount(item.value)}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src={''}
                                    sx={{ width: 60, height: 60 }}
                                    className="rounded-full border-4 border-white shadow-lg"
                                />
                                <div className='text-lg w-full p-2'>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ipsa!
                                </div>
                            </div>)
                    })}
                    {notificationContext && notificationContext.TotalNewNotification === 0 && (
                        <ul>
                            <li>'Invetsi PI Does not have any update for you right now , As soon we get something for you will let you know. </li>
                        </ul>
                    )}
                </div>
            )}
            {!stateForNotificationData && <Loading />}

        </>
    )
}


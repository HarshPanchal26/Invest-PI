import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { NotificationContext } from '../../../../context/NotificationContext'
import NotificationForClaimedInvestor from '../../../Notifications/components/NotificationForClaimedInvestor';
import NotificationForCounterOffers from '../../../Notifications/components/NotificationForCounterOffers';
import NoData from '../../../../Assets/NoData';

export default function InvestmentsRequests() {

    const notificationContext = useContext(NotificationContext);
    const [StateForNewNotification, setStateForNewNotification] = useState<[] | null>(null);
    const [StateForCounterNotification, setStateForCounterNotification] = useState<[] | null>(null);

    useEffect(() => {
        let arrayForNewNotifications: any = notificationContext?.NotificationState.notificationForClaims;
        setStateForNewNotification(arrayForNewNotifications);
        let arrayForCounterNotification: any = notificationContext?.NotificationState.notificationForCounter;
        setStateForCounterNotification(arrayForCounterNotification)
    }, [notificationContext])

    return (
        <main className='w-full h-auto'>
            {/* Area for new claims of Investments */}
            {StateForNewNotification && StateForNewNotification.length > 0 && (
                <div className='p-2'>
                    <p className='font-bold text-left my-3 text-2xl'>New Offers</p>
                    {StateForNewNotification.map((item, index) => {
                        return (
                            <NotificationForClaimedInvestor objForNotification={item} index={index} />
                        )
                    })}
                </div>
            )}
            {
                StateForCounterNotification && StateForCounterNotification.length > 0 && (
                    <div className='p-2'>
                        <p className='font-bold text-left my-3 text-2xl'>New Offers</p>
                        {StateForCounterNotification.map((item) => {
                            return (
                                <NotificationForCounterOffers objForNotification={item} usedFor='Normal_Component' />
                            )
                        })}
                    </div>
                )}

            {
                StateForCounterNotification && StateForCounterNotification.length === 0 && (
                    <NoData/>
                )
            }
        </main>
    )
}


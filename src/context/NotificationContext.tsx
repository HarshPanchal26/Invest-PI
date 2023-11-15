import React, { useEffect, useState, useContext, SetStateAction } from 'react';
import axios from '../../axios.config';
import { createContext } from 'react'
import { ContextForDashBord } from './contextForDashBord';

export interface INotificationContextState {
    notificationForNewPosts: [] | null,
    notificationForNewInvestments: [] | null,
    notificationForClaims: [] | null,
    notificationForNewInterest: [] | null,
    notificationForFollow: [] | null,
    notificationForCounter: [] | null,
    notificationForResultOfOffers: [] | null,
    notificationForClaimResult: [] | null,
}

export const defaultNotificationState: INotificationContextState = {
    notificationForNewPosts: null,
    notificationForNewInvestments: null,
    notificationForClaims: null,
    notificationForNewInterest: null,
    notificationForFollow: null,
    notificationForCounter: null,
    notificationForResultOfOffers: null,
    notificationForClaimResult: null,
}

export type INotificationConetxtAction
    = 'NEW_POST'
    | 'NEW_INVESTMENTS'
    | 'NEW_CLAIMS'
    | 'NEW_INTERESTS'
    | 'NEW_FOLLOWERS'
    | 'NEW_COUNTEROFFER'
    | 'ACCEPTED_OFFERS'
    | 'RESULTS_FOR_OFFERS'
    | 'RESULTS_FOR_CLAIMS';

export type INotificationConetxtPayLoad = ''

export interface ISocketContextActions {
    type: INotificationConetxtAction;
    payload: INotificationConetxtPayLoad;
}



export interface INotificationProps {
    NotificationState: INotificationContextState,
    NotificationReducer: Function,
    TotalNewNotification: number
    // setNotificationState: React.Dispatch<SetStateAction<INotificationContextState>>
}

export const NotificationContext = createContext<INotificationProps | null>(null)

export function NotificationContextProvier(props: any) {

    const { children } = props;
    const contextForDashBord = useContext(ContextForDashBord)

    const [StateForNewPostNotification, setStateForNewPostNotification] = useState<[]>([]);
    const [StateForNewInvestmentsNotification, setStateForNewInvestmentsNotification] = useState<[]>([]);
    const [StateForNewClamimsNotification, setStateForNewClamimsNotification] = useState<[]>([]);
    const [StateForNewInterestNotification, setStateForNewInterestNotification] = useState<[]>([]);
    const [StateForNewFollowersNotification, setStateForNewFollowersNotification] = useState<[]>([]);
    const [StateForNewCounterOfferNotification, setStateForNewCounterOfferNotification] = useState<[]>([]);
    const [StateForResultofOffers, setStateForResultofOffers] = useState<[]>([]);
    const [StateForResulofClaims, setStateForResulofClaims] = useState<[]>([]);
    const [TotalNewNotification, setTotalNewNotification] = useState<number>(0);

    async function fetchDataForNoification() {
        // if (NotificationState.notificationForNewInvestments && NotificationState.notificationForNewInvestments.length === 0) {
        //     await NotificationReducer({ type: 'NEW_INVESTMENTS', payload: '' })
        // }
        if (NotificationState.notificationForClaims && NotificationState.notificationForClaims.length === 0) {
            await NotificationReducer({ type: 'NEW_CLAIMS', payload: '' })
        }
        if (contextForDashBord.USER.TYPE === 'product' && NotificationState.notificationForCounter && NotificationState.notificationForCounter.length === 0) {
            await NotificationReducer({ type: 'NEW_COUNTEROFFER', payload: '' })
        }
        if (contextForDashBord.USER.TYPE !== 'product' && NotificationState.notificationForResultOfOffers && NotificationState.notificationForResultOfOffers.length === 0) {
            await NotificationReducer({ type: 'RESULTS_FOR_OFFERS', payload: '' })
        }
    }

    const fetchNewNotifiocationForNewPosts = async (state: [], payload: {}): Promise<any[]> => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}n/fetch/newPosts`, payload);
            return [...res.data.newData];
        } catch (error) {
            console.log("error", error);
        }
        return state;
    }

    const fetchNewNotifiocationForInterests = async (state: any[], payload: {}): Promise<any[]> => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}n/fetch/newInterests`, payload);
            return [...res.data.newData];
        } catch (error) {
            console.log("error", error);
        }
        return state;
    }

    const fetchNewNotifiocationForNewClaims = async (state: [], payload: {}): Promise<any[]> => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}n/fetch/newclaims`, payload);
            return [...res.data.newData];
        } catch (error) {
            console.log("error", error);
        }
        return state;
    }

    const fetchNewNotifiocationForNewInvestments = async (state: [], payload: {}): Promise<any[]> => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}n/fetch/newinvestments`, payload);
            return res.data.newData;
        } catch (error) {
            console.log("New Investments Error", error);
        }
        return state
    }

    const fetchNewNotifiocationForNewCounterOffers = async (state: [], payload: {}): Promise<any[]> => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}n/fetch/counter/new`, payload);
            return res.data.newData;
        } catch (error) {
            console.log("New Investments Error", error);
        }
        return state
    }
    const fechResultsForMadeOffers = async (state: [], payload: {}): Promise<any[]> => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}n/fetch/counter/results`, payload);
            return res.data.newData;
        } catch (error) {
            console.log("New Investments Error", error);
        }
        return state
    }

    const fetchResultForClaimInvetstor = async (state: [], payload: {}): Promise<any[]> => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}n/fetch/claim/results`, payload);
            console.log("New Result Of Counter Offers", res)
            return res.data.newData;
        } catch (error) {
            console.log("New Investments Error", error);
        }
        return state
    }

    const NotificationReducer = async (action: ISocketContextActions) => {
        switch (action.type) {
            case 'NEW_CLAIMS':
                {
                    let newState: any = await fetchNewNotifiocationForNewClaims(StateForNewClamimsNotification, { id: action.payload });
                    console.log("newState for Claim", newState)
                    setStateForNewClamimsNotification(newState)
                    return;
                }
            case 'NEW_INTERESTS':
                {
                    let newState: any = await fetchNewNotifiocationForInterests(StateForNewInterestNotification, { id: action.payload })
                    let newArray: any = [...newState, ...StateForNewInterestNotification]
                    setStateForNewInterestNotification(newArray)
                    return;
                }
            case 'NEW_POST':
                {
                    let newState: any = await fetchNewNotifiocationForNewPosts(StateForNewPostNotification, { id: action.payload })
                    setStateForNewPostNotification(newState)
                    return;
                }
            case 'NEW_INVESTMENTS':
                {
                    let newState: any = await fetchNewNotifiocationForNewInvestments(StateForNewInvestmentsNotification, { id: action.payload })
                    setStateForNewInvestmentsNotification(newState)
                    return;
                }
            case 'NEW_FOLLOWERS':
                {
                    let newState: any = await fetchNewNotifiocationForNewInvestments(StateForNewFollowersNotification, { id: action.payload })
                    setStateForNewFollowersNotification(newState)
                    return;
                }
            case 'RESULTS_FOR_OFFERS':
                {
                    let newState: any = await fechResultsForMadeOffers(StateForResultofOffers, { id: action.payload })
                    let newArray: any = [...newState, ...StateForResultofOffers]
                    setStateForResultofOffers(newArray)
                    return;
                }
            case 'RESULTS_FOR_CLAIMS':
                {
                    let newState: any = await fetchResultForClaimInvetstor(StateForResulofClaims, { id: action.payload })
                    let newArray: any = [...newState, ...StateForResulofClaims]
                    setStateForResulofClaims(newArray)
                    return;
                }
            case 'NEW_COUNTEROFFER':
                {
                    let newState: any = await fetchNewNotifiocationForNewCounterOffers(StateForNewCounterOfferNotification, { id: action.payload })
                    let newArray: any = [...newState, ...StateForNewCounterOfferNotification]
                    setStateForNewCounterOfferNotification(newArray)
                    return;
                }
            default:
                return;
        }
    }
    useEffect(() => {
        setTimeout(() => {
            fetchDataForNoification();
        }, 2000)
    }, [])

    useEffect(() => {
        let totalNewNotification = StateForNewPostNotification?.length +
            StateForNewInvestmentsNotification.length +
            StateForNewClamimsNotification.length +
            StateForNewInterestNotification.length +
            StateForNewFollowersNotification.length +
            StateForNewCounterOfferNotification.length +
            StateForResultofOffers.length + 
            StateForResulofClaims.length

        if (totalNewNotification !== TotalNewNotification) {
            let total = totalNewNotification
            if (TotalNewNotification === 0) {
                setTotalNewNotification(total + TotalNewNotification)
            } else {
                setTotalNewNotification(total)
            }
        }
    }, [StateForNewPostNotification, StateForNewInvestmentsNotification, StateForNewClamimsNotification, StateForNewInterestNotification, StateForNewFollowersNotification, StateForNewCounterOfferNotification])

    const NotificationState: INotificationContextState = {
        notificationForNewPosts: StateForNewPostNotification,
        notificationForNewInvestments: StateForNewInvestmentsNotification,
        notificationForClaims: StateForNewClamimsNotification,
        notificationForNewInterest: StateForNewInterestNotification,
        notificationForFollow: StateForNewFollowersNotification,
        notificationForCounter: StateForNewCounterOfferNotification,
        notificationForResultOfOffers: StateForResultofOffers,
        notificationForClaimResult : StateForResulofClaims
    }

    return (
        <NotificationContext.Provider value={{ NotificationState, NotificationReducer, TotalNewNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}
import React, { PropsWithChildren, useEffect, useReducer, useState, useContext } from 'react';
import { useSocket } from '../hooks/useSocket';
import { defaultSocketContextState, SocketContextProvider, SocketReducer } from './SocketContext';
import { NotificationContext } from './NotificationContext'



export interface INotificationContextState {
    notificationForNewPosts: [],
    notificationForNewInvestments: [],
    notificationForClaims: [],
    notificationForNewInterest: [],
    notificationForFollow: [],
}


export interface ISocketContextComponentProps extends PropsWithChildren { }
const SocketContextComponent: React.FunctionComponent<ISocketContextComponentProps> = (props) => {
    const { children } = props;

    const notificationContext = useContext(NotificationContext);

    const socket = useSocket('http://localhost:5000', {
        transports: ['websocket'],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: false
    });

    const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);

    useEffect(() => {
        socket.connect()
        SocketDispatch({ type: 'update_socket', payload: socket });
        socket.on('connect', () => {
            socket.emit('send-message', `Hello Harsh Panchla This side with ${socket.id}`, (message: string) => {
                console.log("Message from Server", message);
            })
            socket.on('as-investors', (message) => {
                notificationContext?.NotificationReducer({ type: 'NEW_INTERESTS', payload: message })
            })
            socket.on('new-investments', (message) => {
                notificationContext?.NotificationReducer({ type: 'NEW_INVESTMENTS', payload: message })
            })
            socket.on('claim-investor', (message) => {
                notificationContext?.NotificationReducer({ type: 'NEW_CLAIMS', payload: message })
            })
            socket.on('new-counterOffer', (message) => {
                notificationContext?.NotificationReducer({ type: 'NEW_COUNTEROFFER', payload: message })
            })
            socket.on('action-on-counterOffer', (message) => {    
                notificationContext?.NotificationReducer({ type: 'RESULTS_FOR_OFFERS', payload: {docID : message}})
            }) 
        })


    }, []);

    // const StartListeners = () => {
    //     /** Messages */
    //     socket.on('user_connected', (users: string[]) => {
    //         console.log('User connected message received');
    //         SocketDispatch({ type: 'update_users', payload: users });
    //     });

    //     /** Messages */
    //     socket.on('user_disconnected', (uid: string) => {
    //         console.info('User disconnected message received');
    //         SocketDispatch({ type: 'remove_user', payload: uid });
    //     });

    //     /** Connection / reconnection listeners */
    //     socket.io.on('reconnect', (attempt) => {
    //         console.info('Reconnected on attempt: ' + attempt);
    //         SendHandshake();
    //     });

    //     socket.io.on('reconnect_attempt', (attempt) => {
    //         console.info('Reconnection Attempt: ' + attempt);
    //     });

    //     socket.io.on('reconnect_error', (error) => {
    //         console.info('Reconnection error: ' + error);
    //     });

    //     socket.io.on('reconnect_failed', () => {
    //         console.info('Reconnection failure.');
    //         alert('We are unable to connect you to the chat service.  Please make sure your internet connection is stable or try again later.');
    //     });
    // };

    // const SendHandshake = async () => {
    //     console.info('Sending handshake to server ...');

    //     socket.emit('handshake', async (uid: string, users: string[]) => {
    //         console.info('User handshake callback message received');
    //         SocketDispatch({ type: 'update_users', payload: users });
    //         SocketDispatch({ type: 'update_uid', payload: uid });
    //     })

    //     setLoading(false);
    // };

    // if (loading) return <p>... loading Socket IO ....</p>;

    return (
        <SocketContextProvider value={{ SocketState, SocketDispatch }}>
            {children}
        </SocketContextProvider>
    )
};

export default SocketContextComponent;
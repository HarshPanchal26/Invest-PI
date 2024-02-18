import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DashBordPages, IntroPages, ProfilePages, TieUpsPage } from './PageList';
import { Suspense } from 'react';
import NavbarForDashBord from '../DashBord/Component_DashBord/NavbarForDashBord';
import { ContextProviderForDashBord } from '../../context/contextForDashBord';
import { NotificationContextProvier } from '../../context/NotificationContext';
import SidePannelForTieUps from '../DashBord/TieUps/components/SidePanleForTieUps';
import SocketContextComponent from '../../context/ScoketHandlerComponent'
import { Alert } from '@mui/material';
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const RoutingForIntroPages = [
    ...IntroPages
]

const RoutingForDashBordPages = [
    ...DashBordPages
]

const RoutingForProfilePage = [
    ...ProfilePages
]

const RoutingForTieUps = [
    ...TieUpsPage
]

export default function IndexForRoute() {

    const queryClient = new QueryClient();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
                <Router basename="/">
                    <Routes>
                        {RoutingForIntroPages.map((page) => {
                            return (
                                <Route
                                    path={page.path}
                                    element={
                                        // <ContextProviderForDashBord>
                                        <Suspense fallback={<div>Loading......</div>}>
                                            {page.component}
                                        </Suspense>
                                        // </ContextProviderForDashBord>
                                    }
                                />
                            )
                        })}
                        {RoutingForDashBordPages.map((page) => {
                            return (
                                <Route
                                    path={page.path}
                                    element={
                                            <ContextProviderForDashBord>
                                                <NotificationContextProvier>
                                                    <SocketContextComponent>
                                                        <div className='md:flex flex-row h-full w-full gap-1'>
                                                            <div className='flex flex-col w-full'>
                                                                <NavbarForDashBord />
                                                                <Alert variant='standard' severity="warning">
                                                                    <p className='text-lg font-bold'>
                                                                        Info — This platform serves as a prototype to familiarize investors with the foundational aspects of the business. A comprehensive website tailored for user engagement is currently in development and is slated for launch by July 2024.
                                                                    </p>
                                                                </Alert>
                                                                <Suspense fallback={<div>Loading......</div>}>
                                                                    <div className='mt-2 overflow-auto h-full mx-2'>
                                                                        {page.component}
                                                                    </div>
                                                                </Suspense>
                                                            </div>
                                                        </div>
                                                    </SocketContextComponent>
                                                </NotificationContextProvier>
                                            </ContextProviderForDashBord>
                                    }
                                />
                            )
                        })}
                        {RoutingForProfilePage.map((page) => {
                            return (
                                <Route
                                    path={page.path}
                                    element={
                                        <ContextProviderForDashBord>
                                            <NotificationContextProvier>
                                                <SocketContextComponent>
                                                    <div className='flex flex-col flex-grow w-auto' >
                                                        <NavbarForDashBord />
                                                        <Suspense fallback={<div>Loading......</div>}>
                                                            {page.component}
                                                        </Suspense>

                                                    </div>
                                                </SocketContextComponent>
                                            </NotificationContextProvier>
                                        </ContextProviderForDashBord>

                                    }
                                />
                            )
                        })}
                        {RoutingForTieUps.map((page) => {
                            return (
                                <Route
                                    path={page.path}
                                    element={
                                        <ContextProviderForDashBord>
                                            <NotificationContextProvier>
                                                <SocketContextComponent>
                                                    <div className='flex flex-col flex-grow w-auto' >
                                                        <NavbarForDashBord />
                                                        <div className='flex flex-row w-full h-full gap-4 mt-2'>
                                                            <div className='w-1/5 xl:block hidden h-full sticky top-14'>
                                                                <SidePannelForTieUps />
                                                            </div>
                                                            <div className='xl:w-4/5 w-full h-full'>
                                                                <Suspense fallback={<div>Loading......</div>}>
                                                                    {page.component}
                                                                </Suspense>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SocketContextComponent>
                                            </NotificationContextProvier>
                                        </ContextProviderForDashBord>
                                    }
                                />
                            )
                        })}
                    </Routes>
                </Router>
            </QueryClientProvider>
        </>
    )
}

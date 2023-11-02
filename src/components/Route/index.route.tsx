import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DashBordPages, IntroPages, ProfilePages, TieUpsPage } from './PageList';
import { Suspense } from 'react';
import NavbarForDashBord from '../DashBord/Component_DashBord/NavbarForDashBord';
import { ContextProviderForDashBord } from '../../context/contextForDashBord';
import { NotificationContextProvier } from '../../context/NotificationContext';
import SidePannelForTieUps from '../DashBord/TieUps/components/SidePanleForTieUps';
import SocketContextComponent from '../../context/ScoketHandlerComponent'
// import SideBar from '../DashBord/Component_DashBord/SideBar';
// import Suggestions from '../DashBord/Component_DashBord/Suggestions';
// import SuggestedPeople from '../DashBord/Component_DashBord/SuggestedPeople';
// import SidePannelForPeople from '../DashBord/Component_DashBord/SidePannelForPeople';

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
    return (
        <>
            <Router>
                <Routes>
                    {RoutingForIntroPages.map((page) => {
                        return (
                            <Route
                                path={page.path}
                                element={
                                    <Suspense fallback={<div>Loading......</div>}>
                                        {page.component}
                                    </Suspense>
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
                                                    {/* <div className='w-[7%] xl:block hidden'>
                                                <SideBar />
                                            </div> */}
                                                    <div className='flex flex-col w-full'>
                                                        <NavbarForDashBord />
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


        </>
    )
}

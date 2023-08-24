import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DashBordPages, IntroPages, ProfilePages } from './PageList';
import { Suspense } from 'react';
import SideBar from '../DashBord/Component_DashBord/SideBar';
import NavbarForDashBord from '../DashBord/Component_DashBord/NavbarForDashBord';
import Suggestions from '../DashBord/Component_DashBord/Suggestions';
import { ContextProviderForDashBord } from '../../context/contextForDashBord';
const RoutingForIntroPages = [
    ...IntroPages
]

const RoutingForDashBordPages = [
    ...DashBordPages
]

const RoutingForProfilePage = [
    ...ProfilePages
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
                                        <div className='md:flex flex-row h-full '>
                                            <SideBar />
                                            <div className='flex flex-col flex-grow w-auto'>
                                                <NavbarForDashBord />
                                                <Suspense fallback={<div>Loading......</div>}>
                                                    <div className='my-2 overflow-auto h-fit mx-2'>
                                                        {page.component}
                                                    </div>
                                                </Suspense>
                                            </div>
                                        </div>
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

                                        <div className='flex flex-col flex-grow w-auto' >
                                            <NavbarForDashBord />
                                            <div className='bg-white h-auto flex flex-row  md:mx-5 '>
                                                <div className="bg-white shadow-lg overflow-hidden md:w-2/3 w-auto">
                                                    <Suspense fallback={<div>Loading......</div>}>
                                                        <div className=' my-5 overflow-auto h-auto'>
                                                            {page.component}
                                                        </div>
                                                    </Suspense>

                                                </div>
                                                <div className='md:w-1/3 md:flex hidden flex-col items-center mx-5'>
                                                    <Suggestions />
                                                </div>
                                            </div>

                                        </div>
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


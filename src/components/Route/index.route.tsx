import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { DashBordPages, IntroPages } from './PageList'
import { Suspense } from 'react'
import SideBar from '../DashBord/Component_DashBord/SideBar'
import NavbarForDashBord from '../DashBord/Component_DashBord/NavbarForDashBord'

const RoutingForIntroPages = [
    ...IntroPages
]

const RoutingForDashBordPages = [
    ...DashBordPages
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
                                    <div className='md:flex flex-row h-full border'>
                                        <SideBar />
                                        <div className='flex flex-col flex-grow w-auto border'>
                                            <NavbarForDashBord />
                                            <Suspense fallback={<div>Loading......</div>}>
                                                <div className=' my-5 overflow-auto h-auto'>
                                                    {page.component}
                                                </div>
                                            </Suspense>
                                        </div>
                                    </div>
                                }
                            />
                        )
                    })}
                </Routes>
            </Router>


        </>
    )
}


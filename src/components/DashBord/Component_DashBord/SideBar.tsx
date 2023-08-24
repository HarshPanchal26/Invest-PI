import { HomeIcon, UsersIcon, LinkIcon, CogIcon, EyeIcon, CurrencyDollarIcon } from '@heroicons/react/20/solid';
import Logo from '../../../Assets/logo';
import { Link } from 'react-router-dom';


const navigationForSideBar = [
    { name: 'Home', href: '/feed', icon: <HomeIcon /> },
    { name: 'Network', href: '/network', icon: <UsersIcon /> },
    { name: 'Tie-ups', href: '/tieups', icon: <LinkIcon /> },
    { name: 'Impression', href: '/impression', icon: <EyeIcon /> },
    { name: 'Rais-Fund', href: '/raisefund', icon: <CurrencyDollarIcon /> },
]

export default function SideBar() {

    return (
        // fixed top-0 left-0 border
        <div className='md:flex w-auto flex-col justify-between h-full hidden bg-slate-200 shadow-md'> 
            <div className=' flex flex-col flex-1 my-1'>
                <div className='p-5 cursor-pointer'>
                    <Logo />
                </div>
                <div className='my-5'>
                    {navigationForSideBar.map((item, index) => {
                        return (
                            <>
                            <Link to={item.href}>
                                <div className='flex flex-col my-2 justify-center'>
                                    <div className='h-6 w-6 my-2  mx-auto cursor-pointer'>
                                        {item.icon}
                                    </div>
                                    <div className='cursor-pointer' key={index}>
                                        {item.name}
                                    </div>
                                </div>
                            </Link>
                            </>
                        )
                    })}
                </div>
            </div>
            <div className='my-2 border'>
                <div className='flex flex-col border-t-black justify-center'>
                    <span className='h-7 w-7 mx-auto my-2 cursor-pointer'><CogIcon /></span>
                    <div className=' cursor-pointer'>
                        {'Setting'}
                    </div>
                </div>
            </div>
        </div>

    )
}

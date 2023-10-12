import React, { useEffect, useContext } from 'react'
import ArticleIcon from '@mui/icons-material/Article';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import RecommendIcon from '@mui/icons-material/Recommend';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Link } from 'react-router-dom';
import { ContextForDashBord } from '../../../context/contextForDashBord';


const ArrasyOfListItem = [
    { feild: 'Pitches', href: '/tieups/pitches', icon: <PeopleAltIcon /> },
    { feild: 'My Investments', href: `/tieups/investments`, icon: <SensorOccupiedIcon /> },
    { feild: 'Requests', href: '/tieups/requests', icon: <RecommendIcon /> },
]

export default function SidePannelForTieUps() {

    const contextForDashBord = useContext(ContextForDashBord);

    return (
        <div className='p-1 my-5'>
            <ul className='w-full rounded-lg shadow-md bg-slate-200'>
                {ArrasyOfListItem.map((item, index) => {
                    return (
                        <>
                            <Link
                                to={item.feild === 'Connection' ? `/connection/${contextForDashBord.USER.USERNAME}` : item.href}
                                about={item.feild}>
                                <li className={`p-4 cursor-pointer text-left`}
                                    key={index}>
                                    <span className='mx-2'>{item.icon}</span>
                                    {item.feild}
                                </li>
                            </Link>
                        </>
                    )
                })}
            </ul>
        </div>
    )
}


/**
 * 
 *  tie ups 
 *  feed for pitch 
 *  My investments
 *  
 */
import React from 'react'
import { useContext } from 'react'
import { ContextForDashBord } from '../../../../context/contextForDashBord'
import { MapPinIcon ,UsersIcon } from '@heroicons/react/20/solid';
import MilitaryTechSharpIcon from '@mui/icons-material/MilitaryTechSharp';
import LanguageSharpIcon from '@mui/icons-material/LanguageSharp';

export default function Summary() {

    const contextForDashBord = useContext(ContextForDashBord);
    return (
        <>
            <div className='w-full h-full flex md:flex-row flex-col mt-6'>
                {/* About Section */}
                <div className='md:w-2/5 w-full'>
                    <div className='text-2xl font-bold text-left mx-2'>About</div>
                    <p className='text-left my-4 mx-3 text-base'>{contextForDashBord.USER.ABOUT}</p>
                    <div className='my-3'>
                        <ul className='text-left text-lg mx-5'>
                            <li className='my-1'>
                                <div className='flex flex-row gap-1'>
                                    <MapPinIcon style={{ width: '25px', height: '25px' }} />
                                    <span>{contextForDashBord.USER?.CITY} ,{contextForDashBord.USER?.STATE} ,{contextForDashBord.USER?.COUNTRY}</span>
                                </div>
                            </li>
                            <li className='my-1'>
                                <div className='flex flex-row gap-1'>
                                    <UsersIcon style={{ width: '25px', height: '25px' }} />
                                    <span>{contextForDashBord.USER?.SIZE}</span>
                                </div>
                            </li>
                            <li className='my-1'>
                                <div className='flex flex-row gap-1'>
                                    <LanguageSharpIcon  style={{ width: '25px', height: '25px' }} />
                                    <span>{contextForDashBord.USER?.LINK}</span>
                                </div>
                            </li>
                            <li className='my-1'>
                                <div className='flex flex-row gap-1'>
                                    <MilitaryTechSharpIcon style={{ width: '25px', height: '25px' }} />
                                    <span>{contextForDashBord.USER?.STAGE}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/*  middle line */}
                <div className='border'></div>
                {/*  details */}
                <div className='md:w-2/5 w-full'>
                    <div className='text-2xl font-bold text-left mx-2'>Details</div>
                    <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                        <p className='text-sm text-gray-700 mx-3'>Industry</p>
                         <div className='w-full my-3'>
                            <p className='mx-2 p-2 text-center border-blue-600 bg-blue-600 inline-block text-white rounded-lg'>{contextForDashBord.USER.INDUSTRY}</p>
                         </div>   
                    </div>
                    <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                        <p className='text-sm text-gray-700 mx-3'>Specialization</p>
                         <div className='w-full my-3'>
                            <p className='mx-2 p-2 text-center border-blue-600 bg-blue-600 inline-block text-white rounded-lg'>{contextForDashBord.USER.SPECIALIZATION}</p>
                         </div>   
                    </div>
                    <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                        <p className='text-sm text-gray-700 mx-3'>Headquarters</p>
                         <div className='w-full my-1'>
                            <p className='mx-2 p-2 text-left'>
                                {contextForDashBord.USER.HEADQUARTERS}</p>
                         </div>   
                    </div>
                    <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                        <p className='text-sm text-gray-700 mx-3'>Country</p>
                         <div className='w-full my-1'>
                            <p className='mx-2 p-2 text-left'>
                                {contextForDashBord.USER.COUNTRY}</p>
                         </div>   
                    </div>
                    <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                        <p className='text-sm text-gray-700 mx-3'>Contacts</p>
                         <div className='w-full my-1'>
                            <p className='mx-2 p-2 text-left'>
                                {contextForDashBord.USER.EMAIL}</p>
                         </div>   
                    </div>
                </div>
            </div>
        </>
    )
}

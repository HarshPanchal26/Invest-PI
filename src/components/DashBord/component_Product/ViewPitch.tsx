import React, { useEffect, useContext } from 'react'
import { Avatar } from '@mui/material'
import { ContextForDashBord } from '../../../context/contextForDashBord';
import BasicTable from './BasicTable';
import ViewMedia from './ViewMedia';
import {ArrayForMediaData} from '../../../utils/factory/MedaiData';
import ViewUSPs from './ViewUSPs';
import ViewAnswers from './ViewAnswers';
export default function ViewPitch() {

    const contextForDashBord = useContext(ContextForDashBord);

    useEffect(() => {

    }, [])

    return (
        <div className='w-full h-full'>
            <div className='xl:w-4/5 w-full mx-auto h-full overflow-auto'>
                <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-6 gap-y-0">
                    <div className='col-span-1 order-1 mx-auto'>
                        <Avatar
                            alt="Remy Sharp"
                            src={contextForDashBord.USER.PROFILEIMAGE}
                            sx={{ width: 100, height: 100 }}
                            className='my-5 mx-2'
                        />
                    </div>
                    <div className='my-5 col-span-4 md:text-left md:order-2 order-3 text-center '>
                        <span className='text-lg  text-slate-500'>Product</span>
                        <p className='text-3xl font-bold my-2'>HR Cloths</p>
                    </div>
                    <div className='my-5 md:order-3 order-2 cursor-pointer col-span-1'>
                        <span className='text-lg  text-slate-500'>Rank</span>
                        <p className='text-3xl font-bold my-2 underline'>1</p>
                    </div>
                </div>
                <main className='h-auto w-full'>
                    <div className='w-full flex md:flex-row flex-col p-2 gap-3 h-auto'>
                        <div className='p-1 md:w-2/3'>
                            {/* About Sections */}
                                <div className='text-2xl font-bold text-left my-4'>About</div>
                            <div className='bg-slate-200 p-2 rounded-lg '>
                                <p className='text-left text-xl mx-1 mt-2 p-4'>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis nobis consequuntur, aperiam, aspernatur ipsam nulla est sit et rerum culpa eum laudantium! Repudiandae, et. Rem ad at reprehenderit tempora necessitatibus suscipit eos rerum enim, ea reiciendi
                                    lorem400
                                </p>
                            </div>
                            <div className='my-5 p-2 rounded-lg '>
                                <div className='text-2xl font-bold text-left my-4'>Media</div>
                                <ViewMedia ArrayForMedia={ArrayForMediaData}/>
                            </div>
                        </div>
                        {/* Side Pannle for Pitch */}
                        <div className='p-1 md:w-1/3 h-fit border-l-2'>
                            <div className='w-full'>
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
                                        <p className='mx-2 p-2 text-left font-bold'>
                                            {contextForDashBord.USER.HEADQUARTERS}</p>
                                    </div>
                                </div>
                                <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                    <p className='text-sm text-gray-700 mx-3'>Country</p>
                                    <div className='w-full my-1'>
                                        {/* <MapPinIcon style={{ width: '25px', height: '25px' }} /> */}
                                        <p className='mx-2 p-2 text-left font-bold'>{contextForDashBord.USER?.CITY} ,{contextForDashBord.USER?.STATE},{contextForDashBord.USER?.COUNTRY}</p>
                                    </div>
                                </div>
                                <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                    <p className='text-sm text-gray-700 mx-3'>Contacts</p>
                                    <div className='w-full my-1'>
                                        <p className='mx-2 p-2 text-left font-bold'>
                                            {contextForDashBord.USER.EMAIL}</p>
                                    </div>
                                </div>
                                <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                    <p className='text-sm text-gray-700 mx-3'>Size</p>
                                    <div className='w-full my-1'>
                                        <p className='mx-2 p-2 text-left font-bold'>
                                            {contextForDashBord.USER?.SIZE}</p>
                                    </div>
                                </div>
                                <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                    <p className='text-sm text-gray-700 mx-3'>Link</p>
                                    <div className='w-full my-1'>
                                        <p className='mx-2 p-2 text-left font-bold'>
                                            {contextForDashBord.USER?.LINK}</p>
                                    </div>
                                </div>
                                <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                    <p className='text-sm text-gray-700 mx-3'>Stage</p>
                                    <div className='w-full my-1'>
                                        <p className='mx-2 p-2 text-left font-bold'>
                                            {contextForDashBord.USER.STAGE}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full p-3'>
                        {/* USPs */}
                        <div className='my-5 p-2 rounded-lg'>
                            <div className='text-2xl font-bold text-left my-4'>USPs</div>
                            <ViewUSPs ArrayForUSP={contextForDashBord.USER.PRODUCTINSIDE.usp}/>
                        </div>
                        {/* Table*/}
                        <div className='my-11'>
                            <div className='text-2xl font-bold text-left my-4'>Finance</div>
                        <BasicTable 
                            dataofInvestor={contextForDashBord.USER.PRODUCTINSIDE.financial.history}
                        />
                        </div>
                        {/* Answers of Questions */}
                        <div className='my-11'>
                            <div className='text-2xl font-bold text-left my-4'>Extra Information</div>
                            < ViewAnswers/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

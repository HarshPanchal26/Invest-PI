import React from 'react'
import Logo from '../../Assets/logo'


export default function AccountType() {


    return (
        <div className=' flex items-center justify-center h-auto flex-col'>
            <Logo />
            {/* <p className='flex justify-center text-4xl text-blue-500 my-5'>Slecte your Preference   </p> */}
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl my-10">Slecte your Preference</p>
            <div className='bg-white p-4 rounded-lg w-[80%] lg:w-5/6 text-center flex sm:flex-row flex-col flex-wrap h-[80%] borde'>
                {/* Boxes */}
                <div className='flex flex-col shadow-md w-auto h-1/2 rounded-lg text-center text-3xl my-10 mx-auto'>
                    <img src='https://img.lovepik.com/free-png/20210923/lovepik-financial-investment-png-image_401202574_wh1200.png' alt='Innvestor iamge ' className='h-full w-[400px]'></img>
                    <p className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-4xl my-10">As an Investor</p>
                </div>
                <div className='shadow-md w-auto h-1/2 rounded-lg text-center text-3xl my-10 mx-auto'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyF_wARWd9jbfA9k88RvbIj-c-KWBYOsqAeg&usqp=CAU' alt='Innvestor iamge ' className='h-full w-[400px]'></img>
                <p className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-4xl my-10">As an Founder</p>
                </div>
            </div>
        </div>
    )
}

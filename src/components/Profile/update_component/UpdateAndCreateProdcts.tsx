import React, { useContext, useEffect } from 'react';
import { Avatar } from '@mui/material'
import { ContextForDashBord } from '../../../context/contextForDashBord';

export default function UpdateAndCreateProdcts() {

  const contextForDashBord = useContext(ContextForDashBord);

  return (
    <div className='xl:w-[900px] max-h-[500px] md:w-[700px] overflow-auto'>
      <div className='w-full h-full p-1'>
        {/* <div className='flex xl:flex-row flex-col w-full border'> */} 
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <img src={contextForDashBord.USER.PROFILEIMAGE} alt='Product-Pic' className='w-32 h-18 rounded-md' />
          <div className="sm:col-span-4 col-span-full">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Product Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 my-2">
          <div className="sm:col-span-3 col-span-full">
            <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">
              Bio About Product
            </label>
            <div className="mt-2">
              <input
                id="bio"
                name="bio"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                defaultValue={''}
                // rows={2}
              />
            </div>
          </div>

          {/* <div className="sm:col-span-3 col-span-full">
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              About Product
            </label>
            <div className="mt-2">
              <textarea
                id="about"
                name="about"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                defaultValue={''}
                rows={2}
              />
            </div>
          </div> */}

          <div className="sm:col-span-3 col-span-full">
            <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">
              Type 
            </label>
            <div className="mt-2">
              <input
                id="bio"
                name="bio"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                defaultValue={''}
              // rows={2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


//  Profile 
//  Name of products 
//  Parent (By default)
//  About 
//  Bio (One liner who intriduce your product)
//  USP 
//  Demo 
//  




{/* <Avatar alt="Remy Sharp"
          src={contextForDashBord.USER.PROFILEIMAGE}
          sx={{ width: 140, height: 140 }}
          className='my-2 mx-2' 
        /> */}








// <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//     <div className="sm:col-span-4">
//       <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
//         Username
//       </label>
//       <div className="mt-2">
//         <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//           <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
//           <input
//             type="text"
//             name="username"
//             id="username"
//             autoComplete="username"
//             className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//             placeholder="janesmith"
//           />
//         </div>
//       </div>
// </div>
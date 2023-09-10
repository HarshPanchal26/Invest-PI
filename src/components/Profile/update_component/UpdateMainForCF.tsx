import React, { useEffect, useState} from 'react'
import Loading from '../../../Assets/Loading';
import {VerificationForMainDataOfCF} from '../../../Verification/UpdateDataVerification'
import axios from 'axios';

type TypeForProps = {
  objForProfile : any
}

type TypeForUpdatedMainData = {
    name : '',
    username : '',
    bio : '',
}

export default function UpdateMainForCF({ objForProfile} :TypeForProps) {

  const [loader, setLoader] = useState<boolean>(true);
  const [error , setError] = useState<string | null>(null);
  const [updatedAboutData, setUpdatedAboutData] = useState<TypeForUpdatedMainData>({
    name : '',
    username : '',
    bio : '',
  });

  const handleChageInValue = (event: any) => {
    const { value, name } = event.target;
    setUpdatedAboutData({
      ...updatedAboutData,
      [name]: value
    })
  }

  const handleUpdateForCF = async()=>{
    setError(null);
    try {
        await VerificationForMainDataOfCF(updatedAboutData);                
        const updated = await axios.post('/profile/update/main' , updatedAboutData);
        console.log("updated" ,updated)
    } catch (error : any) {
        setError(`${error?.message || error }`)
    }
  }

  useEffect(() => {
    setUpdatedAboutData({
        name: objForProfile.FIRMNAME,
        username : objForProfile.USERNAME,
        bio : objForProfile.BIO
    })
    setLoader(false);
  }, [])


  return (
    <>
      {loader && <Loading />}
      {!loader && (<div className='overflow-auto h-[500px] mx-auto w-full'>
        {error !==null  && <p className='text-red-600 flex text-sm justify-center'>{error}</p>}
        <div className='p-2'>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="col-span-5 md:col-span-3">
              <label htmlFor="username" className="block text-sm font-semibold leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2.5">
                <input
                  name="username"
                  id="username"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={updatedAboutData.username}
                  onChange={handleChageInValue}
                />
              </div>
              <p className='text-sm my-4 text-gray-500'>Write about your product in more then 250 words</p>
            </div>

            <div className="col-span-5 md:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Firm Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={updatedAboutData.name}
                  onChange={handleChageInValue}
                  autoComplete="link"
                  className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-5 md:col-span-3">
              <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">
                Bio
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="bio"
                  id="bio"
                  value={updatedAboutData.bio}
                  onChange={handleChageInValue}
                  className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-10 border col-span-3">
              <button
                type="button"
                onClick={handleUpdateForCF}
                className="flex rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 justify-center w-full"
              >
                Update
              </button>
            </div>

          </div>
        </div>
      </div>)}
    </>
  )
}

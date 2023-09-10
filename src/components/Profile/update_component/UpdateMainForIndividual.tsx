import React, { useEffect, useState, useContext } from 'react'
import Loading from '../../../Assets/Loading';
import { VerificationForMainDataOfCF } from '../../../Verification/UpdateDataVerification'
import axios from 'axios';
import { ContextForDashBord } from '../../../context/contextForDashBord';

type TypeForProps = {
  objForProfile: any
}

type TypeForUpdatedMainData = {
  firstname: '',
  lastname: '',
  username: '',
  bio: '',
  email: '',
}

export default function UpdateMainForIndividual({ objForProfile }: TypeForProps) {

  const contextForDashBord = useContext(ContextForDashBord);
  const [loader, setLoader] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAboutData, setUpdatedAboutData] = useState<TypeForUpdatedMainData>({
    firstname: '',
    lastname: '',
    username: '',
    bio: '',
    email: '',
  });

  const handleChageInValue = (event: any) => {
    const { value, name } = event.target;
    setUpdatedAboutData({
      ...updatedAboutData,
      [name]: value
    })
  }

  const handleUpdateForCF = async () => {
    setError(null);
    try {
      const updated = await axios.post('/profile/update/main', updatedAboutData);
      console.log("updated", updated)
      contextForDashBord.USER.FIRST_NAME = updatedAboutData.firstname;
      contextForDashBord.USER.LAST_NAME = updatedAboutData.lastname;
      contextForDashBord.USER.EMAIL = updatedAboutData.email;
      contextForDashBord.USER.USERNAME = updatedAboutData.username;
      contextForDashBord.USER.BIO = updatedAboutData.bio;
    } catch (error: any) {
      setError(`${error?.message || error}`)
    }
  }

  useEffect(() => {
    setUpdatedAboutData({
      firstname: objForProfile.FIRST_NAME,
      lastname: objForProfile.LAST_NAME,
      username: objForProfile.USERNAME,
      bio: objForProfile.BIO,
      email: objForProfile.EMAIL
    })
    setLoader(false);
  }, [])


  return (
    <>
      {loader && <Loading />}
      {!loader && (<div className='overflow-auto min-h-[300px] h-auto mx-auto w-full'>
        {error !== null && <p className='text-red-600 flex text-sm justify-center'>{error}</p>}
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
              {/* <p className='text-sm my-4 text-gray-500'>Write about your product in more then 250 words</p>s */}
            </div>

            <div className="col-span-5 md:col-span-3">
              <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                First Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={updatedAboutData.firstname}
                  onChange={handleChageInValue}
                  autoComplete="link"
                  className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-5 md:col-span-3">
              <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={updatedAboutData.lastname}
                  onChange={handleChageInValue}
                  autoComplete="link"
                  className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-5 md:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={updatedAboutData.email}
                  onChange={handleChageInValue}
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

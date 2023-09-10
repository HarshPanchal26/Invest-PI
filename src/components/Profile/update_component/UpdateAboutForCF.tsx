import React, { SetStateAction, useEffect, useState , useContext} from 'react'
import Loading from '../../../Assets/Loading';
import {VerificationForAboutDataOfCF} from '../../../Verification/UpdateDataVerification'
import axios from 'axios';
import { ContextForDashBord } from '../../../context/contextForDashBord';
import {formatTextForDisplay} from '../../../utils/factory/FormatText'

type TypeForProps = {
  objForProfile : any, 
  setModalData: React.Dispatch<SetStateAction<{open : boolean , child : any}>>
  setDataForProfilePage: React.Dispatch<SetStateAction<any>>
}

type TypeForUpdatedCFData = {
    about: '',
    headquarters: '',
    link : '',
    city : '',
    state : '',
    country : '',
}

export default function UpdateAboutForCF({ objForProfile , setModalData ,setDataForProfilePage} :TypeForProps) {

  const contextForDashBord =useContext(ContextForDashBord);  
  const [loader, setLoader] = useState<boolean>(true);
  const [error , setError] = useState<string | null>(null);
  const [updatedAboutData, setUpdatedAboutData] = useState<TypeForUpdatedCFData>({
    about: '',
    headquarters: '',
    link : '',
    city : '',
    state : '',
    country : '',
  });

  const handleChageInValue = (event: any) => {
    let { value, name } = event.target;
    if(name === 'about') value = formatTextForDisplay(value);
    setUpdatedAboutData({
      ...updatedAboutData,
      [name]: value
    })
  }

  const handleUpdateForCF = async()=>{
    setError(null);
    try {
        await VerificationForAboutDataOfCF(updatedAboutData);                
        const res = await axios.post('/profile/update/about' , updatedAboutData);
        console.log("res" , res)
        // await contextForDashBord.checkAuthorization();
        window.location.reload();
    } catch (error : any) {
        console.log("updated error"  ,error)
        setError(`${error.message}`)
    }
  }

  useEffect(() => {
    setUpdatedAboutData({
        about: objForProfile.ABOUT,
        headquarters: objForProfile.HEADQUARTERS,
        link : objForProfile.LINK,
        city : objForProfile.CITY,
        state : objForProfile.STATE,
        country : objForProfile.COUNTRY,
    })
    setLoader(false);
  }, [objForProfile])

  return (
    <>
      {loader && <Loading />}
      {!loader && (<div className='overflow-auto h-[500px] mx-2 w-full'>
        {error !==null  && <p className='text-red-600 flex text-sm justify-center'>{error}</p>}
        <div className='p-2'>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="col-span-5 md:col-span-3">
              <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2.5">
                <textarea
                  name="about"
                  id="about"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={updatedAboutData.about}
                  onChange={handleChageInValue}
                />
              </div>
              <p className='text-sm my-4 text-gray-500'>Write about your product in more then 250 words</p>
            </div>

            <div className="col-span-5 md:col-span-3">
              <label htmlFor="link" className="block text-sm font-medium leading-6 text-gray-900">
                Link
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="link"
                  id="link"
                  value={updatedAboutData.link}
                  onChange={handleChageInValue}
                  autoComplete="link"
                  className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-5 md:col-span-3">
              <label htmlFor="headquarters" className="block text-sm font-medium leading-6 text-gray-900">
                Headquarters Address (do not mention city or country here)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="headquarters"
                  id="headquarters"
                  value={updatedAboutData.headquarters}
                  onChange={handleChageInValue}
                  autoComplete="headquarters"
                  className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>



            <div className="col-span-5 md:col-span-4">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              Country
            </label>
            <div className="mt-2">
              <select
                id="country"
                name="country"
                autoComplete="country"
                onChange={handleChageInValue}
                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
                value={updatedAboutData.country}
              >
                <option value={''} >{'None'}</option>
                <option value={'India'} >{'India'}</option>
                <option value={'Canada'}>{'Canada'}</option>
                <option value={'USA'} >{'USA'}</option>
              </select>
            </div>
          </div>

          <div className="col-span-5 md:col-span-3">
            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
              City
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                value={updatedAboutData.city}
                onChange={handleChageInValue}
                autoComplete="address-level2"
                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-5 md:col-span-3">
            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
              State / Province
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="State"
                id="region"
                value={updatedAboutData.state}
                onChange={handleChageInValue}
                autoComplete="address-level1"
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

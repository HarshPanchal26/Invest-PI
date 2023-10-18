import React, { SetStateAction, useEffect, useState , useContext} from 'react'
import Loading from '../../../Assets/Loading';
import axios from 'axios';
import { ContextForDashBord } from '../../../context/contextForDashBord';
import {formatTextForDisplay} from '../../../utils/factory/FormatText'

type TypeForProps = {
  objForProfile: any,
  closeModal : React.Dispatch<SetStateAction<{open : boolean , child : null | string}>>
}

type TypeForUpdatedIndividualData = {
    about: '',
}

export default function UpdateAboutForIndividual({ objForProfile , closeModal} :TypeForProps) {

  const contextForDashBord =useContext(ContextForDashBord);  

  const [loader, setLoader] = useState<boolean>(true);
  const [error , setError] = useState<string | null>(null);
  const [updatedAboutData, setUpdatedAboutData] = useState<TypeForUpdatedIndividualData>({
    about: '',
  });

  const handleChageInValue = (event: any) => {
    let { value, name } = event.target;
    setUpdatedAboutData({
      ...updatedAboutData,
      [name]: value
    })
  }

  const handleUpdateForIndividual = async()=>{
    setError(null);
    try {
        const res = await axios.post('/api/profile/update/about' , updatedAboutData);
        console.log("res" , res)
        contextForDashBord.USER.ABOUT = updatedAboutData.about;
        closeModal({
          open : false,
          child : null
        })
    } catch (error : any) {
        console.log("updated error"  ,error)
        setError(`${error.message}`)
        
    }
  }

  useEffect(() => {
    setUpdatedAboutData({
        about: objForProfile.ABOUT,
    })
    setLoader(false);
  }, [])

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

           

            <div className="mt-10 border col-span-3">
              <button
                type="button"
                onClick={handleUpdateForIndividual}
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

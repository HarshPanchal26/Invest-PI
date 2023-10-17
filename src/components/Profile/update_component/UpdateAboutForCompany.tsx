import React, { useEffect, useState, useContext ,SetStateAction} from 'react'
import { ArrayForInvestorInterest } from '../../../utils/InterestArray'
import { ContextForDashBord } from '../../../context/contextForDashBord';
import Loading from '../../../Assets/Loading';
// import { IconButton } from '@mui/material';
// import { EyeIcon } from '@heroicons/react/20/solid';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';


type Props = {
  objForProfile: any,
  closeModal: React.Dispatch<SetStateAction<{ open: boolean, child: any }>>
}

const ObjForCompanySize: any = {
  'Established Industry Leaders': ['<5000', '5000-10,000', '>10,000'],
  'Emerging Challengers': ['<500', '500-1000', '>1000'],
  'Visionary Startups': ['10-50', '50-100', '>100']
}

export default function UpdateAboutForCompany({ objForProfile , closeModal }: Props) {


  const contextForDashBord = useContext(ContextForDashBord);

  const [dataForSpecialization, setDataForSpecialization] = useState([]);

  const [dataForSize, setDataForSize] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [openBackDrop, setBackDrop] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);
  
  const [updatedAboutData, setUpdatedAboutData] = useState({
    about: '',
    stage: '',
    size: '',
    industry: '',
    specialization: '',
    headquarters: '',
    link: '',
    city: '',
    state: '',
    country: '',
  });

  const handleChageInValue = (event: any) => {
    const { value, name } = event.target;
    setUpdatedAboutData({
      ...updatedAboutData,
      [name]: value
    })
  }

  const handleChangeInOption = (name: string, value: string) => {

    if (name === 'industry') {
      if (value !== '') {
        let ObjForSpecialization: any = ArrayForInvestorInterest
          .filter((item) => item.type === value);

        let array = ObjForSpecialization[0].feild.map((item: any) => {
          return item.category
        })
        setDataForSpecialization(array);
        setUpdatedAboutData({
          ...updatedAboutData,
          [name]: value
        })
      } else {
        setUpdatedAboutData({
          ...updatedAboutData,
          industry: " ",
          specialization: " "
        })
        setDataForSpecialization([]);
      }
    }
    if (name === 'stage') {
      if (value !== '') {
        setUpdatedAboutData({
          ...updatedAboutData,
          [name]: value
        })
        setDataForSize([...ObjForCompanySize[`${value}`]])
      } else {
        setUpdatedAboutData({
          ...updatedAboutData,
          [name]: " "
        })
        setDataForSize([]);
      }
    }
  }

  const handleUpdateForCF = async () => {
    setError(null);
    setBackDrop(true);
    try {
      // await VerificationForAboutDataOfCF(updatedAboutData);                
      const res = await axios.post('/profile/update/about', updatedAboutData);
      console.log("res", res)
      await contextForDashBord.checkAuthorization();
      contextForDashBord.USER.ABOUT = updatedAboutData.about;
      contextForDashBord.USER.HEADQUARTERS = updatedAboutData.headquarters;
      contextForDashBord.USER.LINK = updatedAboutData.link;
      contextForDashBord.USER.CITY = updatedAboutData.city;
      contextForDashBord.USER.STATE = updatedAboutData.state;
      contextForDashBord.USER.COUNTRY = updatedAboutData.country;
      closeModal({
        child: null,
        open: false
      })
    } catch (error: any) {
      console.log("updated error", error)
      setBackDrop(false);
      setError(`${error.message}`)
    }
  }

  useEffect(() => {
    if(objForProfile.USERTYPE === 'VISITOR'){
      closeModal({
        child : null,
        open : false
      })
    }
    let ObjForSpecialization: any = ArrayForInvestorInterest
      .filter((item) => item.type === objForProfile.INDUSTRY);

    let array = ObjForSpecialization[0].feild.map((item: any) => {
      return item.category
    })
    setDataForSpecialization(array)
    setDataForSize([...ObjForCompanySize[`${objForProfile.STAGE}`]])
    setUpdatedAboutData({
      about: objForProfile.ABOUT,
      stage: objForProfile.STAGE,
      size: objForProfile.SIZE,
      industry: objForProfile.INDUSTRY,
      specialization: objForProfile.SPECIALIZATION,
      headquarters: objForProfile.HEADQUARTERS,
      link: objForProfile.LINK,
      city: objForProfile.CITY,
      state: objForProfile.STATE,
      country: objForProfile.COUNTRY,
    })
  }, [])

  useEffect(() => {
    setLoader(false);
  }, [updatedAboutData, dataForSize, dataForSpecialization])

  return (
    <>
      {loader && <Loading />}
      {!loader && (<div className='overflow-auto h-[500px] mx-2 w-full'>
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
              <label htmlFor="stage" className="block text-sm font-medium leading-6 text-gray-900">
                Stage (Products / Company Stage)
              </label>
              <div className="mt-2">
                <select
                  id="stage"
                  name="stage"
                  onChange={(e) => handleChangeInOption(e.target.name, e.target.value)}
                  className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={updatedAboutData.stage}
                >
                  <option value={''} >{'None'}</option>
                  <option value={'Established Industry Leaders'} >{'Established Industry Leaders'}</option>
                  <option value={'Emerging Challengers'}>{'Emerging Challengers'}</option>
                  <option value={'Visionary Startups'} >{'Visionary Startups'}</option>
                </select>
              </div>
            </div>

            <div className="col-span-5 md:col-span-3">
              <label htmlFor="size" className="block text-sm font-medium leading-6 text-gray-900">
                Company Size
              </label>
              <div className="mt-2">
                <select
                  id="size"
                  name="size"
                  autoComplete="size"
                  onChange={handleChageInValue}
                  className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={updatedAboutData.size}
                >
                  <option value={'NA'} >{'NA'}</option>
                  {
                    dataForSize.map((item: any, index: any) => {
                      return (
                        <option value={item} key={index}>{item}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>


            <div className="col-span-5 md:col-span-3">
              <label htmlFor="industry" className="block text-sm font-medium leading-6 text-gray-900">
                Industry
              </label>
              <div className="mt-2">
                <select
                  id="industry"
                  name="industry"
                  autoComplete="industry"
                  onChange={(e) => handleChangeInOption(e.target.name, e.target.value)}
                  className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={updatedAboutData.industry}
                >
                  <option value={''} >{'None'}</option>
                  {ArrayForInvestorInterest.map((item: any, index: any) => {
                    return (
                      <option value={item.type} key={index}>{item.type}</option>
                    )
                  })}
                </select>
              </div>
            </div>


            <div className="col-span-5 md:col-span-3">
              <label htmlFor="specialization" className="block text-sm font-medium leading-6 text-gray-900">
                Industry Specialization
              </label>
              <div className="mt-2">
                <select
                  id="specialization"
                  name="specialization"
                  onChange={handleChageInValue}
                  className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={updatedAboutData.specialization}
                >
                  <option value={''} >{'None'}</option>
                  {dataForSpecialization.map((item: string, index: number) => {
                    return (
                      <option value={item} key={index}>{item}</option>
                    )
                  })}
                </select>
              </div>
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
                className="flex rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 justify-center w-full"
                onClick={handleUpdateForCF}

              >
                Update
              </button>
            </div>

          </div>
          <Backdrop
            sx={{ color: 'blue', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackDrop}
          >
            <div className=' flex flex-row'>
              <CircularProgress color="inherit" />
              <span className='mx-3 my-auto'>{'Upadting .......'}</span>
            </div>
          </Backdrop>
        </div>
      </div>)}
    </>
  )
}

import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { PersonalDataVarificationForCompany } from '../../../Verification/PersonalDataVarification'
import { objForCompany } from '../../../utils/factory/ObjForFormData';
import { SchemaForCompanyObj } from '../../../utils/factory/ObjForSchema';
import { ArrayForInvestorInterest } from '../../../utils/InterestArray'
import { TypeForCompany } from '../../../utils/type'

type propsType = {
  handleNext: Function
  setObjForSignInComonent: React.Dispatch<React.SetStateAction<Object>>
}


const ObjForCompanySize: any = {
  'Established Industry Leaders': ['<5000', '5000-10,000', '>10,000'],
  'Emerging Challengers': ['<500', '500-1000', '>1000'],
  'Visionary Startups': ['10-50', '50-100', '>100']
}

export default function PersonalDetailsForProducts({ handleNext, setObjForSignInComonent }: propsType) {


  const [dataForPersonalDetails, setDataForPersonalDetails] = useState<TypeForCompany>(objForCompany)

  const [errorMessage, setErrorMessage] = useState<String | null>(null);

  const [industry, setIndustry] = useState<String[] | null>(null);

  const [sizeOfCompany, setSizeOfCompany] = useState<Array<string> | null>(null);



  const handleChageInValue = (event: any) => {
    const { value, name } = event.target;
    setDataForPersonalDetails({
      ...dataForPersonalDetails,
      [name]: value
    })
    objForCompany[name] = value;

  }

  const handleChangeInOption = (event: any) => {
    const { value, name } = event.target;
    setDataForPersonalDetails({
      ...dataForPersonalDetails,
      [name]: value
    })
    objForCompany[name] = value;
    if (name === 'industry') {
      if (value !== '') {
        let arrayForSpecialization: any = ArrayForInvestorInterest.filter((item) => {
          return item.type === value && item.feild
        })
        setIndustry(arrayForSpecialization[0].feild);
      } else {
        setDataForPersonalDetails({
          ...dataForPersonalDetails,
          industry: "",
          specialization: ""
        })
        objForCompany["specialization"] = "";
        setIndustry(null);
      }
    }
    if (name === 'stage') {
      if (value !== '') {
        setSizeOfCompany([...ObjForCompanySize[value]])
      } else {
        setDataForPersonalDetails({
          ...dataForPersonalDetails,
          size: ""
        })
        objForCompany["size"] = "";
        setSizeOfCompany(null);
      }
    }
  }

  const handleClick = async () => {
    try {
      await PersonalDataVarificationForCompany(dataForPersonalDetails);
      let Schema = SchemaForCompanyObj(dataForPersonalDetails)
      setObjForSignInComonent(Schema)
      handleNext();
    } catch (error: any) {
      setErrorMessage(error)
    }
  }
  useEffect(() => {
    setDataForPersonalDetails(objForCompany)
  }, [])
  return (
    <div className='mx-2 my-5 '>
      <div className=" pb-12 text-center">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
        {/* {errorMessage && <p className=' my-5  rounded-xl p-1 bg-red-600 block mx-auto text-white w-1/2 border'>{errorMessage}</p>} */}
        {errorMessage && <p className='my-5 p-1 text-lg block mx-auto text-red-600 w-1/2 text-center'>{errorMessage}</p>}
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-5 md:col-span-3">
            <label htmlFor="company-name" className="block text-sm font-medium leading-6 text-gray-900">
              Company Name / Product Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="company-name"
                id="company-name"
                autoComplete="given-name"
                onChange={handleChageInValue}
                value={dataForPersonalDetails["company-name"]}
                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-5 md:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={dataForPersonalDetails.email}
                autoComplete="email"
                onChange={handleChageInValue}
                className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* <div className="col-span-5 md:col-span-4">
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              Bio (About your Product / Startup)
            </label>
            <div className="mt-2">
              <textarea
                name="about"
                id="about"
                value={dataForPersonalDetails.about}
                onChange={handleChageInValue}
                autoComplete="family-name"
                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}


          <div className="col-span-5 md:col-span-3">
            <label htmlFor="stage" className="block text-sm font-medium leading-6 text-gray-900">
              Stage (Products / Company Stage)
            </label>
            <div className="mt-2">
              <select
                id="stage"
                name="stage"
                autoComplete="stage"
                onChange={handleChangeInOption}
                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
                value={dataForPersonalDetails.stage}
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
                required
                value={dataForPersonalDetails.size}
              >
                <option value={'NA'} >{'NA'}</option>
                {sizeOfCompany !== null &&
                  sizeOfCompany.map((item, index) => {
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
                onChange={handleChangeInOption}
                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
                value={dataForPersonalDetails.industry}
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
                autoComplete="specialization"
                onChange={handleChageInValue}
                // className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                required
                value={dataForPersonalDetails.specialization}
              >
                <option value={''} >{'None'}</option>
                {industry !== null && industry.map((item: any, index: any) => {
                  return (
                    <option value={item.category} key={index}>{item.category}</option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className="col-span-5 md:col-span-full">
            <label htmlFor="headquarters" className="block text-sm font-medium leading-6 text-gray-900">
              Headquarters Address (do not mention city or country here)
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="headquarters"
                id="headquarters"
                value={dataForPersonalDetails.headquarters}
                onChange={handleChageInValue}
                autoComplete="headquarters"
                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* <div className="col-span-5 md:col-span-full">
            <label htmlFor="link" className="block text-sm font-medium leading-6 text-gray-900">
                Link ( Website link or any thing which describe your product/ company)
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="link"
                id="link"
                value={dataForPersonalDetails.link}
                onChange={handleChageInValue}
                autoComplete="link"
                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}


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
                value={dataForPersonalDetails.country}
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
                value={dataForPersonalDetails.city}
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
                value={dataForPersonalDetails.State}
                onChange={handleChageInValue}
                autoComplete="address-level1"
                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center">
      <Button
        variant='contained'
        color='primary'
        className='my-10 border'
        onClick={handleClick}
      >
        Next</Button>
      </div>
    </div>
  )
}

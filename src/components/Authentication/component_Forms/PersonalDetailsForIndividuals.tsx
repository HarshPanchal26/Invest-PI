import { useState } from "react";
import { Button } from '@mui/material';
import { PersonalDataVarificationForIndividuals } from '../../../Verification/PersonalDataVarification'
import {objForPersonalDataOfIndividuals} from '../../../utils/factory/ObjForFormData';
import {SchemaForIndividualsObj} from '../../../utils/factory/ObjForSchema'
import {TypeForIndividualsData} from '../../../utils/type'

type propsType = {
  handleNext: Function,
  setObjForSignInComonent: React.Dispatch<React.SetStateAction<Object>>
}

export default function PersonalDetailsForIndividuals({ handleNext  , setObjForSignInComonent}: propsType) {

  const [dataForPersonalDetails, setDataForPersonalDetails] = useState<TypeForIndividualsData>(objForPersonalDataOfIndividuals)

  const [errorMessage, setErrorMessage] = useState<String | null>(null);

  const handleChageInValue = (event: any) => {
    const { value, name } = event.target;
    setDataForPersonalDetails({
      ...dataForPersonalDetails,
      [name]: value
    })
    objForPersonalDataOfIndividuals[name] = value;
  }

  const handleClick = async() => {
    try {
      await PersonalDataVarificationForIndividuals(dataForPersonalDetails);
      let Schema = SchemaForIndividualsObj(dataForPersonalDetails);
      setObjForSignInComonent(Schema);
      handleNext();
    } catch (error: any) {
      setErrorMessage(error)
    }
  }
  return (
    <div className='mx-2 my-5 '>
      <div className="  pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
        {errorMessage && <p className=' my-5 border border-red-700 rounded-xl p-1 bg-red-600 block mx-auto text-white w-1/2'>{errorMessage}</p>}

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                onChange={handleChageInValue}
                value={dataForPersonalDetails['first-name']}
                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                value={dataForPersonalDetails['last-name']}
                onChange={handleChageInValue}
                autoComplete="family-name"
                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
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

          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </label>
            <div className="mt-2">
              <input
                id="phone-number"
                name="phone"
                type="text"
                value={dataForPersonalDetails.phone}
                autoComplete="phone"
                onChange={handleChageInValue}
                className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              House Number/Office Number
            </label>
            <div className="mt-2">
              <input
                id="house-number"
                name="house-number"
                type="number"
                value={dataForPersonalDetails["house-number"]}
                autoComplete="house-number"
                onChange={handleChageInValue}
                className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}



          {/* <div className="col-span-full">
            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
              Street address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="street"
                id="street-address"
                value={dataForPersonalDetails.street}
                onChange={handleChageInValue}
                autoComplete="street-address"
                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}

          <div className="sm:col-span-4">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              Country
            </label>
            <div className="mt-2">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                onChange={handleChageInValue}
                // className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                required
                value={dataForPersonalDetails.country}
              >
                <option value={''} >{'Country'}</option>
                <option value={'India'}>India</option>
                <option value={'Canada'}>Canada</option>
                <option value={'Mexico'}>Mexico</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
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

          <div className="sm:col-span-2">
            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
              State / Province
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="State"
                id="State"
                value={dataForPersonalDetails.State}
                onChange={handleChageInValue}
                autoComplete="address-level1"
                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
              ZIP / Postal code
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="ZIP"
                id="postal-code"
                autoComplete="postal-code"
                value={dataForPersonalDetails.ZIP}
                onChange={handleChageInValue}
                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <button type='button' className='p-3 w-28 border my-5' onClick={handleClick}>Next Inside</button> */}
      <Button
        variant='contained'
        color='primary'
        className='my-10'
        onClick={handleClick}
      >
        Next</Button>
    </div>
  )
}

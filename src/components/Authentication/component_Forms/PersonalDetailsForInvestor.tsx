import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { PersonalDataVarificationForInvestor } from '../../../Verification/PersonalDataVarification'
import { objForPersonalDataOfInvestor  } from '../../../utils/factory/ObjForFormData';
import { SchemaForInvestorObj } from '../../../utils/factory/ObjForSchema';
import {TypeForInvestorData} from '../../../utils/type'

type propsType = {
    handleNext: Function
    setObjForSignInComonent: React.Dispatch<React.SetStateAction<Object>>
}



export default function PersonalDetailsForInvestor({ handleNext, setObjForSignInComonent }: propsType) {


    const [dataForPersonalDetails, setDataForPersonalDetails] = useState<TypeForInvestorData>(objForPersonalDataOfInvestor )

    const [errorMessage, setErrorMessage] = useState<String | null>(null);


    const handleChageInValue = (event: any) => {
        const { value, name } = event.target;
        setDataForPersonalDetails({
            ...dataForPersonalDetails,
            [name]: value
        })
        objForPersonalDataOfInvestor [name] = value;

    }
    const handleClick = async () => {
        try {
            await PersonalDataVarificationForInvestor(dataForPersonalDetails);
            let Schema = SchemaForInvestorObj(dataForPersonalDetails)
            setObjForSignInComonent(Schema)
            handleNext();
        } catch (error: any) {
            setErrorMessage(error)
        }
    }
    useEffect(() => {
        setDataForPersonalDetails(objForPersonalDataOfInvestor )
    }, [])

    return (
        <div className='mx-2 my-5'>
            <div className="  pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                {errorMessage && <p className=' my-5 border border-red-700 rounded-xl p-1 bg-red-600 block mx-auto text-white w-1/2'>{errorMessage}</p>}

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-5 md:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                            First Name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="first-name"
                                onChange={handleChageInValue}
                                value={dataForPersonalDetails["first-name"]}
                                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>


                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-5 md:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Last Name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="last-name"
                                onChange={handleChageInValue}
                                value={dataForPersonalDetails["last-name"]}
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


                    <div className="col-span-5 md:col-span-3">
                        <label htmlFor="categories" className="block text-sm font-medium leading-6 text-gray-900">
                            Categories (Type of Firm)
                        </label>
                        <div className="mt-2">
                            <select
                                id="categories"
                                name="categories"
                                autoComplete="categories"
                                onChange={handleChageInValue}
                                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                required
                                value={dataForPersonalDetails.categories}
                            >
                                <option value={''}>{'None'}</option>
                                <option value={'Angel Investor'} >{'Angel Investor'}</option>
                                <option value={'HNWI'}>{'High-Net-Worth Individual '}</option>

                            </select>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            If You are Looking for VC or group category Please select Capital Firm option instead .
                        </p>
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
                                value={dataForPersonalDetails.country}
                            >
                                <option value={''} >{'None'}</option>
                                <option value={'India'} >{'India'}</option>
                                <option value={'Canada'}>{'Canada'}</option>
                                <option value={'USA'} >{'USA'}</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-span-5 md:col-span-3 sm:col-start-1">
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

import React, { useEffect } from 'react'
import { useState } from "react"
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import Loading from '../../../../Assets/Loading';
import { ArrayForSuggestedPepole, findTaggedPepoleLocaly, generateSchemaForSuggestion } from '../../../../utils/factory/SuggestedUser'
import axios from 'axios';
import { Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

type TypeForInvestorProfile = {
    name: string,
    type: string,
    profileImage: string,
    username: string,
    _id: string
}

type TypeForInvestments = {
    dateofInvestment: string,
    typeOfInvestment: string,
    leadInvestors: Array<TypeForInvestorProfile>,
    raisedAmount: number,
    allInvestor: Array<TypeForInvestorProfile>,
    lastValuation: number,
    milestones?: string,
    growth?: string
}

type TypeForError = {
    dateofInvestment: string,
    typeOfInvestment: string,
    leadInvestors: string,
    raisedAmount: string,
    allInvestor: string,
    lastValuation: string,
}

type propsType = {
    handleNext: Function
    setObjForNewInvestment: React.Dispatch<React.SetStateAction<TypeForInvestments>>
    objForNewInvestment: TypeForInvestments
}

export default function QueForFundigRoundDetails({ handleNext, setObjForNewInvestment, objForNewInvestment }: propsType) {

    const [errorMessage, setErrorMessage] = useState<TypeForError>({
        dateofInvestment: '',
        typeOfInvestment: '',
        leadInvestors: '',
        raisedAmount: '',
        allInvestor: '',
        lastValuation: '',
    });


    const [profileForLeadInvestor, setprofileForLeadInvestor] = useState<Array<TypeForInvestorProfile> | null>(null);
    const [profileForAllInvestor, setprofileForAllInvestor] = useState<Array<TypeForInvestorProfile> | null>(null);


    const [suggestionMenuForTag, setSuggestionMenuForaTag] = useState<boolean>(false);



    let debounceTimeOut: undefined | NodeJS.Timeout;

    const handleChageInValue = (event: any) => {
        let { name, value } = event.target;
        if (name === 'lastValuation' && name === 'raisedAmount') {
            setObjForNewInvestment({
                ...objForNewInvestment,
                [name]: parseInt(value, 10)
            })
        } else {
            setObjForNewInvestment({
                ...objForNewInvestment,
                [name]: value
            })
        }

        if (name === 'dateofInvestment' && value && errorMessage.dateofInvestment) {
            setErrorMessage({
                ...errorMessage,
                dateofInvestment: ''
            })
        }
        if (name === 'typeOfInvestment' && value && errorMessage.typeOfInvestment) {
            console.log("value", value)
            setErrorMessage({
                ...errorMessage,
                typeOfInvestment: ''
            })
        }
        if (name === 'raisedAmount' && value && errorMessage.raisedAmount) {
            setErrorMessage({
                ...errorMessage,
                raisedAmount: ''
            })
        }
        if (name === 'lastValuation' && value && errorMessage.lastValuation) {
            setErrorMessage({
                ...errorMessage,
                lastValuation: ''
            })
        }
        if (objForNewInvestment.leadInvestors.length !== 0 && errorMessage.leadInvestors && name === 'leadInvestors') {
            setErrorMessage({
                ...errorMessage,
                leadInvestors: ''
            })
        }
        if (objForNewInvestment.allInvestor.length !== 0 && errorMessage.allInvestor && name === 'allInvestor') {
            setErrorMessage({
                ...errorMessage,
                allInvestor: ''
            })
        }
    }

    const VerificationForFeilds = (): boolean => {
        let error = true;
        if (!objForNewInvestment.dateofInvestment) {
            setErrorMessage({
                ...errorMessage,
                dateofInvestment: 'Please Enter Valid Date'
            })
        }
        else if (!objForNewInvestment.typeOfInvestment) {
            setErrorMessage({
                ...errorMessage,
                typeOfInvestment: 'Please Slect any type for Investment Process'
            })
        }
        else if (!objForNewInvestment.raisedAmount) {
            setErrorMessage({
                ...errorMessage,
                raisedAmount: 'Enter Valid Value of Raised Fund'
            })
        }
        else if (!objForNewInvestment.lastValuation) {
            setErrorMessage({
                ...errorMessage,
                lastValuation: 'Enter Valid Value of Last Raised Fund'
            })
        } else if (objForNewInvestment.leadInvestors.length === 0) {
            setErrorMessage({
                ...errorMessage,
                leadInvestors: 'Please Select At Least One Investor to continue.'
            })
        } else if (objForNewInvestment.allInvestor.length === 0) {
            setErrorMessage({
                ...errorMessage,
                allInvestor: 'Please Select At Least One Lead Investor.'
            })
        } else {
            console.log("No Error")
            error = false;
        }

        return error;
    }

    const handleClickForNext = () => {

        if (!VerificationForFeilds()) {
            handleNext();
        }
    }

    const handleChageForTagPeople = async (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        try {
            const { value } = event.target;
            const atChar = value.split(' ');
            const regex = /@\w+/g;
            let user = atChar[atChar.length - 1];
            if (atChar[atChar.length - 1] && atChar[atChar.length - 1].match(regex)) {
                if (!suggestionMenuForTag) {
                    document.getElementById(id)?.classList.remove('hidden');
                    setSuggestionMenuForaTag(true)
                }
                //const arrayofSuggestions = findTaggedPepoleLocaly(user);
                if (debounceTimeOut) {
                    clearTimeout(debounceTimeOut);
                }
                debounceTimeOut = setTimeout(async () => {
                    const array: any = await fetchPepole(user);
                    const schema = generateSchemaForSuggestion(array.data.profiles);
                    if (id === 'suggestion-modal-for-all') {
                        setprofileForAllInvestor(schema);
                    } else {
                        setprofileForLeadInvestor(schema);
                    }

                }, 1000)
            } else {
                if (suggestionMenuForTag) {
                    document.getElementById(id)?.classList.add('hidden');
                    setSuggestionMenuForaTag(false)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPepole = (user: String) => {
        return new Promise(async (resolve, reject) => {
            try {
                const array = await axios.get(`/profile/tag?find=${user}`);
                console.log("array", array)
                resolve(array)
            } catch (error: any) {
                console.log("error", error)
                reject(error.message)
            }
        })
    }

    const addAsLeadInvestor = (objForUser: TypeForInvestorProfile, type: 'leadInvestors' | 'allInvestor') => {
        let newArray = objForNewInvestment[type];
        newArray.push(objForUser);
        setObjForNewInvestment({
            ...objForNewInvestment,
            [type]: newArray,
        })
        if (objForNewInvestment.leadInvestors.length !== 0 && errorMessage.leadInvestors) {
            setErrorMessage({
                ...errorMessage,
                leadInvestors: ''
            })
        }
        if (objForNewInvestment.allInvestor.length !== 0 && errorMessage.allInvestor) {
            setErrorMessage({
                ...errorMessage,
                allInvestor: ''
            })
        }
    }

    const removeUser = (index: number, type: 'leadInvestors' | 'allInvestor') => {
        let newArray = objForNewInvestment[type];
        newArray.splice(index, 1);
        setObjForNewInvestment({
            ...objForNewInvestment,
            [type]: newArray
        })
    }

    useEffect(() => {

    })

    return (
        <main className='md:w-4/5 w-full  mx-auto'>
            <div className='p-4 border rounded-2xl'>
                <h2 className="text-center  text-lg font-semibold leading-7 text-gray-900">Funding Round Details & Investor Information </h2>
                <p className="mt-1 text-sm text-center leading-6 text-gray-600">Please Share correct information . </p>
                {/* {errorMessage && <p className=' my-5 border border-red-700 rounded-xl p-1 bg-red-600 block mx-auto text-white w-1/2'>{errorMessage}</p>} */}

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-5 md:col-span-3">
                        <label htmlFor="date" className="block font-medium leading-6 text-gray-900">
                            Can you provide the date of your most recent funding round ?
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="dateofInvestment"
                                id="dateofInvestment"
                                autoComplete="date"
                                onChange={handleChageInValue}
                                value={objForNewInvestment.dateofInvestment}
                                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {errorMessage.dateofInvestment && <p id='date_id' className='block mx-auto text-red-600 w-full'>{errorMessage.dateofInvestment}</p>}

                    </div>

                    <div className="col-span-5 md:col-span-3">
                        <label htmlFor="fundingType" className="block  font-medium leading-6 text-gray-900">
                            What was the type of funding round ?
                        </label>
                        <div className="mt-2">
                            <select
                                id="typeOfInvestment"
                                name="typeOfInvestment"
                                autoComplete="fundingType"
                                onChange={handleChageInValue}
                                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={objForNewInvestment.typeOfInvestment}
                            >
                                <option value={''}>{'None'}</option>
                                <option value={'preseed'} >{'Pre-Seed'}</option>
                                <option value={'seed'} >{'Seed'}</option>
                                <option value={'series A'} >{'Series A'}</option>
                                <option value={'series B'} >{'Series B'}</option>
                                <option value={'series C'} >{'Series C'}</option>

                            </select>
                            {errorMessage.typeOfInvestment && <p id='fundingType_id' className='block mx-auto text-red-600 w-full'>{errorMessage.typeOfInvestment}</p>}

                        </div>
                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                            If You are <b>Angel Investor</b> or <b>High-Net-Worth Individual</b> Please select Individual User option instead .
                        </p> */}
                    </div>

                    <div className="relative col-span-full">
                        <label htmlFor="leadInvestor" className="block font-medium leading-6 text-gray-900">
                            Who were the lead investors in the last funding round?
                        </label>
                        <div className="mt-2 relative">
                            <input
                                id="leadInvestor"
                                name="leadInvestor"
                                // value={dataForFundingRound.leadInvestors}
                                placeholder='Write a Username or Name following with @'
                                onChange={(e) => handleChageForTagPeople(e, 'suggestion-modal-for-lead')}
                                className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Type the name of Investor after '@' to tag a perosn or company'.
                            </p>
                            {errorMessage.leadInvestors && <p id='leadInvestor_id' className='block mx-auto text-red-600 w-full'>{errorMessage.leadInvestors}</p>}
                            {objForNewInvestment.leadInvestors.length > 0 &&
                                (<div className='w-full flex flex-row gap-4'>
                                    {objForNewInvestment.leadInvestors.map((item, index) => {
                                        return (
                                            <div className="flex w-fit p-1 border rounded-xl bg-slate-200">
                                                <Avatar alt="Remy Sharp"
                                                    src={item.profileImage}
                                                    sx={{ width: 40, height: 40 }}
                                                    className='my-1 mx-2'
                                                />
                                                <div className="min-w-0 flex-grow">
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.username}</p>
                                                </div>
                                                {/* <div className="hidden sm:flex sm:flex-col sm:items-end"> */}

                                                <div className="ml-2">
                                                    <IconButton
                                                        aria-label="upload picture"
                                                        component="span"
                                                        className="h-12 w-12 cursor-pointer bg-black border my-auto"
                                                        style={{ color: 'black' }}
                                                        onClick={() => removeUser(index, 'leadInvestors')}
                                                    >
                                                        <CloseIcon />
                                                    </IconButton>
                                                </div>
                                                {/* </div> */}
                                            </div>
                                        )
                                    })}
                                </div>)}
                            <div className="absolute top-full left-0 mt-2 w-full h-[250px] overflow-auto border border-gray-300 bg-white rounded-lg shadow-lg z-10 hidden" id='suggestion-modal-for-lead'>
                                {profileForLeadInvestor && (<ul className="divide-y divide-gray-100 rounded-lg bg-white">
                                    {profileForLeadInvestor?.map((item: TypeForInvestorProfile, index) => {
                                        return (
                                            <li key={index} className="flex justify-between gap-x-6 cursor-pointer" onClick={() => addAsLeadInvestor(item, 'leadInvestors')}>
                                                <div className="flex gap-x-4 w-full p-3">
                                                    <Avatar alt="Remy Sharp"
                                                        src={item.profileImage}
                                                        sx={{ width: 40, height: 40 }}
                                                        className='my-2 mx-2'
                                                    />
                                                    <div className="min-w-0 flex-grow">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.username}</p>
                                                    </div>
                                                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                        <div className="mt-1 flex items-center gap-x-1.5">
                                                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                            </div>
                                                            <p className="text-lg leading-6 text-gray-900">{
                                                                item.type === 'individual' ? 'User' :
                                                                    item.type === 'CF' ? 'Firm' :
                                                                        item.type === 'product' ? 'Company' : 'User'
                                                            }</p>
                                                            {/* <p className="text-xs leading-5 text-gray-500">{item.type}</p> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                    }
                                </ul>)}
                                {
                                    profileForLeadInvestor === null && <Loading />
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-span-5 md:col-span-full">
                        <label htmlFor="headquarters" className="block  font-medium leading-6 text-gray-900">
                            Can you specify the total amount raised in that funding round ?
                        </label>
                        <div className="mt-2">
                            <TextField
                                label="$"
                                type='number'
                                name="raisedAmount"
                                id="raisedAmount"
                                onChange={handleChageInValue}
                                variant="outlined"
                                sx={{ width: '50%' }}
                                value={objForNewInvestment.raisedAmount}
                            />
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                               Amount You entered will be count in form of US Dollar <b>$</b> .
                            </p>
                            {errorMessage.raisedAmount && <p id='raisedAmount_id' className='block mx-auto text-red-600 w-full'>{errorMessage.raisedAmount}</p>}

                        </div>
                    </div>

                    <div className="relative col-span-full">
                        <label htmlFor="leadInvestor" className="block font-medium leading-6 text-gray-900">
                            Can you list the names of all investors who participated in the last funding round ?
                        </label>
                        <div className="mt-2 relative">
                            <input
                                id="allInvestor"
                                name="allInvestor"
                                placeholder='Write a Username or Name following with @'
                                onChange={(e) => handleChageForTagPeople(e, 'suggestion-modal-for-all')}
                                className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Type the name of Investor after '@' to tag a perosn or company'.
                            </p>
                            {errorMessage.allInvestor && <p id='allInvestor_id' className='block mx-auto text-red-600 w-full'>{errorMessage.allInvestor}</p>}
                            {objForNewInvestment.allInvestor.length > 0 &&
                                (<div className='w-full flex flex-row gap-4'>
                                    {objForNewInvestment.allInvestor.map((item, index) => {
                                        return (
                                            <div className="flex w-fit p-1 border rounded-xl bg-slate-200">
                                                <Avatar alt="Remy Sharp"
                                                    src={item.profileImage}
                                                    sx={{ width: 40, height: 40 }}
                                                    className='my-1 mx-2'
                                                />
                                                <div className="min-w-0 flex-grow">
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.username}</p>
                                                </div>
                                                <div className="hidden sm:flex sm:flex-col sm:items-end">

                                                    <div className="ml-2">
                                                        <IconButton
                                                            aria-label="upload picture"
                                                            component="span"
                                                            className="h-12 w-12 cursor-pointer bg-black border my-auto"
                                                            style={{ color: 'black' }}
                                                            onClick={() => removeUser(index, 'allInvestor')}
                                                        >
                                                            <CloseIcon />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>)}
                            <div className="absolute top-full left-0 mt-2 w-full h-[250px] overflow-auto border border-gray-300 bg-white rounded-lg shadow-lg z-10 hidden" id='suggestion-modal-for-all'>
                                {profileForAllInvestor && (<ul className="divide-y divide-gray-100 rounded-lg bg-white">
                                    {profileForAllInvestor?.map((item: TypeForInvestorProfile, index) => {
                                        return (
                                            <li key={index} className="flex justify-between gap-x-6 cursor-pointer"
                                                onClick={() => addAsLeadInvestor(item, 'allInvestor')}>
                                                <div className="flex gap-x-4 w-full p-3">
                                                    <Avatar alt="Remy Sharp"
                                                        src={item.profileImage}
                                                        sx={{ width: 40, height: 40 }}
                                                        className='my-2 mx-2'
                                                    />
                                                    <div className="min-w-0 flex-grow">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.username}</p>
                                                    </div>
                                                    <div className="hidden sm:flex sm:flex-col sm:items-end">

                                                        <div className="mt-1 flex items-center gap-x-1.5">
                                                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                            </div>
                                                            <p className="text-lg leading-6 text-gray-900">{
                                                                item.type === 'individual' ? 'User' :
                                                                    item.type === 'CF' ? 'Firm' :
                                                                        item.type === 'product' ? 'Company' : 'User'
                                                            }</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                    }
                                </ul>)}
                                {
                                    profileForLeadInvestor === null && <Loading />
                                }
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-span-5 md:col-span-4">
                        <label htmlFor="mainInvestor" className="block font-medium leading-6 text-gray-900">
                            Can you list the names of all investors who participated in the last funding round ?
                        </label>
                        <div className="mt-2">
                            <input
                                type="mainInvestor"
                                name="mainInvestor"
                                id="mainInvestor"
                                // value={dataForFundingRound.mainInvestor}
                                onChange={handleChageInValue}
                                autoComplete="mainInvestor"
                                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errorMessage.allInvestor && <p id='mainInvestor_id' className='block mx-auto text-red-600 w-full'>{errorMessage.allInvestor}</p>}

                        </div>
                    </div> */}
                    <div className="col-span-5 md:col-span-4">
                        <label htmlFor="lastValuation" className="block font-medium leading-6 text-gray-900">
                            What was the valuation of your startup at the time of the last funding round ?
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                name="lastValuation"
                                id="lastValuation"
                                value={objForNewInvestment.lastValuation}
                                onChange={handleChageInValue}
                                autoComplete="lastValuation"
                                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errorMessage.lastValuation && <p className='block mx-auto text-red-600 w-full'>{errorMessage.lastValuation}</p>}

                        </div>
                    </div>
                </div>
            </div>
            <div className='border w-fit my-4 mx-auto'>
                <Button
                    variant='contained'
                    color='primary'
                    // sx={{ margin: 'auto auto' }}
                    onClick={handleClickForNext}
                >
                    Next
                </Button>
            </div>
        </main>
    )
}


// Section 7 is for Desire Investor 
import React, { SetStateAction, useEffect, useState , useContext} from 'react'
import { Button } from '@mui/material'
import { TypeForFAQs, TypeForDetailsAboutBusiness } from '../../../../utils/type'
import axios from '../../../../../axios.config'
import Loading from '../../../../Assets/Loading'
import { generateSchemaForSuggestion } from '../../../../utils/factory/SuggestedUser';
import { Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import {Backdrop} from '@mui/material'
import {CircularProgress} from '@mui/material'
import { ContextForDashBord } from '../../../../context/contextForDashBord'

type Props = {
    handleNext: Function
    objForAllQnA: TypeForFAQs,
    setObjForAllQnA: React.Dispatch<SetStateAction<TypeForFAQs>>
    objForDetailsAboutBusiness: TypeForDetailsAboutBusiness
    setObjForDetailsAboutBusiness: React.Dispatch<SetStateAction<TypeForDetailsAboutBusiness>>
    arryForDesireInvestor: Array<any>,
    setArrayForDesireInvestor: React.Dispatch<SetStateAction<Array<any>>>
    setDrawerOpen: React.Dispatch<SetStateAction<boolean>>
}

type TypeForInvestorProfile = {
    name: string,
    type: string,
    profileImage: string,
    username: string,
    _id: string
}

type TypeForError = {
    desireInvestor: string,
}

export default function QueForPitchSection7({ setDrawerOpen, arryForDesireInvestor, setArrayForDesireInvestor, objForDetailsAboutBusiness, objForAllQnA }: Props) {

    let debounceTimeOut: undefined | NodeJS.Timeout;

    const [suggestionMenuForTag, setSuggestionMenuForaTag] = useState<boolean>(false);

    const [profileForInvestor, setProfileForInvestor] = useState<Array<TypeForInvestorProfile>>([]);

    const [fetchedInvestors, setFetchInvestors] = useState<Array<TypeForInvestorProfile> | null>(null);

    const [errorMessage, setErrorMessage] = useState<TypeForError>({
        desireInvestor: '',
    })

    const contextForDashBord = useContext(ContextForDashBord)

    const [openDrop , setOpenDrop] = useState<boolean>(false)

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
                    setFetchInvestors(schema);
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
                const array = await axios.get(`${import.meta.env.VITE_APP_API_URL}/profile/tag?find=${user}`);
                console.log("array", array)
                resolve(array)
            } catch (error: any) {
                console.log("error", error)
                reject(error.message)
            }
        })
    }

    const removeUser = (index: number) => {
        let newArray = profileForInvestor;
        newArray.splice(index, 1);
        setProfileForInvestor(newArray);
    }

    const addAsLeadInvestor = (objForUser: TypeForInvestorProfile) => {
        let newArray = [];
        newArray = [...profileForInvestor];
        newArray.push(objForUser);
        setProfileForInvestor(newArray)
    }

    const handleUpload = async () => {
        const localnameElm = document.getElementById('localname') as HTMLInputElement
        profileForInvestor && setArrayForDesireInvestor(profileForInvestor);
        setOpenDrop(true);
        const ObjToSend = {
            localname : localnameElm.value,
            additionalDetails: { ...objForDetailsAboutBusiness },
            faqs: { ...objForAllQnA },
            desireInvestor: [...profileForInvestor]
        }

        console.log("ObjToSend", ObjToSend)
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}product/create/pitch`, ObjToSend);
            console.log("res", res);
            setDrawerOpen(false);
            contextForDashBord.MYPITCHES.push(res.data.result)
        } catch (error) {
            setDrawerOpen(false);
            console.log("error", error);
        }
    }

    useEffect(() => {
        setProfileForInvestor(arryForDesireInvestor)
    }, [])
    return (
        <main className='w-4/5 mx-auto'>
            <div className='p-4 rounded-2xl'>
                <h2 className="text-center  text-lg font-semibold leading-7 text-gray-900">{'Desire Investor'}</h2>
                <p className="mt-1 text-sm text-center leading-6 text-gray-600">Answer this question will help us to create a news article about your .Plase share the correct details. And might help in increase your Rank.</p>
                <Backdrop
                    sx={{ color: 'blue', zIndex: (theme : any) => theme.zIndex.drawer + 1 }}
                    open={openDrop}
                >
                    <div className='flex flex-row justify-center items-center h-full border border-red-800 w-full'>
                        <CircularProgress color="inherit" />
                        <span className='mx-3 my-auto'>{'Creating.......'}</span>
                    </div>
                </Backdrop>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:w-4/5 md:p-3">
                    <div className="col-span-5">
                        <label htmlFor="targetAudiences" className="block font-medium leading-6 text-gray-900">
                            Who are your target audiences or customer segments, and how do you plan to reach and engage them effectively?
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
                            {errorMessage.desireInvestor && <p id='leadInvestor_id' className='block mx-auto text-red-600 w-full'>{errorMessage.desireInvestor}</p>}
                            {profileForInvestor.length > 0 &&
                                (<div className='w-full flex md:flex-row flex-col gap-4'>
                                    {profileForInvestor.map((item, index) => {
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
                                                        onClick={() => removeUser(index)}
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
                                {fetchedInvestors && (<ul className="divide-y divide-gray-100 rounded-lg bg-white">
                                    {fetchedInvestors?.map((item: TypeForInvestorProfile, index) => {
                                        return (
                                            <li key={index} className="flex justify-between gap-x-6 cursor-pointer" onClick={() => addAsLeadInvestor(item)}>
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
                                    fetchedInvestors === null && <Loading />
                                }
                            </div>
                        </div>
                        {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
                    </div>
                    <div className="col-span-5">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900">
                            Give this Pitch a name to Identify .
                        </label>
                        <div className="mt-2">
                            <input
                                name='localname'
                                id='localname'
                                // onChange={(e) => handleInputChange(e, 0)}
                                // value={originalText.q1}
                                className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
                    </div>            
                </div>
            </div>
            <div className='border w-fit my-4 mx-auto'>
                <Button
                    variant='contained'
                    color='primary'
                    sx={{ margin: 'auto auto' }}
                    onClick={() => handleUpload()}
                >
                    Upload</Button>
            </div>
        </main>
    )
}

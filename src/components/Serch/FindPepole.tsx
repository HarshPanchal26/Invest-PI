import React, { SetStateAction, useEffect } from 'react';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import { generateSchemaForSuggestion } from '../../utils/factory/SuggestedUser';
import axios from 'axios';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Loading from '../../Assets/Loading';

type TypeForInvestorProfile = {
    name: string,
    type: string,
    profileImage: string,
    username: string,
    _id: string
}

type TypeForError = {
    error: string,
}

type Props = {
    question: string
    State: Array<any>
    limit: number
    setState: React.Dispatch<SetStateAction<Array<any>>>
}

export default function FindPepole({ question, setState, State, limit }: Props) {


    let debounceTimeOut: undefined | NodeJS.Timeout;

    const [suggestionMenuForTag, setSuggestionMenuForaTag] = useState<boolean>(false);

    const [fetchedInvestors, setFetchInvestors] = useState<Array<TypeForInvestorProfile> | null>(null);

    const [errorMessage, setErrorMessage] = useState<TypeForError>({
        error: '',
    })

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

    const removeUser = (index: number) => {
        let newArray = State;
        newArray.splice(index, 1);
        console.log("newArray" , newArray)
        setState(newArray);
    }

    const addAsLeadInvestor = (objForUser: TypeForInvestorProfile) => {
        if (limit > State.length) {
            let newArray = [];
            newArray = [...State];
            newArray.push(objForUser);
            document.getElementById('suggestion-modal-for-lead')?.classList.add('hidden');
            setState(newArray)

        } else {
            document.getElementById('suggestion-modal-for-lead')?.classList.add('hidden');
            setErrorMessage({
                ...errorMessage,
                error: `You Can only select upto ${limit} Profile`
            })
        }
        let findPepleInput = document.getElementById('findPeple') as HTMLInputElement;
        findPepleInput.value = '@'
    }


    const handleChageForTagPeople = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const { value } = event.target;
            const atChar = value.split(' ');
            const regex = /@\w+/g;
            let user = atChar[atChar.length - 1];
            if (atChar[atChar.length - 1] && atChar[atChar.length - 1].match(regex)) {
                document.getElementById('suggestion-modal-for-lead')?.classList.remove('hidden');
                setSuggestionMenuForaTag(true)
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
                    document.getElementById('suggestion-modal-for-lead')?.classList.add('hidden');
                    setSuggestionMenuForaTag(false)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
    }, [State])
    console.log("newArray" , State)     
    
    return (
        // <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:w-4/5 md:p-3">
        <div className="mt-10 w-full">
            <div className="col-span-5">
                <label htmlFor="targetAudiences" className="block font-medium leading-6 text-gray-900">
                    {question}
                </label>
                <div className="mt-2 relative">
                    <input
                        id="findPeple"
                        name="findPeple"
                        placeholder='Write a Username or Name following with @'
                        onChange={handleChageForTagPeople}
                        className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Type the name of Investor after '@' to tag a perosn or company'.
                    </p>
                    {errorMessage.error && <p id='leadInvestor_id' className='block mx-auto text-red-600 w-full'>{errorMessage.error}</p>}
                    {State.length > 0 &&
                        (<div className='w-full flex md:flex-row flex-col gap-4'>
                            {State.map((item, index) => {
                                console.log("item" , item)
                                return (
                                    <div className="flex w-fit p-1 border rounded-xl bg-slate-200">
                                        <Avatar alt="Remy Sharp"
                                            src={item.profileImage}
                                            sx={{ width: 40, height: 40 }}
                                            className='my-1 mx-2' />
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
                                );
                            })}
                        </div>)
                    }
                    <div className="absolute top-full left-0 mt-2 w-full h-[250px] overflow-auto border border-gray-300 bg-white rounded-lg shadow-lg z-10 hidden" id='suggestion-modal-for-lead'>
                        {fetchedInvestors && (<ul className="divide-y divide-gray-100 rounded-lg bg-white">
                            {fetchedInvestors?.map((item: TypeForInvestorProfile, index) => {
                                return (
                                    <li key={index} className="flex justify-between gap-x-6 cursor-pointer" onClick={() => addAsLeadInvestor(item)}>
                                        <div className="flex gap-x-4 w-full p-3">
                                            <Avatar alt="Remy Sharp"
                                                src={item.profileImage}
                                                sx={{ width: 40, height: 40 }}
                                                className='my-2 mx-2' />
                                            <div className="min-w-0 flex-grow">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.username}</p>
                                            </div>
                                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                <div className="mt-1 flex items-center gap-x-1.5">
                                                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                    </div>
                                                    <p className="text-lg leading-6 text-gray-900">{item.type === 'individual' ? 'User' :
                                                        item.type === 'CF' ? 'Firm' :
                                                            item.type === 'product' ? 'Company' : 'User'}</p>
                                                    {/* <p className="text-xs leading-5 text-gray-500">{item.type}</p> */}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>)}
                        {fetchedInvestors === null && <Loading />}
                    </div>
                </div>
                {/* {errorMessage.error && <p className='block mx-auto text-red-600 w-full'>{errorMessage.error}</p>} */}
            </div>

        </div>
    );
}

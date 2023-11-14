import React from 'react'
import { useState } from "react"
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../../../Assets/Loading';

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

type propsType = {
    handleNext: Function
    objForNewInvestment: TypeForInvestments
    setObjForNewInvestment: React.Dispatch<React.SetStateAction<TypeForInvestments>>
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
    dataForInvestments: Array<any> | null,
    setDataForInvestments: React.Dispatch<React.SetStateAction<Array<any> | null>>,
}

type TypeForError = {
    milestones?: string,
    growth?: string,
    otherError?: string
}

export default function QuestionForUseofFunds({ setDrawerOpen, setObjForNewInvestment, objForNewInvestment, dataForInvestments, setDataForInvestments }: propsType) {

    const [errorMessage, setErrorMessage] = useState<TypeForError>({
        milestones: '',
        growth: '',
        otherError: ''
    });

    const [loader, setLoader] = useState<boolean>(false);

    const navigation = useNavigate();

    const validationForFeilds = () => {
        let error = true;
        let milestonesElem = document.getElementById('milestones_id') as HTMLInputElement;
        let growthElem = document.getElementById('growth_id') as HTMLInputElement;

        if (!milestonesElem.value || !(milestonesElem.value.length > 10)) {
            setErrorMessage({
                ...errorMessage,
                milestones: 'Please write about your milestones in range of 200-250 Words'
            })
        } else if (!growthElem.value || !(growthElem.value.length > 10)) {
            setErrorMessage({
                ...errorMessage,
                growth: 'Please write about your Growth in range of 200-250 Words'
            })
        } else {
            error = false;
        }
        return error;
    }

    const handleClickForEnterNewInvestments = async () => {
        if (errorMessage.otherError) {
            setErrorMessage({
                ...errorMessage,
                otherError: ''
            })
        }
        if (!validationForFeilds()) {
            setLoader(true);
            let milestonesElem = document.getElementById('milestones_id') as HTMLInputElement;
            let growthElem = document.getElementById('growth_id') as HTMLInputElement;

            setObjForNewInvestment({
                ...objForNewInvestment,
                growth: growthElem.value,
                milestones: milestonesElem.value
            });

            let Obj = {
                investmentData: objForNewInvestment,
                extarData: { growth: growthElem.value, milestones: milestonesElem.value }
            }
            try {
                await axios.post(`${import.meta.env.VITE_APP_API_URL}investments/new`, Obj)
                if (dataForInvestments) {
                    let newArray = [...dataForInvestments];
                    newArray.push(objForNewInvestment)
                    setDataForInvestments(newArray)
                }
                setLoader(false);
                setDrawerOpen(false);
            } catch (error: any) {
                console.log("Error is ", error)
                setLoader(false);
                setErrorMessage({
                    ...errorMessage,
                    otherError: error.response.data.message
                })
            }
        }
    }

    const handleChageInValue = (event: any) => {
        let { name, value } = event.target;
        if (name === 'milestones' && value?.length > 10 && errorMessage.milestones) {
            setErrorMessage({
                ...errorMessage,
                milestones: ''
            })
        }
        if (name === 'growth' && value?.length > 10 && errorMessage.growth) {
            console.log("Yes It i valid")
            setErrorMessage({
                ...errorMessage,
                growth: ''
            })
        }
    }

    return (
        <>
            {errorMessage.otherError && <p className='block text-lg text-red-600 w-full text-center my-4'>{errorMessage.otherError}</p>}
            <main className='md:w-4/5 w-full  mx-auto'>
                {!loader && (<>
                    <div className='p-4 border rounded-2xl'>
                        <h2 className="text-center  text-lg font-semibold leading-7 text-gray-900">Future Goals & Use of Funds</h2>
                        <p className="mt-1 text-sm text-center leading-6 text-gray-600">Answer this question will help us to create a news article about your fundding . Plase share the correct details.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:mx-auto md:w-4/5 md:p-3">
                            <div className="col-span-5">
                                <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900">
                                    Can you describe the key milestones or achievements you targeted with this funding ?
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="milestones_id"
                                        name="milestones"
                                        defaultValue={objForNewInvestment.milestones}
                                        autoComplete="milestones"
                                        onChange={handleChageInValue}
                                        className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>}

                            </div>

                            <div className="col-span-5 ">
                                <label htmlFor="growth" className="block font-medium leading-6 text-gray-900">
                                    Have you seen any significant growth or progress since the funding round ?
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        name="growth"
                                        id="growth_id"
                                        defaultValue={objForNewInvestment.growth}
                                        onChange={handleChageInValue}
                                        autoComplete="growth"
                                        className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errorMessage.growth && <p className='block mx-auto text-red-600 w-full'>{errorMessage.growth}</p>}

                            </div>
                        </div>
                    </div>
                    <div className='border w-fit my-4 mx-auto'>
                        <Button
                            variant='contained'
                            color='primary'
                            sx={{ margin: 'auto auto' }}
                            onClick={handleClickForEnterNewInvestments}
                        >
                            Upadte</Button>
                    </div>
                </>)}
                {loader && (<Loading />)}
            </main>
        </>
    )
}



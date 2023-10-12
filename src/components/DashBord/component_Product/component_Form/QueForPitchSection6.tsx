// Question for :
import React, { SetStateAction, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { TypeForFAQs, TypeForQueAns, TypeForDetailsAboutBusiness } from '../../../../utils/type'
import { convertText } from '../../../../utils/factory/FormatText'
import axios from 'axios'

type Props = {
    handleNext: Function
    objForAllQnA: TypeForFAQs,
    setObjForAllQnA: React.Dispatch<SetStateAction<TypeForFAQs>>
    objForDetailsAboutBusiness: TypeForDetailsAboutBusiness
    setObjForDetailsAboutBusiness: React.Dispatch<SetStateAction<TypeForDetailsAboutBusiness>>
}

type TypeForEquity = {
    seekingFund : number,
    purposesForFunding : string,
    currentValuation : number,
    reasonForValuation : string,
    offeredEquity : number,
    reasonForEquityOffer  : string,
    exitstrategy :string,
    ROI : string     
}

    export default function QueForPitchSection6({ handleNext, objForAllQnA, setObjForAllQnA , objForDetailsAboutBusiness , setObjForDetailsAboutBusiness}: Props) {

    const [arrayForEquity, setArrayForEquity] = useState<Array<TypeForQueAns>>([
        {
            que: 'What specific purposes or initiatives will the funding be used for?',
            ans: {
                text: '',
                urls: []
            }
        },
        {
            que: 'How did you arrive at this valuation figure ?',
            ans: {
                text: '',
                urls: []
            }
        },
        {
            que: 'What factors influenced your decision regarding the equity percentage offered?',
            ans: {
                text: '',
                urls: []
            }
        },
        {
            que: 'What is your envisioned exit strategy for investors?',
            ans: {
                text: '',
                urls: []
            }
        },
        {
            que: 'What potential ROI (Return on Investment) can investors expect in the long term?',
            ans: {
                text: '',
                urls: []
            }
        },
    ]);

    const [objForAdditionalData, setObjForAdditionalData] = useState<TypeForEquity>({
        seekingFund : 0,
        purposesForFunding : '',
        currentValuation : 0,
        reasonForValuation : '',
        offeredEquity : 0,
        reasonForEquityOffer  : '',
        exitstrategy :'',
        ROI : ''     
    })

    const handleInputChangeForLargeQuestions = (event: any, index: number) => {
        const inputText = event.target.value;
        setObjForAdditionalData({
            ...objForAdditionalData,
            [event.target.name]: event.target.value
        });
        const lines = inputText.split('\n');
        const convertedLines = lines.map((line: any, index: number) => {
            if (line) {
                return (
                    `<p key=${index}>${line}</p>`
                )
            }
            else {
                return (
                    `<p key=${index}>${line}&nbsp;</p>`
                )
            }

        });

        let mergedLine: any = '';

        convertedLines.map((item: any) => {
            mergedLine += item
        })
        let newArray = [...arrayForEquity];
        newArray[index].ans.text = mergedLine;
        setArrayForEquity(newArray)
    };

    const handleInputChange = (event : any)=>{
        const {name , value} = event.target;
        setObjForAdditionalData({
            ...objForAdditionalData,
            [name] : value
        })   
    }

    const handleNextButton = async () => {
        setObjForDetailsAboutBusiness({
            ...objForDetailsAboutBusiness,
            currentValuation : objForAdditionalData.currentValuation,
            seekingFund : objForAdditionalData.seekingFund,
            offeredEquity : objForAdditionalData.offeredEquity
        })

        setObjForAllQnA({
            ...objForAllQnA,
            Equity : [...arrayForEquity]
        })

        handleNext();

    }

    useEffect(() => {
        if (objForAllQnA.Equity.length > 0) {
            setObjForAdditionalData({
                ...objForAdditionalData,
                seekingFund : objForDetailsAboutBusiness.seekingFund,
                purposesForFunding : convertText(objForAllQnA.Equity[0].ans.text),
                currentValuation : objForDetailsAboutBusiness.currentValuation,
                reasonForValuation : convertText(objForAllQnA.Equity[1].ans.text),
                offeredEquity : objForDetailsAboutBusiness.offeredEquity,
                reasonForEquityOffer  : convertText(objForAllQnA.Equity[2].ans.text),
                exitstrategy :convertText(objForAllQnA.Equity[3].ans.text),
                ROI : convertText(objForAllQnA.Equity[4].ans.text)     
            })
            setArrayForEquity(objForAllQnA.Equity);
        }
    }, []);

    return (
        <main className='w-4/5 mx-auto'>
            <div className='p-4 rounded-2xl'>
                <h2 className="text-center  text-lg font-semibold leading-7 text-gray-900">{'Valuation & Equity'}</h2>
                <p className="mt-1 text-sm text-center leading-6 text-gray-600">Answer this question will help us to create a news article about your .Plase share the correct details. And might help in increase your Rank.</p>
                {/* {errorMessage.otherError && <p className='block mx-auto text-red-600 w-full'>{errorMessage.otherError}</p>} */}

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:w-4/5 md:p-3">
                    <div className="col-span-5">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900">
                            How much funding are you seeking for your business?
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="font-bold sm:text-sm"  >$</span>
                            </div>
                            <input
                                type="number"
                                name="seekingFund"
                                id="seekingFund"
                                value={objForAdditionalData.seekingFund}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="0.00"
                                aria-describedby="price-currency"
                                aria-disabled='true'
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <span className="font-bold sm:text-sm" id="price-currency">
                                    M
                                </span>
                            </div>
                        </div>
                        {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
                    </div>

                    <div className="col-span-5">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900">
                            What specific purposes or initiatives will the funding be used for?
                        </label>
                        <div className="mt-2">
                            <textarea
                                name='purposesForFunding'
                                id='purposesForFunding'
                                rows={10}
                                cols={50}
                                onChange={(e) => handleInputChangeForLargeQuestions(e, 0)}
                                value={objForAdditionalData.purposesForFunding}
                                className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
                    </div>

                    <div className="col-span-5">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900">
                            What is the current valuation of your business?
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="font-bold sm:text-sm"  >$</span>
                            </div>
                            <input
                                type="number"
                                name="currentValuation"
                                id="currentValuation"
                                value={objForAdditionalData.currentValuation}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="0.00"
                                aria-describedby="price-currency"
                                aria-disabled='true'
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <span className="font-bold sm:text-sm" id="price-currency">
                                    M
                                </span>
                            </div>
                        </div>
                        {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
                    </div>

                    <div className="col-span-5">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900">
                            How did you arrive at this valuation figure ?
                        </label>
                        <div className="mt-2">
                            <textarea
                                name='reasonForValuation'
                                id='reasonForValuation'
                                rows={10}
                                cols={50}
                                onChange={(e) => handleInputChangeForLargeQuestions(e, 1)}
                                value={objForAdditionalData.reasonForValuation}
                                className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
                    </div>

                    <div className="col-span-5">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900">
                            What percentage of equity are you willing to offer in exchange for the funding?
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                </div> */}
                            <input
                                type="number"
                                name="offeredEquity"
                                id="offeredEquity"
                                value={objForAdditionalData.offeredEquity}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="0.00"
                                aria-describedby="price-currency"
                                aria-disabled='true'
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <span className="font-bold sm:text-sm" id="price-currency">
                                    %
                                </span>
                            </div>
                        </div>
                        {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
                    </div>

                    <div className="col-span-5">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900">
                            What factors influenced your decision regarding the equity percentage offered?
                        </label>
                        <div className="mt-2">
                            <textarea
                                name='reasonForEquityOffer'
                                id='reasonForEquityOffer'
                                rows={10}
                                cols={50}
                                onChange={(e) => handleInputChangeForLargeQuestions(e, 2)}
                                value={objForAdditionalData.reasonForEquityOffer}
                                className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
                    </div>

                    <div className="col-span-5">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900">
                            What is your envisioned exit strategy for investors?
                        </label>
                        <div className="mt-2">
                            <textarea
                                name='exitstrategy'
                                id='exitstrategy'
                                rows={10}
                                cols={50}
                                onChange={(e) => handleInputChangeForLargeQuestions(e, 3)}
                                value={objForAdditionalData.exitstrategy}
                                className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
                    </div>

                    <div className="col-span-5">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900">
                            What potential ROI (Return on Investment) can investors expect in the long term?
                        </label>
                        <div className="mt-2">
                            <textarea
                                name='ROI'
                                id='ROI'
                                rows={10}
                                cols={50}
                                onChange={(e) => handleInputChangeForLargeQuestions(e,4)}
                                value={objForAdditionalData.ROI}
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
                    onClick={() => handleNextButton()}
                >
                    Next</Button>
            </div>
        </main>
    )
}











// Question for :
import React, { SetStateAction, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { TypeForFAQs, TypeForQueAns, TypeForDetailsAboutBusiness } from '../../../../utils/type'
import { convertText } from '../../../../utils/factory/FormatText'

type Props = {
    handleNext: Function
    objForAllQnA: TypeForFAQs,
    setObjForAllQnA: React.Dispatch<SetStateAction<TypeForFAQs>>
    objForDetailsAboutBusiness: TypeForDetailsAboutBusiness
    setObjForDetailsAboutBusiness: React.Dispatch<SetStateAction<TypeForDetailsAboutBusiness>>
}

type TypeForEquity = {
    seekingFund: number,
    purposesForFunding: string,
    currentValuation: number,
    reasonForValuation: string,
    offeredEquity: number,
    maximunofferedEquity: number,
    reasonForEquityOffer: string,
    exitstrategy: string,
    ROI: string,
    fundingType: string
}

type ObjForError = {
    seekingFund: string,
    purposesForFunding: string,
    currentValuation: string,
    fundingType: string,
    offeredEquity: string,
    maximunofferedEquity: string,
}

export default function QueForPitchSection6({ handleNext, objForAllQnA, setObjForAllQnA, objForDetailsAboutBusiness, setObjForDetailsAboutBusiness }: Props) {

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
        seekingFund: 0,
        purposesForFunding: '',
        currentValuation: 0,
        reasonForValuation: '',
        offeredEquity: 0,
        maximunofferedEquity: 0,
        reasonForEquityOffer: '',
        exitstrategy: '',
        ROI: '',
        fundingType: ''
    })

    const [ErrorForField, setErrorForField] = useState<ObjForError>({
        seekingFund: '',
        purposesForFunding: '',
        currentValuation: '',
        fundingType: '',
        offeredEquity: '',
        maximunofferedEquity: '',
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

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setObjForAdditionalData({
            ...objForAdditionalData,
            [name]: value
        })

        if (name === 'fundingType' && value === '') {
            setErrorForField({
                ...ErrorForField,
                fundingType: 'Enter the type of funding round you are seeking for .'
            })
        }

        if (name === 'fundingType' && value && ErrorForField.fundingType) {
            setErrorForField({
                ...ErrorForField,
                fundingType: ''
            })
        }

        if (name === 'seekingFund' && (value === '' || (/^0/.test(value)) || (/^-/.test(value)))) {
            setErrorForField({
                ...ErrorForField,
                seekingFund: 'Enter the valid amount you are seeking for.'
            })
        }

        if (name === 'seekingFund' && value && ErrorForField.seekingFund && !(/^0/.test(value)) && !(/^-/.test(value))) {
            setErrorForField({
                ...ErrorForField,
                seekingFund: ''
            })
        }

        if (name === 'currentValuation' && (value === '' || (/^0/.test(value)) || (/^-/.test(value)))) {
            setErrorForField({
                ...ErrorForField,
                currentValuation: 'Enter the valid valuation of your respected organization.'
            })
        }
        if (name === 'currentValuation' && value && ErrorForField.currentValuation && !(/^0/.test(value)) && !(/^-/.test(value))) {
            setErrorForField({
                ...ErrorForField,
                currentValuation: ''
            })
        }

        if (name === 'offeredEquity' && (value === '' || (/^0/.test(value)) || (/^-/.test(value)) || parseInt(value) >= 100  )) {
            setErrorForField({
                ...ErrorForField,
                offeredEquity: 'Enter the valid percentage of equity you want to offer.'
            })
        }

        if (name === 'offeredEquity' && parseInt(value) >= 100) {
            setErrorForField({
                ...ErrorForField,
                offeredEquity: 'You can not offer more then 100% of your equity.'
            })
        }

        if (name === 'offeredEquity' && value && ErrorForField.offeredEquity && !(/^0/.test(value)) && !(/^-/.test(value)) && parseInt(value) < 100) {
            setErrorForField({
                ...ErrorForField,
                offeredEquity: ''
            })
        }

        if (name === 'maximunofferedEquity' && (value === '' || (/^0/.test(value)) || (/^-/.test(value)) || parseInt(value) >= 100)) {
            setErrorForField({
                ...ErrorForField,
                maximunofferedEquity: 'Enter the valid percentage of equity you want to offer.'
            })
        }

        if (name === 'maximunofferedEquity' && parseInt(value) >= 100) {
            setErrorForField({
                ...ErrorForField,
                maximunofferedEquity: 'You can not offer more then 100% of your equity.'
            })
        }

        if (name === 'maximunofferedEquity' && value && ErrorForField.maximunofferedEquity && !(/^0/.test(value)) && !(/^-/.test(value)) && parseInt(value) < 100) {
            setErrorForField({
                ...ErrorForField,
                maximunofferedEquity: ''
            })
        }
    }

    const VerificationForFeilds = () => {
        let error = true;
        if (objForAdditionalData.fundingType === '') {
            setErrorForField({
                ...ErrorForField,
                fundingType: 'Enter the type of funding round you are seeking for .'
            })
        }

        else if (objForAdditionalData.seekingFund.toString() !== '' && ((/^0/.test(objForAdditionalData.seekingFund.toString())) || (/-0/.test(objForAdditionalData.seekingFund.toString())))) {
            setErrorForField({
                ...ErrorForField,
                seekingFund: 'Enter the valid amount you are seeking for.'
            })
        }

        else if (objForAdditionalData.currentValuation.toString() !== '' && ((/^0/.test(objForAdditionalData.currentValuation.toString())) || (/-0/.test(objForAdditionalData.currentValuation.toString())))) {
            setErrorForField({
                ...ErrorForField,
                currentValuation: 'Enter the valid valuation of your respected organization.'
            })
        }

        else if (objForAdditionalData.offeredEquity.toString() !== '' && ((/^0/.test(objForAdditionalData.offeredEquity.toString())) || (/-0/.test(objForAdditionalData.offeredEquity.toString())) || objForAdditionalData.offeredEquity >= 100 )) {
            setErrorForField({
                ...ErrorForField,
                offeredEquity: 'Enter the valid percentage of equity you want to offer.'
            })
        }

        else if (objForAdditionalData.maximunofferedEquity.toString() !== '' && ((/^0/.test(objForAdditionalData.maximunofferedEquity.toString())) || (/-0/.test(objForAdditionalData.maximunofferedEquity.toString())) || objForAdditionalData.maximunofferedEquity >= 100 )) {
            setErrorForField({
                ...ErrorForField,
                maximunofferedEquity: 'Enter the valid percentage of equity you want to offer.'
            })
        }
        else {
            error = false
        }
        return error
    }

    const handleNextButton = async () => {
        if (!VerificationForFeilds()) {
            setObjForDetailsAboutBusiness({
                ...objForDetailsAboutBusiness,
                currentValuation: objForAdditionalData.currentValuation,
                seekingFund: objForAdditionalData.seekingFund,
                offeredEquity: objForAdditionalData.offeredEquity,
                maximunofferedEquity: objForAdditionalData.maximunofferedEquity,
                fundingType: objForAdditionalData.fundingType
            })

            setObjForAllQnA({
                ...objForAllQnA,
                Equity: [...arrayForEquity]
            })

            handleNext();
        }
    }

    useEffect(() => {
        if (objForAllQnA.Equity.length > 0) {
            setObjForAdditionalData({
                ...objForAdditionalData,
                seekingFund: objForDetailsAboutBusiness.seekingFund,
                purposesForFunding: convertText(objForAllQnA.Equity[0].ans.text),
                currentValuation: objForDetailsAboutBusiness.currentValuation,
                reasonForValuation: convertText(objForAllQnA.Equity[1].ans.text),
                offeredEquity: objForDetailsAboutBusiness.offeredEquity,
                maximunofferedEquity: objForDetailsAboutBusiness.maximunofferedEquity,
                reasonForEquityOffer: convertText(objForAllQnA.Equity[2].ans.text),
                exitstrategy: convertText(objForAllQnA.Equity[3].ans.text),
                ROI: convertText(objForAllQnA.Equity[4].ans.text),
                fundingType: objForDetailsAboutBusiness.fundingType
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
                    <div className="col-span-5 md:col-span-3">
                        <label htmlFor="fundingType" className="block  font-medium leading-6 text-gray-900">
                            What type of funding round are you looking for ?
                        </label>
                        <div className="mt-2">
                            <select
                                id="typeOfInvestment"
                                name="fundingType"
                                autoComplete="fundingType"
                                onChange={handleInputChange}
                                className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={objForAdditionalData.fundingType}
                            >
                                <option value={''}>{'None'}</option>
                                <option value={'preseed'} >{'Pre-Seed'}</option>
                                <option value={'seed'} >{'Seed'}</option>
                                <option value={'series A'} >{'Series A'}</option>
                                <option value={'series B'} >{'Series B'}</option>
                                <option value={'series C'} >{'Series C'}</option>

                            </select>
                        </div>
                        {ErrorForField.fundingType && <p className='block mx-auto text-red-600 w-full'>{ErrorForField.fundingType}</p>}
                    </div>

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
                        {ErrorForField.seekingFund && <p className='block mx-auto text-red-600 w-full'>{ErrorForField.seekingFund}</p>}
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
                        {/* {ErrorForField.fundingType && <p className='block mx-auto text-red-600 w-full'>{ErrorForField.fundingType}</p>} */}
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
                        {ErrorForField.currentValuation && <p className='block mx-auto text-red-600 w-full'>{ErrorForField.currentValuation}</p>}

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
                        {ErrorForField.offeredEquity && <p className='block mx-auto text-red-600 w-full'>{ErrorForField.offeredEquity}</p>}
                    </div>

                    <div className="col-span-5">
                        <label htmlFor="maximunofferedEquity" className="block font-medium leading-6 text-gray-900">
                            What Maximum percentage of equity are you willing to offer in exchange for the funding?
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                </div> */}
                            <input
                                type="number"
                                name="maximunofferedEquity"
                                id="maximunofferedEquity"
                                value={objForAdditionalData.maximunofferedEquity}
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
                        {ErrorForField.maximunofferedEquity && <p className='block mx-auto text-red-600 w-full'>{ErrorForField.maximunofferedEquity}</p>}
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
                                onChange={(e) => handleInputChangeForLargeQuestions(e, 4)}
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











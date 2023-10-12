// Question for Financials and Costs:
import React, { SetStateAction, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import {TypeForFAQs , TypeForQueAns , TypeForDetailsAboutBusiness } from '../../../../utils/type'
import {convertText} from '../../../../utils/factory/FormatText'

type Props = {
    handleNext: Function
    objForAllQnA: TypeForFAQs,
    setObjForAllQnA: React.Dispatch<SetStateAction<TypeForFAQs>>
    objForDetailsAboutBusiness : TypeForDetailsAboutBusiness
    setObjForDetailsAboutBusiness : React.Dispatch<SetStateAction<TypeForDetailsAboutBusiness>>
  }

type originalText = {
    q1: string,
    q2: string,
    q3: string,
}

export default function QueForPitchSection4({ handleNext, objForAllQnA, setObjForAllQnA }: Props) {

    const [arrayForFinancials, setArrayForFinancials] = useState<Array<TypeForQueAns>>([
        {
            que: 'What is your current profit ratio, and how do production costs and middleman expenses factor into your business model?',
            ans: {
                text: '',
                urls: []
            }
        },
        {
            que: 'How much value does the customer receive from your product or service, and how does this compare to the cost?',
            ans: {
                text: '',
                urls: []
            }
        },
        {
            que: 'Have you raised any funding previously? If so, what was the percentage of equity given up and at what valuation?',
            ans: {
                text: '',
                urls: []
            }
        },
    ]);

    const [originalText, setOriginalText] = useState<originalText>({
        q1: '',
        q2: '',
        q3: '',
    })

    const handleNextButton = () => {
        setObjForAllQnA({
            ...objForAllQnA,
            Financials: arrayForFinancials
        });
        handleNext()
    }

    const handleInputChange = (event: any, index: number) => {
        const inputText = event.target.value;
        setOriginalText({
            ...originalText,
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
        let newArray = [...arrayForFinancials];
        newArray[index].ans.text = mergedLine;
        setArrayForFinancials(newArray)

    };



    useEffect(() => {
        if (objForAllQnA.Financials.length > 0) {
            setOriginalText({
                q1: convertText(objForAllQnA.Financials[0].ans.text),
                q2: convertText(objForAllQnA.Financials[1].ans.text),
                q3: convertText(objForAllQnA.Financials[2].ans.text),
            })
            setArrayForFinancials(objForAllQnA.Financials);
        }
    }, [])

    return (
        <main className='w-4/5 mx-auto'>
            <div className='p-4 rounded-2xl'>
                <h2 className="text-center  text-lg font-semibold leading-7 text-gray-900">{'Financials and Costs'}</h2>
                <p className="mt-1 text-sm text-center leading-6 text-gray-600">Answer this question will help us to create a news article about your .Plase share the correct details. And might help in increase your Rank.</p>
                {/* {errorMessage.otherError && <p className='block mx-auto text-red-600 w-full'>{errorMessage.otherError}</p>} */}

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:w-4/5 md:p-3">
                    <div className="col-span-5">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900">
                            What is your current profit ratio, and how do production costs and middleman expenses factor into your business model?
                        </label>
                        <div className="mt-2">
                            <textarea
                                name='q1'
                                id='q1'
                                rows={10}
                                cols={50}
                                onChange={(e) => handleInputChange(e, 0)}
                                value={originalText.q1}
                                className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
                    </div>

                    <div className="col-span-5">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900">
                            How much value does the customer receive from your product or service, and how does this compare to the cost?
                        </label>
                        <div className="mt-2">
                            <textarea
                                name='q2'
                                id='q2'
                                rows={10}
                                cols={50}
                                onChange={(e) => handleInputChange(e, 1)}
                                value={originalText.q2}
                                className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
                    </div>

                    <div className="col-span-5">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900">
                            Have you raised any funding previously? If so, what was the percentage of equity given up and at what valuation?
                        </label>
                        <div className="mt-2">
                            <textarea
                                name='q3'
                                id='q3'
                                rows={10}
                                cols={50}
                                onChange={(e) => handleInputChange(e, 2)}
                                value={originalText.q3}
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











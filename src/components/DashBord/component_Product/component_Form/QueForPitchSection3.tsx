// Question for Market and Competition:

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
    q4: string,
}

export default function QueForPitchSection3({ handleNext, objForAllQnA, setObjForAllQnA }: Props) {

    const [arrayForMarket, setArrayForMarket] = useState<Array<TypeForQueAns>>([
        {
            que: 'Can you share the percentage of return customers in both your online and offline markets?',
            ans: {
                text: '',
                urls: []
            }
        },
        {
            que: 'Why does your business need additional funds, and how do you plan to allocate these funds?',
            ans: {
                text: '',
                urls: []
            }
        },
        {
            que: 'What is the estimated market size for your business field, and how do you plan to capture a share of it?',
            ans: {
                text: '',
                urls: []
            }
        },
        {
            que: 'What are the key unique points or advantages that set your business apart from competitors?',
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
        q4: '',
    })

    const handleNextButton = () => {
        setObjForAllQnA({
            ...objForAllQnA,
            Market: arrayForMarket
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
                console.log("Space", line)
                return (
                    `<p key=${index}>${line}&nbsp;</p>`
                )
            }

        });

        let mergedLine: any = '';

        convertedLines.map((item: any) => {
            mergedLine += item
        })
        let newArray = [...arrayForMarket];
        newArray[index].ans.text = mergedLine;
        setArrayForMarket(newArray)

    };


    useEffect(() => {
        if (objForAllQnA.Market.length > 0) {
            setOriginalText({
                q1: convertText(objForAllQnA.Market[0].ans.text),
                q2: convertText(objForAllQnA.Market[1].ans.text),
                q3: convertText(objForAllQnA.Market[2].ans.text),
                q4: convertText(objForAllQnA.Market[3].ans.text)
            })
            setArrayForMarket(objForAllQnA.Market);
        }
    }, [])

    return (
        <main className='w-4/5 mx-auto'>
            <div className='p-4 rounded-2xl'>
                <h2 className="text-center  text-lg font-semibold leading-7 text-gray-900">{'Market and Competition'}</h2>
                <p className="mt-1 text-sm text-center leading-6 text-gray-600">Answer this question will help us to create a news article about your .Plase share the correct details. And might help in increase your Rank.</p>
                {/* {errorMessage.otherError && <p className='block mx-auto text-red-600 w-full'>{errorMessage.otherError}</p>} */}

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:w-4/5 md:p-3">
                    <div className="col-span-5">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900">
                            Can you share the percentage of return customers in both your online and offline markets?
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
                            Why does your business need additional funds, and how do you plan to allocate these funds?
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
                            What is the estimated market size for your business field, and how do you plan to capture a share of it?
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

                    <div className="col-span-5">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900">
                            What are the key unique points or advantages that set your business apart from competitors?
                        </label>
                        <div className="mt-2">
                            <textarea
                                name='q4'
                                id='q4'
                                rows={10}
                                cols={50}
                                onChange={(e) => handleInputChange(e, 3)}
                                value={originalText.q4}
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











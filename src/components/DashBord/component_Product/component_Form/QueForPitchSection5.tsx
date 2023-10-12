// Question for Target Audience:
import React, { SetStateAction, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import axios from 'axios'
import { TypeForFAQs , TypeForDetailsAboutBusiness} from '../../../../utils/type'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

type Props = {
    handleNext: Function
    objForAllQnA: TypeForFAQs,
    setObjForAllQnA: React.Dispatch<SetStateAction<TypeForFAQs>>
    objForDetailsAboutBusiness : TypeForDetailsAboutBusiness
    setObjForDetailsAboutBusiness : React.Dispatch<SetStateAction<TypeForDetailsAboutBusiness>>
  }

type TypeForAudiance = {
    targetAudiences: string
}

    export default function QueForPitchSection5({ handleNext, objForAllQnA, setObjForAllQnA  , objForDetailsAboutBusiness , setObjForDetailsAboutBusiness}: Props) {

    const [objForAdditionalData, setObjForAdditionalData] = useState<TypeForAudiance>({
        targetAudiences: '',
    })

    const handleNextPage = async () => {
        setObjForDetailsAboutBusiness({
            ...objForDetailsAboutBusiness,
            targetAudiences : objForAdditionalData.targetAudiences
        })
        handleNext();
    }

    // const handleInputChange = (event: any, index: number) => {
    //     const inputText = event.target.value;
    //     setOriginalText({
    //         ...originalText,
    //         [event.target.name]: event.target.value
    //     });
    //     const lines = inputText.split('\n');
    //     const convertedLines = lines.map((line: any, index: number) => {
    //         if (line) {
    //             return (
    //                 `<p key=${index}>${line}</p>`
    //             )
    //         }
    //         else {
    //             return (
    //                 `<p key=${index}>${line}&nbsp;</p>`
    //             )
    //         }
    //     });

    //     let mergedLine: any = '';

    //     convertedLines.map((item: any) => {
    //         mergedLine += item
    //     })
    //     let newArray = [...arrayForAudience];
    //     newArray[index].ans.text = mergedLine;
    //     setArrayForAudience(newArray)

    // };

    const handleInputChange = (event : any)=>{
        const {name , value} = event.target;
        setObjForAdditionalData({
            ...objForAdditionalData,
            [name] : value
        })   
    }

    useEffect(() => {
        setObjForAdditionalData({
            targetAudiences: objForDetailsAboutBusiness.targetAudiences
        })
    }, [])

    useEffect(() => {

    }, [])
    return (
        <main className='w-4/5 mx-auto'>
            <div className='p-4 rounded-2xl'>
                <h2 className="text-center  text-lg font-semibold leading-7 text-gray-900">{'Target Audience'}</h2>
                <p className="mt-1 text-sm text-center leading-6 text-gray-600">Answer this question will help us to create a news article about your .Plase share the correct details. And might help in increase your Rank.</p>
                {/* {errorMessage.otherError && <p className='block mx-auto text-red-600 w-full'>{errorMessage.otherError}</p>} */}

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:w-4/5 md:p-3">
                    <div className="col-span-5">
                        <label htmlFor="targetAudiences" className="block font-medium leading-6 text-gray-900">
                            Who are your target audiences or customer segments, and how do you plan to reach and engage them effectively?
                        </label>
                        <div className="mt-2">
                            <RadioGroup
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="targetAudiences"
                                value={objForAdditionalData.targetAudiences}
                                onChange={handleInputChange}
                            >
                                <FormControlLabel value="B2B" control={<Radio />} label="B2B(Business-to-Business)" />
                                <FormControlLabel value="B2C" control={<Radio />} label="B2C (Business-to-Consumer)" />
                                <FormControlLabel value="B2G" control={<Radio />} label="B2G (Business-to-Government)" />
                                <FormControlLabel value="Niche Markets" control={<Radio />} label="Niche Markets" />
                                <FormControlLabel value="International Markets" control={<Radio />} label="International Markets" />
                            </RadioGroup>
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
                    onClick={() => handleNextPage()}
                >
                    Next</Button>
            </div>
        </main>
    )
}











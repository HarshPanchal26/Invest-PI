// Question for Performance Metrics:
import React, { SetStateAction, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { TypeForFAQs, TypeForQueAns , TypeForDetailsAboutBusiness } from '../../../../utils/type'
import { convertText } from '../../../../utils/factory/FormatText'
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

type originalText = {
    avgSixMonthSale: string,
    avgSixMonthViews: string,
    avgSixMonthCustomer: string,
    avgYearSale: string,
    avgYearViews: string,
    avgYearCustomer: string,
    queForBusinessTarget : string,
    queForValuations : string,
}

export default function QueForPitchSection2({ handleNext, objForAllQnA, setObjForAllQnA  ,objForDetailsAboutBusiness , setObjForDetailsAboutBusiness}: Props) {

    const [arrayForPerformance, setArrayForPerformance] = useState<Array<TypeForQueAns>>([
        {
            que: 'What are your business targets for the current calendar year in terms of sales, growth, or other key performance indicators?',
            ans: {
                text: '',
                urls: []
            }
        },
        {
            que: 'Where do you see the valuation of your business in the next two years, and what resources will you need to achieve this?',
            ans: {
                text: '',
                urls: []
            }
        },
    ]);

    const [objForAdditionalData, setObjForAdditionalData] = useState<originalText>({
        avgSixMonthSale: '',
        avgSixMonthViews: '',
        avgSixMonthCustomer: '',
        avgYearSale: '',
        avgYearViews: '',
        avgYearCustomer: '',
        queForBusinessTarget : '',
        queForValuations : '',
    })

    const handleNextButton = () => {
        setObjForAllQnA({
            ...objForAllQnA,
            Performance: arrayForPerformance
        });
        setObjForDetailsAboutBusiness({
            ...objForDetailsAboutBusiness,
            avgSixMonthSale: objForAdditionalData.avgSixMonthSale,
            avgSixMonthViews: objForAdditionalData.avgSixMonthViews,
            avgSixMonthCustomer: objForAdditionalData.avgSixMonthCustomer,
            avgYearSale: objForAdditionalData.avgYearSale,
            avgYearViews: objForAdditionalData.avgYearViews,
            avgYearCustomer: objForAdditionalData.avgYearCustomer,
          })
        handleNext()
    }

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
        let newArray = [...arrayForPerformance];
        newArray[index].ans.text = mergedLine;
        setArrayForPerformance(newArray)

    };

    const handleInputChange = (event : any)=>{
        const {name , value} = event.target;
         setObjForAdditionalData({
            ...objForAdditionalData,
            [name] : value
         })   
    }


    useEffect(() => {
        if (objForAllQnA.Performance.length > 0) {
            setObjForAdditionalData({
                avgSixMonthSale: objForDetailsAboutBusiness.avgSixMonthSale,
                avgSixMonthViews: objForDetailsAboutBusiness.avgSixMonthViews,
                avgSixMonthCustomer: objForDetailsAboutBusiness.avgSixMonthCustomer,
                avgYearSale: objForDetailsAboutBusiness.avgYearSale,
                avgYearViews: objForDetailsAboutBusiness.avgYearViews,
                avgYearCustomer: objForDetailsAboutBusiness.avgYearCustomer,
                queForBusinessTarget : convertText(objForAllQnA.Performance[0].ans.text),
                queForValuations : convertText(objForAllQnA.Performance[1].ans.text),                
            })
            setArrayForPerformance(objForAllQnA.Performance);
        }
    }, [])

    return (
        <main className='w-4/5 mx-auto'>
            <div className='p-4 rounded-2xl'>
                <h2 className="text-center  text-lg font-semibold leading-7 text-gray-900">{'Performance Metrics'}</h2>
                <p className="mt-1 text-sm text-center leading-6 text-gray-600">Answer this question will help us to create a news article about your .Plase share the correct details. And might help in increase your Rank.</p>
                {/* {errorMessage.otherError && <p className='block mx-auto text-red-600 w-full'>{errorMessage.otherError}</p>} */}

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:w-4/5 md:p-3">

                    <div className="col-span-5 border-b">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900 text-lg">
                            What are your average monthly sales over the past six months ?
                        </label>
                        <div className="mt-4">
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="avgSixMonthSale"
                                onChange={handleInputChange}
                                value={objForAdditionalData.avgSixMonthSale}
                            >
                                <FormControlLabel value="<$1000" control={<Radio />} label="Below $1,000" />
                                <FormControlLabel value="$1000-$5000" control={<Radio />} label="$1,000 - $5,000" />
                                <FormControlLabel value="$5000-$10000" control={<Radio />} label="$5,000 - $10,000" />
                                <FormControlLabel value="$10000-$20000" control={<Radio />} label="$10,000 - $20,000" />
                                <FormControlLabel value=">$20000" control={<Radio />} label="Over $20,000" />
                                <FormControlLabel value="NA" control={<Radio />} label="Not Applicable" />
                                <FormControlLabel
                                    value="disabled"
                                    disabled
                                    control={<Radio />}
                                    label="other"
                                />
                            </RadioGroup>
                        </div>
                        {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
                    </div>

                    <div className="col-span-5 border-b">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900 text-lg">
                            What are your average Website View or app downloads over the past six months?
                        </label>
                        <div className="mt-2">
                            <RadioGroup
                                row
                                name="avgSixMonthViews"
                                onChange={handleInputChange}
                                value={objForAdditionalData.avgSixMonthViews}
                            >
                                <FormControlLabel value="<1000" control={<Radio />} label="Below 1,000 visits" />
                                <FormControlLabel value="1000-5000" control={<Radio />} label="1,000 - 5,000 visits" />
                                <FormControlLabel value="5000-10000" control={<Radio />} label="5,000 - 10,000 visits" />
                                <FormControlLabel value="5000-10000" control={<Radio />} label="5,000 - 10,000 visits" />
                                <FormControlLabel value="10000-20000" control={<Radio />} label="10,000 - 20,000 visits" />
                                <FormControlLabel value=">20000" control={<Radio />} label="Over 20,000 visits" />
                                <FormControlLabel value="NA" control={<Radio />} label="Not Applicable" />
                            </RadioGroup>
                        </div>
                        {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
                    </div>

                    <div className="col-span-5 border-b">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900 text-lg">
                            What are your average custmore number over the past six months?
                        </label>
                        <div className="mt-2">
                            <RadioGroup
                                row
                                name="avgSixMonthCustomer"
                                onChange={handleInputChange}
                                value={objForAdditionalData.avgSixMonthCustomer}
                            >
                                <FormControlLabel value="<50" control={<Radio />} label="Fewer than 50 customers" />
                                <FormControlLabel value="50-100" control={<Radio />} label="50-100 Customer" />
                                <FormControlLabel value="100-500" control={<Radio />} label="100-500  Customers" />
                                <FormControlLabel value="500-1000" control={<Radio />} label="500-1000  Customers" />
                                <FormControlLabel value=">1000" control={<Radio />} label="Over 1000" />
                                <FormControlLabel value="NA" control={<Radio />} label="Not Applicable" />

                            </RadioGroup>
                        </div>
                        {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
                    </div>

                    <div className="col-span-5 border-b">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900 text-lg">
                            What are your average monthly sales over the past year?
                        </label>
                        <div className="mt-2">
                            <RadioGroup
                                row
                                name="avgYearSale"
                                onChange={handleInputChange}
                                value={objForAdditionalData.avgYearSale}
                            >
                                <FormControlLabel value="<$1000" control={<Radio />} label="Below $1,000" />
                                <FormControlLabel value="$1000-$5000" control={<Radio />} label="$1,000 - $5,000" />
                                <FormControlLabel value="$5000-$10000" control={<Radio />} label="$5,000 - $10,000" />
                                <FormControlLabel value="$10000-$20000" control={<Radio />} label="$10,000 - $20,000" />
                                <FormControlLabel value=">$20000" control={<Radio />} label="Over $20,000" />
                                <FormControlLabel value="NA" control={<Radio />} label="Not Applicable" />
                            </RadioGroup>
                        </div>
                        {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
                    </div>

                    <div className="col-span-5 border-b">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900 text-lg">
                            What are your average website views or app downalods over the past year?
                        </label>
                        <div className="mt-2">
                            <RadioGroup
                                row
                                name="avgYearViews"
                                onChange={handleInputChange}
                                value={objForAdditionalData.avgYearViews}
                            >
                                <FormControlLabel value="<1000" control={<Radio />} label="Below 1,000 visits" />
                                <FormControlLabel value="1000-5000" control={<Radio />} label="1,000 - 5,000 visits" />
                                <FormControlLabel value="5000-10000" control={<Radio />} label="5,000 - 10,000 visits" />
                                <FormControlLabel value="5000-10000" control={<Radio />} label="5,000 - 10,000 visits" />
                                <FormControlLabel value="10000-20000" control={<Radio />} label="10,000 - 20,000 visits" />
                                <FormControlLabel value=">20000" control={<Radio />} label="Over 20,000 visits" />
                                <FormControlLabel value="NA" control={<Radio />} label="Not Applicable" />
                            </RadioGroup>
                        </div>
                        {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
                    </div>

                    <div className="col-span-5">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900 text-lg">
                            What are your average customers over the past year?
                        </label>
                        <div className="mt-2">
                            <RadioGroup
                                row
                                name="avgYearCustomer"
                                onChange={handleInputChange}
                                value={objForAdditionalData.avgYearCustomer}
                            >
                                <FormControlLabel value="<50" control={<Radio />} label="Fewer than 50 customers" />
                                <FormControlLabel value="50-100" control={<Radio />} label="50-100 Customer" />
                                <FormControlLabel value="100-500" control={<Radio />} label="100-500  Customers" />
                                <FormControlLabel value="500-1000" control={<Radio />} label="500-1000  Customers" />
                                <FormControlLabel value=">1000" control={<Radio />} label="Over 1000" />
                                <FormControlLabel value="NA" control={<Radio />} label="Not Applicable" />

                            </RadioGroup>
                        </div>
                        {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
                    </div>



                    <div className="col-span-5">
                        <label htmlFor="queForBusinessTarget" className="block font-medium leading-6 text-gray-900 text-lg">
                            What are your business targets for the current calendar year in terms of sales, growth, or other key performance indicators?
                        </label>
                        <div className="mt-2">
                            <textarea
                                name='queForBusinessTarget'
                                id='queForBusinessTarget'
                                rows={10}
                                cols={50}
                                onChange={(e) => handleInputChangeForLargeQuestions(e, 0)}
                                value={objForAdditionalData.queForBusinessTarget}
                                className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
                    </div>

                    <div className="col-span-5">
                        <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900 text-lg">
                            Where do you see the valuation of your business in the next two years, and what resources will you need to achieve this?

                        </label>
                        <div className="mt-2">
                            <textarea
                                name='queForValuations'
                                id='queForValuations'
                                rows={10}
                                cols={50}
                                onChange={(e) => handleInputChangeForLargeQuestions(e, 1)}
                                value={objForAdditionalData.queForValuations}
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











import React, { useState } from 'react'
import { Button } from '@mui/material';
import { DocumentPlusIcon } from '@heroicons/react/20/solid';
import { ArrayForInvestorInterest } from '../../../utils/InterestArray'
import {SchemaForInterest} from '../../../utils/factory/ObjForSchema'

const ArrayForInterestOfInvestor = [
    ...ArrayForInvestorInterest
]

type TypeForstateForInterest = {
    type: string,
    feild: string[]
}

type propsType = {
    handleNext: Function,
    setArrayForInterest : React.Dispatch<React.SetStateAction<Array<string>>>
}


const stateForInterest: TypeForstateForInterest[] = [
    { type: "Technology", feild: [] },
    { type: "E-commerce", feild: [] },
    { type: "Health and Biotech", feild: [] },
    { type: "FinTech", feild: [] },
    { type: "Clean Energy and Sustainability", feild: [] },
    { type: "Consumer Products and Services", feild: [] },
    { type: "Education and E-Learning", feild: [] },
    { type: "Entertainment and Media", feild: [] },
    { type: "Real Estate and Property Technology", feild: [] },
    { type: "Transportation and Mobility", feild: [] },
    { type: "Social Impact and Sustainability", feild: [] },
    { type: "Manufacturing and Industry", feild: [] },
]

export default function Interest({handleNext , setArrayForInterest}: propsType) {

    const [feildOfInterestForInvestor, setfeildOfInterestForInvestor] = useState(stateForInterest);
    
    const handleClickForNext = () =>{
        let interestObj = SchemaForInterest(feildOfInterestForInvestor)
        setArrayForInterest(interestObj);   
        handleNext(interestObj);
    }

    const handleClick = (indexofInner: number, indexofOuter: number, type: any) => {

        ArrayForInterestOfInvestor[indexofOuter].feild[indexofInner].selected = !ArrayForInterestOfInvestor[indexofOuter].feild[indexofInner].selected;

        let newArrray = [...feildOfInterestForInvestor];
        if (ArrayForInterestOfInvestor[indexofOuter].feild[indexofInner].selected) {
            newArrray[indexofOuter].feild.push(type);
        } else {
            const dummyArray = newArrray[indexofOuter].feild;
            const result = dummyArray.filter((item) => item !== type);
            newArrray[indexofOuter].feild = result
        }

        setfeildOfInterestForInvestor([
            ...newArrray
        ])
    }
    console.log("Object" ,feildOfInterestForInvestor)

    return (
        <div className='bloch mx-auto md:w-1/2 w-full'>
            {
                ArrayForInterestOfInvestor.map((item, indexofOuter) => {
                    return (
                        <div className='block border-b my-3' key={indexofOuter}>
                            <div className='mt-3 text-lg leading-6 text-gray-600 my-5'>{item.type}</div>
                            <div className='flex flex-row flex-wrap my-5 mx-5'>
                                {item.feild.map((subType, indexofInner) => {
                                    return (
                                        <div className='my-5 mx-2'>
                                            <Button
                                                variant={ArrayForInterestOfInvestor[indexofOuter].feild[indexofInner].selected ? 'contained' : 'outlined'}
                                                color='primary'
                                                key={indexofInner}
                                                onClick={() => handleClick(indexofInner, indexofOuter, subType.category)}
                                            >
                                                <span className='h-5 w-5 '><DocumentPlusIcon /></span>
                                                {subType.category}
                                            </Button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })
            }
            <Button 
            variant='contained'  
            color='primary'
            onClick={handleClickForNext}
            >Next</Button>
        </div>
    )
}


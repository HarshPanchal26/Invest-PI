import { useEffect, useState } from "react"
import { objForPersonalDataOfIndividuals } from '../../../utils/factory/ObjForFormData';
import { SchemaForIndividualsObj } from '../../../utils/factory/ObjForSchema'
import { Button } from "@mui/material";
type propsType = {
    handleNext: Function,
    setObjForSignInComonent: React.Dispatch<React.SetStateAction<Object>>
}

export default function InterestInInvestment({ handleNext, setObjForSignInComonent }: propsType) {

    const [interest, setInterest] = useState<boolean>(false)
    const [type , setType] = useState<string | null>(null)


    const handleChageInValue = (event: any) => {
        const { name, value } = event.target;
        if (name === 'interest') {
            if(value === 'Yes') 
                setInterest(true);
            if(value === 'No') {
                setInterest(false);
                setType('NA')
                objForPersonalDataOfIndividuals.investorType = 'NA';
            } 
        } else {
            setType(value);
            objForPersonalDataOfIndividuals.investorType = value;
        }
            let Schema = SchemaForIndividualsObj(objForPersonalDataOfIndividuals);
            setObjForSignInComonent(Schema);
    }

    const handleClick = () => {
        handleNext()
    }

    useEffect(()=>{
        if(objForPersonalDataOfIndividuals.investorType !== 'NA'){
            setInterest(true);
            setType(objForPersonalDataOfIndividuals.investorType);
        }
    } , [])

    return (
        <>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4 mx-10 start-4 sm:col-start-2">
                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Have you ever invested in any startup or Company ?
                    </label>
                    <div className="mt-2">
                        <select
                            id="interest"
                            name="interest"
                            autoComplete="interest"
                            onChange={handleChageInValue}
                            className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={interest ? 'Yes' : 'No'}
                        >
                            <option value={''} >{'Select'}</option>
                            <option value={'Yes'}>Yes</option>
                            <option value={'No'}>No</option>
                        </select>
                    </div>
                </div>
                {interest && (<div className="sm:col-span-4 mx-10 start-4 sm:col-start-2">
                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Investor Type ? 
                    </label>
                    <div className="mt-2">
                        <select
                            id="type"
                            name="type"
                            autoComplete="type"
                            onChange={handleChageInValue}
                            className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            required
                            value={type!== null ? type : 'NA'}
                        >
                            <option value={'NA'}>{'None'}</option>
                            <option value={'Angel Investor'} >{'Angel Investor'}</option>
                            <option value={'HNWI'}>{'High-Net-Worth Individual '}</option>
                        </select>
                    </div>
                </div>)}
            </div>
            <div className="my-5">
                <Button
                    variant='contained'
                    color='primary'
                    className='my-10'
                    onClick={handleClick}
                >
                    Next</Button>
            </div>
        </>
    )
}


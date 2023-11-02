// Question for Bussiness Overviews
import React, { SetStateAction, useEffect } from 'react'
import { useState } from 'react';
import { Button } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {TypeForFAQs , TypeForQueAns , TypeForDetailsAboutBusiness} from '../../../../utils/type'
import {convertText} from '../../../../utils/factory/FormatText'

type Props = {
  handleNext: Function
  objForAllQnA: TypeForFAQs,
  setObjForAllQnA: React.Dispatch<SetStateAction<TypeForFAQs>>
  objForDetailsAboutBusiness : TypeForDetailsAboutBusiness
  setObjForDetailsAboutBusiness : React.Dispatch<SetStateAction<TypeForDetailsAboutBusiness>>
}

type objForAdditionalData = {
  startDate: string,
  buisnessMode: string,
  url: string,
  queForManufacture : string,
}

export default function QueForPitchSection1({ handleNext, objForAllQnA, setObjForAllQnA  , objForDetailsAboutBusiness , setObjForDetailsAboutBusiness}: Props) {

  const [arrayOfLargeQuestins, setArrayOfLargeQuestins] = useState<Array<TypeForQueAns>>([
    {
      que: 'How many products do you manufacture or deliver each month, and do you foresee any significant changes in production volume?',
      ans: {
        text : '',
        urls: []
      }
    },
  ]);

  const [objForAdditionalData, setObjForAdditionalData] = useState<objForAdditionalData>({
    startDate: '',
    buisnessMode: '',
    url: '',
    queForManufacture : '',
  })


  const   handleInputChange = (event : any)=>{
    const {name , value} = event.target;
     setObjForAdditionalData({
        ...objForAdditionalData,
        [name] : value
     })   
}

  const handleInputChangeForLargeQuestions = (event: any, index: number) => {
    const inputText = event.target.value;
    setObjForAdditionalData({
      ...objForAdditionalData,
      [event.target.name] : event.target.value
    }); 
    const lines = inputText.split('\n');
    const convertedLines = lines.map((line: any, index: number) => {
      if (line) {
        return (
          `<p key=${index}>${line}</p>`
        )
      } 
      else {
        console.log("Space" , line)
        return (
          `<p key=${index}>${line}&nbsp;</p>`
        )
      }

    });

    let mergedLine: any = '';

    convertedLines.map((item: any) => {
      mergedLine += item
    })
    let newArray = [...arrayOfLargeQuestins];
    newArray[index].ans.text = mergedLine;
    setArrayOfLargeQuestins(newArray)

  };

  const handleNextButton = () => {
    setObjForAllQnA({
      ...objForAllQnA,
      Business : arrayOfLargeQuestins,
    });
    setObjForDetailsAboutBusiness({
      ...objForDetailsAboutBusiness,
      startDate : objForAdditionalData.startDate,
      buisnessMode : objForAdditionalData.buisnessMode,
      url : objForAdditionalData.url
    })
    handleNext()
  }

  useEffect(() => {
    if (objForAllQnA.Business.length > 0) {
      setObjForAdditionalData({
        buisnessMode : objForDetailsAboutBusiness.buisnessMode,
        url : objForDetailsAboutBusiness.url,
        queForManufacture : convertText(objForAllQnA.Business[0].ans.text),
        startDate : objForDetailsAboutBusiness.startDate,

      })
      setArrayOfLargeQuestins(objForAllQnA.Business);
    }
  }, [])


  return (
    <main className='w-4/5 mx-auto'>
      <div className='p-4 rounded-2xl'>
        <h2 className="text-center  text-lg font-semibold leading-7 text-gray-900">{'Business Overview'}</h2>
        <p className="mt-1 text-sm text-center leading-6 text-gray-600">Answer this question will help us to create a news article about your .Plase share the correct details. And might help in increase your Rank.</p>
        {/* {errorMessage.otherError && <p className='block mx-auto text-red-600 w-full'>{errorMessage.otherError}</p>} */}
        {/* <p dangerouslySetInnerHTML={{__html : arrayOfLargeQuestins[0].ans.text}}></p> */}
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:w-4/5 md:p-3">
          <div className="col-span-5">
            <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900">
              How long has your business been operational, and when was your product or service first launched ?
            </label>
            <div className="mt-2">
              <input
                type='date'   
                name='startDate'
                id='startDate'
                onChange={handleInputChange}
                value={objForAdditionalData.startDate}
                className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
          </div>

          <div className="col-span-5">
            <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900">
              Is your business primarily online, offline, or a combination of both?
            </label>
            <div className="mt-2">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="buisnessMode"
                value={objForAdditionalData.buisnessMode}
                onChange={handleInputChange}
              >
                <FormControlLabel value="Online" control={<Radio />} label="Online" />
                <FormControlLabel value="Offline" control={<Radio />} label="offline" />
                <FormControlLabel value="Both" control={<Radio />} label="both" />
              </RadioGroup>
            </div>
            {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
          </div>

          <div className="col-span-5">
            <label htmlFor="milestones" className="block font-medium leading-6 text-gray-900">
              Can you provide the url to your website or App?
            </label>
            <div className="mt-2">
              <input
                type='text'
                name='url'
                id='url'
                onChange={handleInputChange}
                value={objForAdditionalData.url}
                className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {/* {errorMessage.milestones && <p className='block mx-auto text-red-600 w-full'>{errorMessage.milestones}</p>} */}
          </div>

          <div className="col-span-5">
            <label htmlFor="queForManufacture" className="block font-medium leading-6 text-gray-900">
              How many products do you manufacture or deliver each month, and do you foresee any significant changes in production volume?
            </label>
            <div className="mt-2">
              <textarea
                name='queForManufacture'
                id='queForManufacture'
                rows={10}
                cols={50}
                onChange={(e) => handleInputChangeForLargeQuestions(e, 0)}
                value={objForAdditionalData.queForManufacture}
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
          // onClick={() => handleNext()}
          onClick={() => handleNextButton()}
        >
          Next</Button>
      </div>
    </main>
  )
}





// if (line.length === 0) {
//   return (
//     `<p key=${index}>&nbsp;</p>`
//   )
// } else {
//   return (
//     `<p key=${index}>${line}</p>`
//   )
// }



// const handleInputChange = (event: any, index: number) => {
//   const inputText = event.target.value;
//   setObjForAdditionalData(inputText);
  
//   // Split the input text by <p> elements
//   const lines = inputText.split(/<p[^>]*>/).filter(Boolean);
  
//   const convertedLines = lines.map((line: string, index: number) => {
//     // Trim whitespace from the beginning and end of each line
//     const trimmedLine = line.trim();
//     if (trimmedLine) {
//       return (
//         `<p key=${index}>${trimmedLine}</p>`
//       );
//     } else {
//       return `<br/>`;
//     }
//   });

//   const mergedLine = convertedLines.join('');
  
//   let newArray = [...arrayOfLargeQuestins];
//   newArray[index].ans.text = mergedLine;
//   setArrayOfLargeQuestins(newArray);
// };




//  Schema 

/**
 * startedSince
 * typeOfBusiness
 * link
 * AboutProductManufactring
 * avgSaleForMonths
 * avgViewForMonths
 * avgCustomerForMounths
 * avgSaleForYear
   avgViewForYear
   avgCustomerForYear
 * BuisnessTarget

 * 
 */
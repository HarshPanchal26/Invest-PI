import React, { SetStateAction, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import QueForPitchSection2 from '../Form_components/QueForPitchSection2';
import QueForPitchSection1 from '../Form_components/QueForPitchSection1';
import QueForPitchSection3 from '../Form_components/QueForPitchSection3';
import QueForPitchSection4 from '../Form_components/QueForPitchSection4';
import QueForPitchSection5 from '../Form_components/QueForPitchSection5';
import { TypeForFAQs , TypeForDetailsAboutBusiness} from '../../../../utils/type'
import QueForPitchSection6 from '../Form_components/QueForPitchSection6';
import QueForPitchSection7 from '../Form_components/QueForPitchSection7';


const steps = 
['Business Overview', 'Performance Metrics', 'Market and Competition', 'Financials and Costs', 'Target Audience' , 'Valuation & Equity', 'Desire Investor'];

type Props = {
  setDrawerOpen : React.Dispatch<SetStateAction<boolean>>
}

export default function FormForPitch({setDrawerOpen} : Props)  {

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const [objForAllQnA, setObjForAllQnA] = useState<TypeForFAQs>({
    Business: [],
    Performance: [],
    Market: [],
    Financials: [],
    Audience: [], 
    Equity : []
  });

  const [objForDetailsAboutBusiness , setObjForDetailsAboutBusiness] = useState<TypeForDetailsAboutBusiness>({
      startDate: '',
      buisnessMode: '',
      url: '',
      avgSixMonthSale: '',
      avgSixMonthViews: '',
      avgSixMonthCustomer: '',
      avgYearSale: '',
      avgYearViews: '',
      avgYearCustomer: '',
      targetAudiences: '',
      seekingFund : 0,
      currentValuation : 0,
      offeredEquity : 0,
      maximunofferedEquity : 0,
      fundingType : ''
  })

  const [arryForDesireInvestor , setArrayForDesireInvestor] = useState<Array<any>>([]);


  const isStepOptional = (step: number) => {
    return step === -1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className='w-full'>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className='mt-3 flex justify-start mx-2'>
            <Button
              variant='outlined'
              color="primary"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
          </div>
          <div className='h-auto mx-2'>
            {activeStep === 0 && <QueForPitchSection1
              handleNext={handleNext}
              objForAllQnA={objForAllQnA}
              setObjForAllQnA={setObjForAllQnA}
              objForDetailsAboutBusiness={objForDetailsAboutBusiness}
              setObjForDetailsAboutBusiness={setObjForDetailsAboutBusiness}
            />}

            {activeStep === 1 && <QueForPitchSection2
              handleNext={handleNext}
              objForAllQnA={objForAllQnA}
              setObjForAllQnA={setObjForAllQnA}
              objForDetailsAboutBusiness={objForDetailsAboutBusiness}
              setObjForDetailsAboutBusiness={setObjForDetailsAboutBusiness}
            />}
            {activeStep === 2 && <QueForPitchSection3
              handleNext={handleNext}
              objForAllQnA={objForAllQnA}
              setObjForAllQnA={setObjForAllQnA}
              objForDetailsAboutBusiness={objForDetailsAboutBusiness}
              setObjForDetailsAboutBusiness={setObjForDetailsAboutBusiness}
            />}
            {activeStep === 3 && <QueForPitchSection4
              handleNext={handleNext}
              objForAllQnA={objForAllQnA}
              setObjForAllQnA={setObjForAllQnA}
              objForDetailsAboutBusiness={objForDetailsAboutBusiness}
              setObjForDetailsAboutBusiness={setObjForDetailsAboutBusiness}
            />}
            {activeStep === 4 && <QueForPitchSection5
              handleNext={handleNext}
              objForAllQnA={objForAllQnA}
              setObjForAllQnA={setObjForAllQnA}
              objForDetailsAboutBusiness={objForDetailsAboutBusiness}
              setObjForDetailsAboutBusiness={setObjForDetailsAboutBusiness}
            />}
            {activeStep === 5 && <QueForPitchSection6
              handleNext={handleNext}
              objForAllQnA={objForAllQnA}
              setObjForAllQnA={setObjForAllQnA}
              objForDetailsAboutBusiness={objForDetailsAboutBusiness}
              setObjForDetailsAboutBusiness={setObjForDetailsAboutBusiness}
            />}
            {activeStep === 6 && <QueForPitchSection7
              handleNext={handleNext}
              objForAllQnA={objForAllQnA}
              setObjForAllQnA={setObjForAllQnA}
              objForDetailsAboutBusiness={objForDetailsAboutBusiness}
              setObjForDetailsAboutBusiness={setObjForDetailsAboutBusiness}
              arryForDesireInvestor={arryForDesireInvestor}
              setArrayForDesireInvestor={setArrayForDesireInvestor} 
              setDrawerOpen={setDrawerOpen}
            />}
          </div>
        </React.Fragment>
      )}
    </div>
  )
}



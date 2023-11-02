import React, { SetStateAction, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import QueForFundigRoundDetails from './Form_components/QueForFundigRoundDetails';
import QuestionForUseofFunds from './Form_components/QuestionForUseofFunds';


const steps = ['Funding Round Details', 'Use of Funds'];

type TypeForInvestorProfile = {
  name: string,
  type: string,
  profileImage: string,
  username: string,
  _id: string
}

type TypeForInvestments = {
  dateofInvestment: string,
  typeOfInvestment: string,
  leadInvestors: Array<TypeForInvestorProfile>,
  raisedAmount: number,
  allInvestor: Array<TypeForInvestorProfile>,
  lastValuation: number,
  milestones?: string,
  growth?: string
}

type props = {
  dataForInvestments: Array<any> | null,
  setDataForInvestments: React.Dispatch<SetStateAction<Array<any> | null>>,
  setDrawerOpen: React.Dispatch<SetStateAction<boolean>>
}

export default function FormForInvestments({ setDrawerOpen, dataForInvestments, setDataForInvestments }: props) {

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  // const isStepOptional = (step: number) => {
  //   return step === -1;
  // };

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

  const [objForNewInvestment, setObjForNewInvestment] = useState<TypeForInvestments>({
    dateofInvestment: '',
    typeOfInvestment: '',
    leadInvestors: [],
    raisedAmount: 0,
    allInvestor: [],
    lastValuation: 0,
    milestones: '',
    growth: ''
  })

  return (
    <div className='w-full'>
      {/* <Stepper activeStep={activeStep} sx={{display : 'hidden'}}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper> */}
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
            {activeStep === 0 && <QueForFundigRoundDetails
              handleNext={handleNext}
              objForNewInvestment={objForNewInvestment}
              setObjForNewInvestment={setObjForNewInvestment} />}
            {activeStep === 1 && <QuestionForUseofFunds
              handleNext={handleNext}
              objForNewInvestment={objForNewInvestment}
              setDrawerOpen={setDrawerOpen}
              setObjForNewInvestment={setObjForNewInvestment}
              dataForInvestments={dataForInvestments}
              setDataForInvestments={setDataForInvestments}
            />}
          </div>
          {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {/* {activeStep !== 2 && (
              <Button
                color="primary"
                variant='outlined'
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>)} */}
          <Box sx={{ flex: '1 1 auto' }} />
          {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button> */}
          {/* </Box> */}
        </React.Fragment>
      )}
    </div>
  )
}

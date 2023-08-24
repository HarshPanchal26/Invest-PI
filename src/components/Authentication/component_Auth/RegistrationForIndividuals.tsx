import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonalDetailsForIndividuals from '../component_Forms/PersonalDetailsForIndividuals';
import SignInForm from '../component_Forms/SignInForm';
import Interest from '../component_Forms/Interest';
import InterestInInvestment from '../component_Forms/InterestInInvestment';

const steps = ['Personal Details',  'Want to Invest'  , 'Your Innterest', 'Verification'];

export default function RegistrationForIndividuals() {

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [objForSignInComonent, setObjForSignInComonent] = React.useState<Object | null>(null);
  const [ArrayForInterest,setArrayForInterest] = React.useState<Array<string>>([]);
  
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

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} >
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
            <Step key={label} {...stepProps} className='md:block hidden'>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
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
          {activeStep !== 0 && activeStep !==1  && 
          (<div className='my-10 flex justify-start mx-2'>
            <Button
              variant='outlined'
              color="primary"
              // disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
          </div>)}
          <div className='h-auto mx-2'>
            {activeStep === 0 && <PersonalDetailsForIndividuals 
                                  handleNext={handleNext} 
                                  setObjForSignInComonent={setObjForSignInComonent}
                                  />}
            {activeStep === 1 && <InterestInInvestment
                                  handleNext={handleNext} 
                                  setObjForSignInComonent={setObjForSignInComonent}
                                  />}                    
            {activeStep === 2 && <Interest 
                                  handleNext={handleNext}
                                  setArrayForInterest={setArrayForInterest}/>}
            {activeStep === 3 && <SignInForm 
                                  objForSignInComonent={objForSignInComonent}
                                  ArrayForInterest={ArrayForInterest}
            />}
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {activeStep !== 2 && (
            <Button
              color="primary"
              variant='outlined'
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>)}
            <Box sx={{ flex: '1 1 auto' }} />
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
          */}
            {/* <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>  */}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

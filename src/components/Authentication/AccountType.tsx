
import Logo from '../../Assets/logo'
import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const steps = ['Select Categoery', 'Select Subcategory'];

const categoryForUser =
    [
        { URL: '', title: 'Investor', value: 'investor' },
        { URL: '', title: 'Founder', value: 'founder' },
        // { URL: '', title: 'Business', value: 'business' },
        { URL: '', title: 'Compony/Products', value: 'product' }
    ]

const objForFounder = [
    { URL: '', title: 'Individual Founder', value: 'founder' },
    { URL: '', title: 'Start Up Compony', value: 'startUp' }
]

const objForInvestor = [
    { URL: '', title: 'Individual Investor', value: 'investor' },
    { URL: '', title: 'Capital Firm', value: 'CF' }
]

export default function AccountType() {

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const [typeOfUser, setTypeOfUser] = React.useState<String>("");
    const [loader, setloader] = React.useState<boolean>(false)

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

    const categoryDidSelect = (value: String) => {
        if (value === "business" || value === "founder" ||value === "product" ) 
        window.location.href = `/registration?type=${value}`
        else {
            setTypeOfUser(value);
            handleNext();

        }
    }

    const subCatergoryDidSelect = (value: String) => {
        window.location.href = `/registration?type=${value}`
    }

    const checkAutorization = async () => {
        await axios.get('/signin/authorization').then((result) => {
            console.log("res from account type", result)
            if(!result.data.authorized){
                setloader(false)
            }else{
                window.location.href = '/feed'
            }
        }).catch((error) => {
            console.log("error from account type", error)
            setloader(false)
        })
    }

    React.useEffect(() => {
        checkAutorization();
    }, [])

    if (!loader) {
        return (
            // <div className='mx-5 border border-red-400'>
            <div className='border h-full '>
                <div className='hidden'>
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
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </div>
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
                        <Box sx={{ mt: 2, mb: 1 }}>
                            {activeStep === 0 && (
                                <div className=' flex items-center justify-center h-full flex-col '>
                                    <Logo />
                                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl my-10">Slecte your Preference</p>
                                    <div className='p-4 rounded-lg w-[80%] lg:w-5/6 text-center flex sm:flex-row flex-col flex-wrap h-[80%] md:bg-gray-200'>
                                        {/* Boxes */}

                                        {categoryForUser.map((item, index) => {
                                            return (
                                                <div className='shadow-lg w-auto h-full rounded-lg text-center text-3xl my-10 mx-auto cursor-pointer border border-black bg-white ' 
                                                onClick={() => categoryDidSelect(item.value)}>
                                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyF_wARWd9jbfA9k88RvbIj-c-KWBYOsqAeg&usqp=CAU' alt='Innvestor iamge ' className='h-full w-[200px] mx-auto rounded-lg'></img>
                                                    <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900  my-10 mx-4">{item.title}</p>
                                                </div>)
                                        })
                                        }

                                    </div>
                                </div>)}
                            {activeStep === 1 && typeOfUser === 'investor' && (
                                <div className=' flex items-center justify-center h-auto flex-col po'>
                                    <Logo />
                                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl my-10">Slecte your Preference</p>
                                    <div className='p-4 rounded-lg w-[80%] lg:w-5/6 text-center flex sm:flex-row flex-col flex-wrap h-[80%]  md:bg-gray-200'>
                                        {/* Boxes */}

                                        {objForInvestor.map((item, index) => {
                                            return (
                                                <div className='shadow-lg w-auto h-full rounded-lg text-center text-3xl my-10 mx-auto cursor-pointer border border-black bg-white ' 
                                                onClick={() => subCatergoryDidSelect(item.value)}>
                                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyF_wARWd9jbfA9k88RvbIj-c-KWBYOsqAeg&usqp=CAU' alt='Innvestor iamge ' className='h-full w-[200px] mx-auto rounded-lg'></img>
                                                    <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900  my-10 mx-4">{item.title}</p>
                                                </div>)
                                        })
                                        }

                                    </div>
                                </div>)}
                            

                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}
                            {/* <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button> */}
                        </Box>
                    </React.Fragment>
                )}
            </div>
        );
    } else {
        return (
            <div className='mx-10'>
                <h1>lorem300</h1>
            </div>
        )
    }
}
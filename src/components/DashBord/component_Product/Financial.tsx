import React, { useContext, useEffect, useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BasicTable from './BasicTable';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { ContextForDashBord } from '../../../context/contextForDashBord';
import NoData from '../../../Assets/NoData';
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Drawer from '@mui/material/Drawer';
import FormForInvestments from './FormForInvestments';
import CloseIcon from '@mui/icons-material/Close';


export default function Financial() {

    const contextForDashBord = useContext(ContextForDashBord);

    const [dataForFinance, setDataForFinance] = useState<any | null>(null);
    const [dataForInvestors, setDataForInvestors] = useState<any | null>(null);

    const [openDrawer, setDrawerOpen] = useState<boolean>(false);

    useEffect(() => {
        if (dataForFinance === null) {
            console.log("Financial", contextForDashBord.USER.PRODUCTINSIDE)
            setDataForFinance(contextForDashBord.USER.PRODUCTINSIDE);
            setDataForInvestors(contextForDashBord.USER.PRODUCTINSIDE.financial.history);
        }
        console.log("Inside of product", contextForDashBord.USER.PRODUCTINSIDE.financial.history);
    }, []);

    const handleNewInvestmetns = () => {
        setDrawerOpen(true);
    }

    return (
        <div className='p-1 h-full w-full '>
            <div className='flex md:flex-row flex-col md:space-x-4 h-auto w-full gap-y-3'>
                <div className='p-5 text-center sm:w-full shadow-md'>
                    Valuation <span className='text-blue-700 ml-3'>
                        {dataForFinance && dataForFinance.financial.history.length === 0 ? 0 : '$10M'}
                    </span><span className='mx-3'><ArrowForwardIosIcon /></span>
                </div>
                <div className=' p-5 text-center sm:w-full shadow-md'>
                    Funding Amount <span className='text-blue-700 ml-3'>
                        {dataForFinance && dataForFinance.financial.history.length === 0 ? 0 : '$10M'}
                    </span><span className='mx-3'><ArrowForwardIosIcon /></span>
                </div>
                <div className=' p-5 text-center sm:w-full shadow-md'>
                    Investor <span className='text-blue-700 ml-3'>
                        {dataForFinance && dataForFinance.financial.history.length === 0 ? 0 : '$10M'}
                    </span><span className='mx-3'><ArrowForwardIosIcon /></span>
                </div>
                <div className=' p-5 text-center sm:w-full shadow-md'>
                    Lead Investor
                    <span className='text-blue-700 ml-3'>
                        {dataForFinance && dataForFinance.financial.history.length === 0 ? 0 : '$10M'}
                    </span><span className='mx-3'><ArrowForwardIosIcon /></span>
                </div>
            </div>
            {/* Section For Details about Investment and Funding  */}
            <main className='w-full p-3 border-b my-6 flex md:flex-row flex-col gap-2 '>
                {/* Funding Tables */}

                <div className='my-5 md:w-3/4 w-full md:order-1 order-2'>
                    <div className='flex flex-row justify-between'>
                        <p className='text-2xl font-bold text-left mx-3 my-2 border-b'>
                            Investment History</p>
                        <IconButton
                            aria-label="upload picture"
                            component="span"
                            className="h-12 w-12 my-2 cursor-pointer bg-black mx-10"
                            style={{ color: 'black' }}
                        // onClick={() => navigate(-1)}
                        >
                            <EditIcon />
                        </IconButton>
                    </div>
                    <div className='w-full mt-4'>
                        {dataForFinance && dataForFinance.financial.history.length === 0 ?
                            <NoData /> :
                            <>
                                {dataForInvestors !== null && (
                                    <BasicTable
                                        dataofInvestor={dataForInvestors}
                                        setDataForInvestors={setDataForInvestors}
                            />)}
                            </>
                        }
                    </div>
                </div>

                <div className='md:w-1/4 w-full text-center md:order-2 order-1'>
                    <div className='w-full mt-5'>
                        <Button variant='contained' color='primary' style={{
                            marginRight: '1.3rem',
                            padding: "14px 14px"
                        }}
                            onClick={handleNewInvestmetns}
                        >
                            <AddIcon /> <span className='ml-2'>Investment</span>
                        </Button>
                    </div>
                    <p className='text-2xl font-bold text-left mx-3 mt-10 border-b'>Valuation </p>
                    <p className='font-medium text-left mx-4 md:mt-10'>
                        Hey Share your Investment achivments with me , I'll Showcase them here.
                    </p>
                </div>

            </main>

            {/* {dataForFinance && dataForFinance.financial.history.length !== 0 &&
                <div className='mt-4 w-2/3'>
                    <p className='text-2xl font-bold text-left mx-3 my-2'>
                        Investors
                    </p>
                    <BasicTable dataofInvestor={dataForInvestors}/>
                </div>
            } */}
            <Drawer
                anchor='bottom'
                open={openDrawer}
                onClose={() => setDrawerOpen(false)}
            >
                <div className='w-full h-[800px] overflow-auto'>
                    <div className='border'>
                        <IconButton
                            aria-label="upload picture"
                            component="span"
                            className="h-12 w-12 cursor-pointer bg-black border my-auto"
                            style={{ color: 'black' }}
                            onClick={() => setDrawerOpen(false)}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <FormForInvestments setDrawerOpen={setDrawerOpen} />
                </div>
            </Drawer>
        </div>
    )
}


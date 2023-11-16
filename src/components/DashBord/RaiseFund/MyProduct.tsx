import React, { useEffect, useState } from 'react'
import { useContext } from "react"
import { ContextForDashBord } from '../../../context/contextForDashBord'
import { Avatar } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Summary from './product_components/Summary';
import Financial from './product_components/Financial';
import News from './product_components/News';
import PeopleForProducts from './product_components/PeopleForProducts';
import USPs from './product_components/USPs';
import Media from './product_components/Media';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div className='p-1 w-full'>
                    <Typography>{children}</Typography>
                </div>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function MyProduct() {

    const contextForDashBord = useContext(ContextForDashBord);

    const [value, setValue] = React.useState(0);

    const [verifyedRoute, setVerifyedRoute] = useState<boolean>(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    useEffect(() => {
        if (contextForDashBord.USER.TYPE === 'product') {
            setVerifyedRoute(true)
        }
    }, [contextForDashBord])

    return (
        <>
            {verifyedRoute && (
                <div className='h-auto w-full'>
                    <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-6 gap-y-0 ">
                        <div className='col-span-1 order-1 mx-auto '>
                            <Avatar
                                alt="Remy Sharp"
                                src={contextForDashBord.USER.PROFILEIMAGE}
                                sx={{ width: 100, height: 100 }}
                                className='my-5 mx-2'
                            />
                        </div>
                        <div className='my-5 md:col-span-4 md:text-left col-span-full md:order-2 order-3 text-center'>
                            <span className='text-lg  text-slate-500'>Product</span>
                            <p className='text-3xl font-bold my-2'>{contextForDashBord.USER.COMPANYNAME}</p>
                        </div>
                        <div className='my-5 md:order-3 order-2 cursor-pointer'>
                            <span className='text-lg  text-slate-500'>Rank</span>
                            <p className='text-3xl font-bold my-2 underline'>1</p>
                        </div>
                    </div>
                    <div className='w-full h-auto p-1'>
                        <Box sx={{ borderColor: 'divider', marginTop: '2px' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Summary" {...a11yProps(0)} />
                                <Tab label="Financial" {...a11yProps(1)} />
                                {/* <Tab label="News" {...a11yProps(2)} /> */}
                                <Tab label="USP" {...a11yProps(2)} />
                                <Tab label="Media" {...a11yProps(3)} />
                                <Tab label="Pepole" {...a11yProps(4)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <Summary />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Financial />
                        </CustomTabPanel>
                        {/* <CustomTabPanel value={value} index={2}>
                            <News />
                        </CustomTabPanel> */}
                        <CustomTabPanel value={value} index={2}>
                            <USPs />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            <Media />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={4}>
                            <PeopleForProducts />
                        </CustomTabPanel>
                    </div>
                </div>)}
            {!verifyedRoute && (
                <div className='border border-red-600'>
                      "You Have to create a accout for your product in oreder to view this page"  
                </div>
            )}   
        </>
    )
}


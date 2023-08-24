import React, { useEffect, useContext, useState } from 'react'
import { Avatar } from '@mui/material'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SendIcon from '@mui/icons-material/Send';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ContextForDashBord } from "../../context/contextForDashBord";
import Loading from '../../Assets/Loading';

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
                <div className='bg-slate-50 p-3 h-auto'>
                    <Typography>{children}</Typography>
                    <Typography>{children}</Typography>
                    <Typography>{children}</Typography>
                    <Typography>{children}</Typography>
                    <Typography>{children}</Typography>
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

export default function Profile() {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [loader, setLoader] = useState<boolean>(true);
    const [dataForProfilePage , setDataForProfilePage] = useState<any>({});

    const contextForDashBord = useContext(ContextForDashBord);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (contextForDashBord.isAutorizedUser) {
            setLoader(false);
            setDataForProfilePage(contextForDashBord.USER)
            // console.log("Data from profile", contextForDashBord.USER);
        } else {
            contextForDashBord.checkAuthorization();
        }
    } , [contextForDashBord])
    return (
        <>
            {
                loader && (
                    <Loading />
                )
            }
            {
                !loader && (
                    <div className="bg-white overflow-hidden w-auto border">
                        {/* Header */}
                        <header className="h-auto">
                            <div
                                className="flex h-44 border-b bg-slate-200"
                                style={{
                                    backgroundImage: `url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                {/* <h1 className="text-2xl text-black font-semibold">User Profile</h1> */}
                                {/* <button className="px-4 py-2 bg-pink-500 text-white font-semibold rounded hover:bg-pink-600 transition duration-300 ease-in-out">
                                Connect
                            </button> */}
                            </div>
                        </header>

                        {/* Profile */}
                        <main className='relative bottom-24 z-0'>
                            <section className="py-8">
                                <div className="flex mx-10">
                                    <div className="relative">

                                        <Avatar
                                            alt="Remy Sharp"
                                            src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQCyzdroOgXf1JRT-59-ejJoIE0a9KVvyVwXUrA5xytU8gCuncLXYXL3DO2b1_-YnaUWD0lgEsd3ddXvZg"
                                            sx={{ width: 160, height: 160 }}
                                            className="rounded-full w-40 h-40 border-4 border-white shadow-lg"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex flex-row border bg-slate-50 rounded-md mx-4 justify-between">
                                    <div className='flex flex-col'>
                                        <div className='block my-2 mx-6 '>
                                            <b className='text-2xl font-black flex '>{dataForProfilePage?.companyname}</b>
                                        </div>

                                        <div className="block w-10/12 max-h-auto mx-6">
                                            <p className="text-gray-600 mt-2 flex text-left">
                                                Prime Minister Of India.
                                            </p>
                                        </div>

                                        <div className='flex my-2 mx-2 flex-row'>
                                            <a href="#" className="text-blue-600 hover:underline mx-4">
                                                <b>{`500 followers `} </b>
                                            </a>
                                            <a href="#" className="text-blue-600 hover:underline">
                                                <b>{` 1 following`}</b>
                                            </a>
                                        </div>

                                        <div className='block my-2 mx-6'>
                                            <p className='text-lg text-gray-500 mt-2 flex '>
                                                {'Suart, Gujarat, India'}
                                            </p>
                                        </div>

                                        <div className='block my-2 mx-6'>
                                            <Stack direction="row" spacing={1}>
                                                <Chip icon={<TaskAltIcon />} label="Follow" variant='filled' color='primary' style={{
                                                    padding: '10px'
                                                }} />
                                                <Chip icon={<SendIcon />} label="Message" variant="filled" color='primary' style={{
                                                    padding: '10px'
                                                }} />
                                            </Stack>

                                        </div>
                                    </div>
                                    <div className='felx flex-col mr-2'>
                                        <div className='my-2'>
                                            <Button
                                                id="demo-positioned-button"
                                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                <MoreVertIcon style={{
                                                    "color": "blue"
                                                }} />
                                            </Button>
                                            <Menu
                                                id="demo-positioned-menu"
                                                aria-labelledby="demo-positioned-button"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >
                                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                                            </Menu>
                                        </div>
                                        <div className='my-2 w-7 h-7 mx-auto'>
                                            <PencilSquareIcon style={{
                                                "color": "blue"
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* main content */}
                            <div className='border-t flex flex-col'>
                                {/* About Section */}
                                <section className="flex flex-col py-4  border-gray-200 ">
                                    <h3 className="flex text-2xl mx-3 font-bold">
                                        {'About'}
                                    </h3>
                                    <p className='border felx text-left my-3 mx-3 p-3 bg-slate-50 rounded-md'>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi at provident suscipit. Sequi minima ullam in obcaecati facere adipisci consequatur ab aperiam labore, quam perspiciatis, repudiandae quibusdam illum animi necessitatibus itaque nisi voluptatem sit! Itaque maxime exercitationem similique. Corporis consectetur eum est, quam eveniet libero mollitia! Natus doloremque dicta magnam facilis vero perspiciatis est necessitatibus saepe nostrum delectus aliquid laudantium dolores optio facere nisi, deserunt voluptatem! Rerum, eaque soluta accusantium fuga, perspiciatis quo quidem voluptates, distinctio et mollitia provident! Deleniti labore minus id quasi illum odit blanditiis sed nobis, rem expedita ipsa iste asperiores? Fugiat magnam similique aut quia suscipit!
                                    </p>
                                </section>

                                {/* tab*/}
                                <div className='border mx-2 rounded-md'>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="Thoughts" {...a11yProps(0)} />
                                            <Tab label="Companies" {...a11yProps(1)} />
                                            <Tab label="Investment" {...a11yProps(2)} />
                                        </Tabs>
                                    </Box>
                                    <CustomTabPanel value={value} index={0}>
                                        Thoughts
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={1}>
                                        Companies
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={2}>
                                        Investment
                                    </CustomTabPanel>
                                </div>

                                {/* tab*/}


                            </div>
                        </main>


                    </div>
                )
            }
        </>
    )

}

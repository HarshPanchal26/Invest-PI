import React, { useEffect, useState, useContext } from 'react'
import { Avatar, IconButton } from '@mui/material'
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
import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UpdateCoverImage from './update_component/UpdateCoverImage';
import UpdateProfileImage from './update_component/UpdateProfileImage';
import UpdateMainForIndividual from './update_component/UpdateMainForIndividual';
import UpdateAboutForIndividual from './update_component/UpdateAboutForIndividual';
import { ContextForDashBord } from '../../context/contextForDashBord';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

type StateTypeForModal = {
    open: boolean,
    child: any
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
                    {children}
                </div>
            )}
        </div>
    );
}

// function CustomTabPanel2(props: TabPanelProps) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <div className='bg-slate-50 p-3 h-auto'>
//                     {children}
//                 </div>
//             )}
//         </div>
//     );
// }

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const styleForModal: any = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

export default function ProfileForIndividual({ objForProfile }: any) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [dataForProfilePage, setDataForProfilePage] = useState<any>({});
    const contextForDashBord = useContext(ContextForDashBord)

    const [modalData, setModalData] = React.useState<StateTypeForModal>({
        open: false,
        child: null
    });
    const handleOpenForModal = (feild: string) => {
        setModalData({
            open: true,
            child: feild
        })
    }

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
        setDataForProfilePage(objForProfile);
    }, [objForProfile])
    return (
        <>
            <div className="bg-white overflow-hidden w-auto border">
                {/* Header */}
                <header className="h-auto">
                    <div className="flex h-44 border-b bg-slate-200 relative">
                        <div className="flex-grow flex justify-end">
                            <img
                                src={objForProfile.COVERIMAGE}
                                alt='coverImage'
                                className='h-full w-full z-1'
                                style={{ position: 'absolute', top: 0, left: 0 }}
                            />
                            <IconButton
                                aria-label="upload picture"
                                component="span"
                                className="h-12 w-12 my-2 cursor-pointer bg-black"
                                style={{ color: 'white', zIndex: 10 }}
                                onClick={() => handleOpenForModal('Cover')}
                            >
                                <PencilSquareIcon />
                            </IconButton>
                        </div>
                    </div>

                </header>

                {/* Profile */}
                <main className='relative bottom-24 z-0'>
                    <section className="py-8">
                        <div className="flex mx-10">
                            <div className="relative">
                                <IconButton onClick={() => handleOpenForModal('Profile')}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={objForProfile.PROFILEIMAGE}
                                        sx={{ width: 160, height: 160 }}
                                        className="rounded-full w-40 h-40 border-4 border-white shadow-lg"
                                    />
                                </IconButton>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-row border bg-slate-50 rounded-md mx-4 justify-between">
                            <div className='flex flex-col'>
                                <div className='block my-2 mx-6 '>
                                    <b className='text-2xl font-black flex '>{dataForProfilePage?.FIRST_NAME + " " + dataForProfilePage?.LAST_NAME}</b>
                                    <b className='text-lg font-light flex my-2'>@{dataForProfilePage?.USERNAME}</b>
                                </div>

                                <div className="block w-10/12 max-h-auto mx-6">
                                    <p className="text-gray-600 mt-2 flex text-left">
                                        {dataForProfilePage?.BIO}
                                    </p>
                                </div>

                                <div className='flex my-2 mx-2 flex-row'>
                                    <a href="#" className="text-blue-600 hover:underline mx-4">
                                        <b>{`${dataForProfilePage?.FOLLOWER} followers `} </b>
                                    </a>
                                    <a href="#" className="text-blue-600 hover:underline">
                                        <b>{` ${dataForProfilePage?.FOLLOWING} following`}</b>
                                    </a>
                                </div>

                                <div className='block my-2 mx-6'>
                                    <p className='text-lg text-gray-500 mt-2 flex '>
                                        {dataForProfilePage?.CITY} ,{dataForProfilePage?.STATE} ,{dataForProfilePage?.COUNTRY}
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
                                <div className='my-2'>
                                    <Button
                                        id="demo-positioned-button"
                                        onClick={() => handleOpenForModal('Main')}
                                    >
                                        <PencilSquareIcon style={{
                                            "color": "blue",
                                            "width": '25px',
                                            "height": '25px'
                                        }} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* main content */}
                    <div className='my-3 flex flex-col'>
                        {/* About Section */}
                        <div className='border mx-2 rounded-md'>
                            <div className="flex flex-row justify-between">
                                <p className='text-2xl mx-3 font-bold p-2'>{'About'}</p>
                                <IconButton
                                    aria-label="upload picture"
                                    className="h-12 w-12 cursor-pointer bg-black mr-1"
                                    style={{ color: 'black' }}
                                    onClick={() => handleOpenForModal('About')}
                                >
                                    <PencilSquareIcon />
                                </IconButton>
                            </div>
                            <section className="flex flex-col py-4  border-gray-200">
                                <p className='felx text-left my-3 mx-3 p-3 bg-slate-50 rounded-md'>
                                    {dataForProfilePage?.ABOUT}
                                </p>
                            </section>
                        </div>

                        {/* tab*/}
                        <div className='border mx-2 rounded-md my-4'>
                            <div className="flex flex-row justify-between">
                                <p className='text-2xl mx-3 font-bold p-2'>{'Activity'}</p>
                                <IconButton
                                    aria-label="upload picture"
                                    className="h-12 w-12 cursor-pointer bg-black mr-1"
                                    style={{ color: 'black' }}
                                    onClick={() => handleOpenForModal('activity')}
                                >
                                    <PencilSquareIcon />
                                </IconButton>
                            </div>
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


                    </div>
                </main>
            </div>

            <Modal
                open={modalData.open}
                // onClose={handleCloseForModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='mx-2'
            >
                <div className='w-full md:min-w-[600px] bg-white p-4 rounded-xl md:w-auto' style={styleForModal}>
                    <div className='p-2 text-2xl flex flex-row justify-between '>
                        <p className='my-auto  p-3 bg-gray-200 rounded-md'>{`${modalData.child} Sction`}</p>
                        <div className=' mr-0 my-auto bg-gray-200 rounded-full'>
                            <IconButton
                                aria-label="upload picture"
                                component="span"
                                className="h-12 w-12 cursor-pointer bg-black border my-auto"
                                style={{ color: 'black' }}
                                onClick={() => setModalData({ open: false, child: null })}
                            >
                            <CloseIcon />
                            </IconButton>
                        </div>
                    </div>
                    {modalData.child === 'Profile' && <UpdateProfileImage objForProfile={objForProfile} closeModal={setModalData} />}
                    {modalData.child === 'Cover' && <UpdateCoverImage objForProfile={objForProfile} closeModal={setModalData} />}
                    {modalData.child === 'Main' && <UpdateMainForIndividual objForProfile={objForProfile} />}
                    {modalData.child === 'About' && <UpdateAboutForIndividual objForProfile={objForProfile} />}
                    {/* {modalData.child === 'activity' && <UpdatActivityForCompany />} */}
                </div>
            </Modal>
        </>
    )
}
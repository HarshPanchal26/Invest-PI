import React, { useEffect, useState } from 'react'
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
import UpdatActivityForCompany from './update_component/UpdatActivityForCompany';
import UpdateAboutForCF from './update_component/UpdateAboutForCF';
import UpdateMainForCF from './update_component/UpdateMainForCF';
import CloseIcon from '@mui/icons-material/Close';
import UpdateProfileImage from './update_component/UpdateProfileImage';
import UpdateCoverImage from './update_component/UpdateCoverImage';
// import BackButton from '../../../Assets/BackButton';
import BackButton from '../../Assets/BackButton';
import Post from '../DashBord/Home/components/Post';
import NoData from '../../Assets/NoData';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

type StateTypeForModal = {
    open: boolean,
    child: any
}

// type TypeForProfileObj = {
//     objForProfile: any,
//     loader: boolean
// }   

type props = {
    objForProfile: any
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

function CustomTabPanel2(props: TabPanelProps) {
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

export default function ProfileForCF({ objForProfile }: props) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [dataForProfilePage, setDataForProfilePage] = useState<any>({});

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
    const [valueForAbout, setvalueForAbout] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeForAboutSection = (event: React.SyntheticEvent, newValue: number) => {
        setvalueForAbout(newValue);
    };

    useEffect(() => {
        setDataForProfilePage(objForProfile);
    }, [objForProfile])
    return (
        <>
            <BackButton />
            <div className="bg-white overflow-hidden w-auto border">
                {/* Header */}
                <header className="h-auto">

                    <div
                        className="flex h-44 border-b bg-slate-200 justify-end"
                        style={{
                            backgroundImage: `url(${dataForProfilePage?.COVERIMAGE})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <IconButton
                            aria-label="upload picture"
                            component="span"
                            className="h-12 w-12 my-2 cursor-pointer bg-black"
                            style={{ color: 'white' }}
                            onClick={() => handleOpenForModal('Cover')}
                        >
                            <PencilSquareIcon />
                        </IconButton>
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
                                        src={dataForProfilePage?.PROFILEIMAGE}
                                        sx={{ width: 160, height: 160 }}
                                        className="rounded-full w-40 h-40 border-4 border-white shadow-lg"
                                    />
                                </IconButton>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-row border bg-slate-50 rounded-md mx-4 justify-between">
                            <div className='flex flex-col'>
                                <div className='block my-2 mx-6 '>
                                    <b className='text-2xl font-black flex '>{dataForProfilePage?.FIRMNAME}</b>
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
                                {objForProfile.USERTYPE !== 'USERS' && (
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
                                )}
                            </div>
                            {objForProfile.USERTYPE === 'USERS' && (
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
                            )}
                        </div>
                    </section>
                    {/* main content */}
                    <div className='my-3 flex flex-col'>
                        {/* About Section */}
                        <div className='border mx-2 rounded-md'>
                            <div className="flex flex-row justify-between">
                                <p className='text-2xl mx-3 font-bold p-2'>{'About'}</p>
                                {objForProfile.USERTYPE === 'USERS' && (
                                <IconButton
                                    aria-label="upload picture"
                                    className="h-12 w-12 cursor-pointer bg-black mr-1"
                                    style={{ color: 'black' }}
                                    onClick={() => handleOpenForModal('About')}
                                >
                                    <PencilSquareIcon />
                                </IconButton>
                                )}
                            </div>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={valueForAbout} onChange={handleChangeForAboutSection} aria-label="basic tabs example">
                                    <Tab label="About" {...a11yProps(0)} />
                                    <Tab label="Details" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel2 value={valueForAbout} index={0}>
                                <section className="flex flex-col py-4  border-gray-200">
                                    <p className='felx text-left my-3 mx-3 p-3 bg-slate-50 rounded-md'>
                                        {dataForProfilePage?.ABOUT}
                                    </p>
                                </section>
                            </CustomTabPanel2>
                            <CustomTabPanel2 value={valueForAbout} index={1}>
                                <div>
                                    <div className="px-4 sm:px-0 my-3">
                                        <h3 className="text-base font-semibold leading-7 text-gray-900">{`Information about ${dataForProfilePage?.USERNAME}`}</h3>
                                    </div>
                                    <div className="mt-6 border-t border-gray-100">
                                        <dl className="divide-y divide-gray-100">

                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Firm Name </dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{dataForProfilePage?.FIRMNAME}</dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Firm Categoy </dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{dataForProfilePage?.CATEGORIES}</dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Headquarters/ Office</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                    {dataForProfilePage?.HEADQUARTERS} , {dataForProfilePage?.CITY} , {dataForProfilePage?.COUNTRY}</dd>
                                            </div>

                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Link</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                    {dataForProfilePage?.LINK}
                                                </dd>
                                            </div>

                                        </dl>
                                    </div>
                                </div>
                            </CustomTabPanel2>
                        </div>

                        {/* tab*/}
                        <div className='border mx-2 rounded-md my-4'>
                            <div className="flex flex-row justify-between">
                                <p className='text-2xl mx-3 font-bold p-2'>{'Activity'}</p>
                                {objForProfile.USERTYPE === 'USERS' && (
                                <IconButton
                                    aria-label="upload picture"
                                    className="h-12 w-12 cursor-pointer bg-black mr-1"
                                    style={{ color: 'black' }}
                                    onClick={() => handleOpenForModal('Activity')}
                                >
                                    <PencilSquareIcon />
                                </IconButton>
                                )}
                            </div>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Thoughts" {...a11yProps(0)} />
                                    <Tab label="Companies" {...a11yProps(1)} />
                                    <Tab label="Investment" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                <Post ArrayOfthoughts={objForProfile.ARRAYOFTHOUGHTS} />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                {objForProfile?.COMPANIES.length === 0 && (
                                    <NoData />
                                )}
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>
                                {objForProfile?.INVESTMENTS.length === 0 && (
                                    <NoData />
                                )}
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
                <div className='w-full bg-white p-4 rounded-xl md:w-auto min-h-[400px] min-w-[400px]' style={styleForModal}>
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
                    {modalData.child === 'Main' && <UpdateMainForCF objForProfile={objForProfile} closeModal={setModalData} />}
                    {modalData.child === 'Cover' && <UpdateCoverImage objForProfile={objForProfile} closeModal={setModalData} />}
                    {modalData.child === 'About' && <UpdateAboutForCF
                        objForProfile={objForProfile}
                        closeModal={setModalData}
                    />
                    }
                    {modalData.child === 'Activity' && <UpdatActivityForCompany />}
                </div>
            </Modal>
        </>
    )
}
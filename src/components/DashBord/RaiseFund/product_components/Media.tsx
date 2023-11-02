import React, { useState, useRef, useEffect, useContext } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Button } from '@mui/material';
import { generateMediaData, ArrayForMediaData } from '../../../../utils/factory/MedaiData';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ContextForDashBord } from '../../../../context/contextForDashBord';
import axios from 'axios';
import { Backdrop } from '@mui/material';
import { CircularProgress } from '@mui/material';

type TypeForMediaData = {
    id: number,
    img: string,
    title: string,
    subtitle: string,
    rows?: number,
    cols?: number,
    featured?: true,
}

const styleForModal: any = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

export default function Media() {

    const [sideBarImageObj, setsideBarImageObj] = useState<TypeForMediaData>({
        id: -1,
        img: '',
        title: 'Please Select Pic form side pannle',
        subtitle: '',
        rows: 2,
        cols: 2,
        featured: true,
    });

    const [fileForUpdate, setFileForUpadet] = useState<File | null>(null);

    const formData = new FormData();

    const [origianlArrayForAllMedia, setOrigianlArrayForAllMedia] = useState<Array<TypeForMediaData> | null>(null);

    const [openmodal, setModal] = useState<boolean>(false)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [openBackDrop, setBackDrop] = useState<boolean>(false)
    const contextForDashBord = useContext(ContextForDashBord);

    const handleImageSelction = (index: number) => {
        if (origianlArrayForAllMedia !== null) {
            let Obj = origianlArrayForAllMedia[index];
            setsideBarImageObj(Obj);
        }
    }

    const OpenModal = (index: number) => {
        if (origianlArrayForAllMedia !== null) {
            let Obj = origianlArrayForAllMedia[index];
            setsideBarImageObj(Obj);
        }
        setModal(true);
    }


    const onClickOnInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current?.click();
        }
    }

    const changeProfileURL = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const blobUrl = URL.createObjectURL(selectedFile);
            setsideBarImageObj({
                ...sideBarImageObj,
                img: blobUrl
            })
            setFileForUpadet(selectedFile);
        }
    }

    const onChangeTitleAndSubTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setsideBarImageObj({
            ...sideBarImageObj,
            [name]: value
        })
    }


    const handleUpdateForImage = async () => {
        if (origianlArrayForAllMedia !== null) {
            setBackDrop(true);
            try {
                fileForUpdate && formData.append('media', fileForUpdate);
                formData.append('data', JSON.stringify(sideBarImageObj));
                const res = await axios.post('/api/product/create/media', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    }
                })
                console.log("res for media " ,res)
                if (origianlArrayForAllMedia !== null) {
                    let updateArray = [...origianlArrayForAllMedia];
                    updateArray[sideBarImageObj.id] = sideBarImageObj;
                    setOrigianlArrayForAllMedia(updateArray);
                    ArrayForMediaData[sideBarImageObj?.id] = sideBarImageObj;
                }
                setBackDrop(false);
                setFileForUpadet(null);
            } catch (error: any) {
                alert(error.message)
                setBackDrop(false);
            }
            console.log("sideBarImageObj" , sideBarImageObj)

        }

        window.innerWidth < 1200 && setModal(false);
    }

    useEffect(() => {
        if (origianlArrayForAllMedia === null) {
            let newArray: Array<TypeForMediaData> = generateMediaData(contextForDashBord.USER.PRODUCTINSIDE.media);
            setOrigianlArrayForAllMedia(newArray);
        }
    }, []);

    return (
        <div className='p-1'>
            <div className='flex xl:flex-row flex-col w-full'>
                <div className='xl:block hidden w-1/2 p-4 mr-4'>
                    {sideBarImageObj.id !== -1 &&
                        (<>
                            <div className='mx-auto w-3/4 h-fit'>
                                <p className='h-full text-center text-red-700 my-auto'>{'Click on Image to update .'}</p>
                                <ImageListItem className='cursor-pointer'
                                    onClick={onClickOnInput}
                                >
                                    <img
                                        srcSet={`${sideBarImageObj.img}`}
                                        src={`${sideBarImageObj.img}`}
                                        alt={sideBarImageObj.title}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={sideBarImageObj.title}
                                        subtitle={sideBarImageObj.subtitle}
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about 'Shradhha kapoor'`}
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        }
                                    />
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        id="file-upload"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={(event) => changeProfileURL(event)}
                                    />
                                </ImageListItem>
                            </div>
                            <div className='flex md:flex-row flex-col mt-3 justify-center'>
                                <div className="col-span-5 md:col-span-3">
                                    <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900 text-left">
                                        Title
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            name="title"
                                            id="title"
                                            className="block w-1/2 p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 "
                                            defaultValue={sideBarImageObj.title}
                                            onChange={onChangeTitleAndSubTitle}
                                            value={sideBarImageObj.title}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-5 md:col-span-3">
                                    <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900 text-left">
                                        Sub-Title
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            name="subtitle"
                                            id="subtitle"
                                            className="block w-1/2 p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 "
                                            defaultValue={sideBarImageObj.subtitle}
                                            onChange={onChangeTitleAndSubTitle}
                                            value={sideBarImageObj.subtitle}
                                        />
                                    </div>
                                </div>
                            </div>
                            <Backdrop
                                sx={{ color: 'blue', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={openBackDrop}
                            >
                                <div className=' flex flex-row'>
                                    <CircularProgress color="inherit" />
                                    <span className='mx-3 my-auto'>{'Upadting .......'}</span>
                                </div>
                            </Backdrop>
                            <div className='flex justify-end mx-auto w-full mt-3'>
                                <Button variant='contained' color='primary' onClick={handleUpdateForImage}>
                                    Update
                                </Button>
                            </div>
                        </>)}
                    {sideBarImageObj.id === -1 && (
                        <div className='w-full p-4 mr-4 border h-full mx-auto'>
                            <p className='h-full text-center text-red-700 my-auto'>{'Please Select any Image form right side ti chnage it and update it'}</p>
                        </div>
                    )
                    }
                </div>
                <Modal
                    open={openmodal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='mx-2'
                    key={0}
                >
                    <>
                        <div className='w-full bg-white p-4 rounded-xl md:w-auto min-h-[400px] min-w-[400px]' style={styleForModal}>
                            <div className='p-2 text-2xl flex flex-row justify-between '>
                                <p className='my-auto  p-3 bg-gray-200 rounded-md'>{`Media`}</p>
                                <div className=' mr-0 my-auto bg-gray-200 rounded-full'>
                                    <IconButton
                                        aria-label="upload picture"
                                        component="span"
                                        className="h-12 w-12 cursor-pointer bg-black border my-auto"
                                        style={{ color: 'black' }}
                                        onClick={() => setModal(false)}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <div className='xl:block w-full p-2'>
                                {sideBarImageObj.id !== -1 &&
                                    (<>
                                        <div className='mx-auto w-full h-fit'>
                                            <ImageListItem className='cursor-pointer'
                                                onClick={onClickOnInput}
                                            >
                                                <img
                                                    srcSet={`${sideBarImageObj.img}`}
                                                    src={`${sideBarImageObj.img}`}
                                                    alt={sideBarImageObj.title}
                                                    loading="lazy"
                                                />
                                                <ImageListItemBar
                                                    title={sideBarImageObj.title}
                                                    subtitle={sideBarImageObj.subtitle}
                                                    actionIcon={
                                                        <IconButton
                                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                            aria-label={`info about 'Shradhha kapoor'`}
                                                        >
                                                            <InfoIcon />
                                                        </IconButton>
                                                    }
                                                />
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    id="file-upload"
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    onChange={(event) => changeProfileURL(event)}
                                                />
                                            </ImageListItem>
                                        </div>
                                        <div className='flex md:flex-row flex-col mt-3 justify-center'>
                                            <div className="col-span-5 md:col-span-3">
                                                <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900 text-left">
                                                    Title
                                                </label>
                                                <div className="mt-2.5">
                                                    <input
                                                        name="title"
                                                        id="title"
                                                        className="block w-1/2 p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 "
                                                        defaultValue={sideBarImageObj.title}
                                                        onChange={onChangeTitleAndSubTitle}
                                                        value={sideBarImageObj.title}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-5 md:col-span-3">
                                                <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900 text-left">
                                                    Sub-Title
                                                </label>
                                                <div className="mt-2.5">
                                                    <input
                                                        name="subtitle"
                                                        id="subtitle"
                                                        className="block w-1/2 p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 "
                                                        defaultValue={sideBarImageObj.subtitle}
                                                        onChange={onChangeTitleAndSubTitle}
                                                        value={sideBarImageObj.subtitle}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-end mx-auto w-full mt-3'>
                                            <Button variant='contained' color='primary' onClick={handleUpdateForImage}>
                                                Update
                                            </Button>
                                        </div>
                                    </>)}
                                {sideBarImageObj.id === -1 && (
                                    <div className='w-full p-4 mr-4 border h-full mx-auto'>
                                        <p className='h-full text-center text-red-700 my-auto'>{'Please Select any Image form right side ti chnage it and update it'}</p>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                        <Backdrop
                            sx={{ color: 'blue', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={openBackDrop}
                        >
                            <div className=' flex flex-row'>
                                <CircularProgress color="inherit" />
                                <span className='mx-3 my-auto'>{'Upadting .......'}</span>
                            </div>
                        </Backdrop>
                    </>
                </Modal>
                <div className='xl:w-1/2 w-full border-l xl:mt-1 md:mt-15'>
                    <ImageList sx={{ width: '80%', height: 450, margin: 'auto' }}>
                        {origianlArrayForAllMedia !== null && origianlArrayForAllMedia.map((item: any, index) => (
                            <ImageListItem key={index} className='cursor-pointer'
                                onClick={
                                    (window.innerWidth >= 1200) ?
                                        () => handleImageSelction(index)
                                        : () => OpenModal(index)
                                }>
                                <img
                                    srcSet={item.img}
                                    src={item.img}
                                    alt={item.title}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={item.title}
                                    subtitle={item.author}
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            aria-label={`info about ${item.title}`}
                                        >
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </div>
        </div>
    )
}

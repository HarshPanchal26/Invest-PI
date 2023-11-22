import React, { useEffect, useState, useContext, SetStateAction, useRef } from 'react'
import Loading from '../../../../Assets/Loading';
import axios from '../../../../../axios.config';
import { ContextForDashBord } from '../../../../context/contextForDashBord';
import { Avatar } from '@mui/material';
import { IconButton } from '@mui/material';
import LocalSeeIcon from '@mui/icons-material/LocalSee';


type TypeForUSPData = {
    index: number,
    title: string,
    aboutUSP: string,
    imageUrl?: string
    likes?: number,
}

type TypeForUpdateUsp = {
    data: TypeForUSPData | null,
    index: number
}

type TypeForMedia = {
    file: File | null,
    generatedURL: string
}

type PropsType = {
    objForUpdateUsp?: TypeForUpdateUsp,
    task: 'update' | 'new',
    dataForUSPs: Array<TypeForUSPData> | null
    setDataForUpdateUSP?: React.Dispatch<SetStateAction<TypeForUpdateUsp>>,
    setDataForUSPs: React.Dispatch<SetStateAction<Array<TypeForUSPData> | null>>
    closeModal: React.Dispatch<SetStateAction<{ open: boolean, child: string | null }>>,
}


export default function ModalForCreateUSPs({ objForUpdateUsp, closeModal, dataForUSPs, task, setDataForUSPs, setDataForUpdateUSP }: PropsType) {

    const [loader, setLoader] = useState<boolean>(true);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [updateData, setupdateData] = useState<TypeForUSPData>({
        title: '',
        aboutUSP: '',
        imageUrl: '',
        likes: 0,
        index: -1
    });
    const [StateForMeida, setStateForMeida] = useState<TypeForMedia>({
        file: null,
        generatedURL: '',
    })
    const contextForDashBord = useContext(ContextForDashBord);

    const formData = new FormData();

    const openFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const changeImageForUSPs = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const blobUrl = URL.createObjectURL(selectedFile);
            setupdateData({
                ...updateData,
                imageUrl: blobUrl
            })
            setStateForMeida({
                file: selectedFile,
                generatedURL: blobUrl
            })
        }
    }


    const handleChageInValue = (event: any) => {
        const { value, name } = event.target;
        setupdateData({
            ...updateData,
            [name]: value
        })
    }

    const handleUSPsUpdate = async () => {
        setLoader(true);
        try {
            StateForMeida.file && formData.append('uspmedia', StateForMeida.file);
            updateData && formData.append('uspdata', JSON.stringify(updateData));
            let res = null;
            if (task === 'new') {
                res = await axios.post(`${import.meta.env.VITE_APP_API_URL}product/create/usp`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    },
                });
                if (dataForUSPs !== null && res !== null && task === 'new') {
                    let newArray = [...dataForUSPs];
                    if (!updateData.imageUrl)
                        updateData.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/projectpi-fa7b4.appspot.com/o/uspmedia%2FUSP.official.jpg?alt=media&token=11b9cd84-ad1a-4f0c-adc0-d3d9b4ce0154'
                    newArray.push(updateData);
                    setDataForUSPs(newArray);
                    contextForDashBord.USER.PRODUCTINSIDE.usp = dataForUSPs;
                }
            } else {
                res = await axios.post(`${import.meta.env.VITE_APP_API_URL}product/update/usp`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    },
                });
                if (dataForUSPs !== null && res !== null && task === 'update' && objForUpdateUsp) {
                    let newArray = [...dataForUSPs];
                    newArray[objForUpdateUsp?.index] = updateData;
                    setDataForUSPs(newArray);
                    contextForDashBord.USER.PRODUCTINSIDE.usp = dataForUSPs;
                }
                console.log("Res", res)
            }
            closeModal({
                child: null,
                open: false
            })
        } catch (error: any) {
            console.log("Error in USP", error)
            setLoader(false);
            setError("Error is here")
        }
    }


    useEffect(() => {
        if (task === 'update' && objForUpdateUsp !== undefined) {
            objForUpdateUsp.data && setupdateData({
                ...objForUpdateUsp.data,
                index: objForUpdateUsp.index
            })
        }
        setLoader(false);
    }, [])

    return (
        <>
            {/* {!loader && (<div className='overflow-auto h-auto mx-auto w-full'> */}
            <div className='overflow-auto h-auto mx-auto w-full'>
                {loader && <Loading />}
                {error !== null && !loader && <p className='text-red-600 flex text-sm justify-center'>{error}</p>}
                {!loader && (
                    <div className='p-2'>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div className='col-span-5 md:col-span-3 mt-3'>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={updateData.imageUrl}
                                    sx={{ width: 140, height: 140 }}
                                    className="rounded-full w-40 h-40 border-4 mx-auto border-white shadow-lg"
                                />
                                <div className='flex justify-end'>
                                    <IconButton
                                        aria-label="upload picture"
                                        component="span"
                                        className="h-12 w-12 my-2 cursor-pointer bg-black mx-10"
                                        style={{ color: 'black' }}
                                        onClick={openFileInput}
                                    >
                                        <LocalSeeIcon />
                                    </IconButton>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        id="file-upload"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={changeImageForUSPs}
                                    />
                                </div>
                            </div>
                            <div className="col-span-5 md:col-span-3">
                                <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Title For Usp
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        name="title"
                                        id="title"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={updateData.title}
                                        onChange={handleChageInValue}
                                    />
                                </div>
                            </div>
                            <div className="col-span-5 md:col-span-3">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    About USP
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        name="aboutUSP"
                                        id="aboutUSP"
                                        value={updateData.aboutUSP}
                                        onChange={handleChageInValue}
                                        className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="mt-10 col-span-3">
                                <button
                                    type="button"
                                    onClick={handleUSPsUpdate}
                                    className="flex rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 justify-center w-full"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </>
    )
}

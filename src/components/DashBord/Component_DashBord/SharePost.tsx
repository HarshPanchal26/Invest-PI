import React, { useState, useRef, useContext } from 'react'
import { Avatar, Modal, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { EyeIcon } from '@heroicons/react/24/outline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import DeleteIcon from '@mui/icons-material/Delete';
import { ContextForDashBord } from '../../../context/contextForDashBord';
import {decodeTextFromDisplay , formatTextForDisplay} from '../../../utils/factory/FormatText'
import axios from 'axios';
type TypeForFileData = {
    url: string,
    uploadedFile: File | null
}

type TypeForMetaData = {
    thoughts : string,
    username : string
    author : string,
    isMedia : boolean    
}

export default function SharePost() { 

    const contextForDashBord = useContext(ContextForDashBord)
    const [open, setOpen] = useState<boolean>(true)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErroMessage] = useState<null | string>(null)
    const [fileData, setFileData] = useState<TypeForFileData>({
        url: "",
        uploadedFile: null
    })

    const location = useNavigate();
    const formData = new FormData();

    const openFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const styleForModal: any = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    const handleCloseForModal = () => {
        setOpen(false);
        location(-1);
    }
    const handleChageForPost = (event: any) => {
        if (event.target.value.split(' ').join().length >= 501) {
            setErroMessage('You Only can share your thought within 500 words')
        } else {
            if (errorMessage) {
                setErroMessage(null);
            }
        }
    }

    const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const blobUrl = URL.createObjectURL(selectedFile);
            selectedFile && setFileData({
                url: blobUrl,
                uploadedFile: selectedFile
            })
        }
    }

    const handleremoveImage = () => {
        if (fileData.uploadedFile)
            setFileData({
                url: "",
                uploadedFile: null
            })
    }

    const handlePublishPost = async() => {
        let content = document.querySelector('textarea')?.value;
        const regex = /^(?![ ]+$).+/;
        if (content && regex.test(content)) {
            let formatedText = formatTextForDisplay(content);

            let MetaDataForPost : TypeForMetaData = {
                thoughts : formatedText,
                username : contextForDashBord.USER.USERNAME,
                author : contextForDashBord.USER.FIRMNAME || contextForDashBord.USER.COMPANYNAME || (contextForDashBord.USER.FIRST_NAME + " " + contextForDashBord.USER.LAST_NAME),
                isMedia : fileData.uploadedFile ? true : false                  
            }
            if(fileData.uploadedFile) {
                console.log("Inside" ,  fileData.uploadedFile)
                formData.append('image' , fileData.uploadedFile)
            } 
            MetaDataForPost && formData.append('data' , JSON.stringify(MetaDataForPost))

            try {
                const res = await axios.post('/thoughts/publish' , formData , {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                      },                    
                });
                console.log("res From post" , res)
            } catch (error) {
                handleCloseForModal();
               console.log("Error from post publish " , error)   
            }
        } else {
            alert("String consists of only spaces.");
        }

    }

    return (
        <Modal
           open={open}
           aria-labelledby="modal-modal-title"
           aria-describedby="modal-modal-description"
           className='mx-2'
        >
            <div className='w-full bg-white p-4 rounded-xl md:w-auto h-auto md:min-w-[800px] overflow-auto' style={styleForModal}>
                <div className='my-auto w-auto'>
                    <IconButton
                        aria-label="upload picture"
                        component="span"
                        className="h-12 w-12 cursor-pointer bg-black border my-auto"
                        style={{ color: 'black' }}
                        onClick={handleCloseForModal}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className='p-2 text-2xl flex flex-row gap-3 my-1 rounded-full bg-gray-200'>
                    <div className=' mr-0 my-auto bg-gray-200 rounded-full mx-3'>
                        <IconButton
                            aria-label="upload picture"
                            component="span"
                            className="h-12 w-12 cursor-pointer bg-black border my-auto border-red-600 "
                            style={{ color: 'black' }}
                        >
                            <Avatar
                                alt="Remy Sharp"
                                src={contextForDashBord.USER.PROFILEIMAGE}  
                                sx={{ width: 60, height: 60 }}
                                className="rounded-full border-4 border-white shadow-lg"
                            />
                        </IconButton>
                    </div>
                    <div className=' w-full border mx-1'>
                        <p className='text-2xl font-bold '>{`${contextForDashBord.USER.FIRMNAME || contextForDashBord.USER.COMPANYNAME || (contextForDashBord.USER.FIRST_NAME + " " + contextForDashBord.USER.LAST_NAME)} `}</p>
                        <p className='text-sm font-light'>{`${contextForDashBord.USER.USERNAME}`}</p>
                    </div>
                </div>
                {/* Thougth  Section */}
                <div className='max-h-[400px] overflow-auto border-b-2'>
                    <div className='my-2'>
                        <textarea
                            about='content-for-post'
                            name='post-content'
                            id='post-content'
                            className='w-full focus:outline-none my-3 resize-none border-none outline-none p-2 h-auto text-lg'
                            placeholder={`Hey Rahul What's in your mind ? `}
                            aria-multiline='true'
                            maxLength={600}
                            rows={7}
                            onChange={handleChageForPost}
                        />
                    </div>
                    {/* Image Size */}
                    {errorMessage && (<p className='my-1 font-medium text-red-600 float-left'>{errorMessage}</p>)}
                    {fileData.uploadedFile && (
                        <>
                            <IconButton
                                aria-label="upload picture"
                                component="span"
                                className="h-12 w-12 cursor-pointer bg-black border my-auto float-right"
                                style={{ color: 'black' }}
                                onClick={handleremoveImage}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <div
                                className="flex h-96 bg-slate-200 justify-end w-4/5 mx-auto"
                                style={{
                                    backgroundImage: `url(${fileData.url})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                            </div>
                        </>
                    )}

                </div>
                {/* Upload files */}
                <div className=' w-full flex flex-row'>
                    <div className='flex flex-row gap-3 w-3/4 my-auto'>

                        <IconButton
                            aria-label="upload picture"
                            component="span"
                            className="h-12 w-12 cursor-pointer bg-black border my-auto"
                            style={{ color: 'black' }}
                            onClick={handleCloseForModal}
                        >
                            <EyeIcon />
                        </IconButton>
                        <IconButton
                            aria-label="upload picture"
                            component="span"
                            className="h-12 w-12 cursor-pointer bg-black border my-auto"
                            style={{ color: 'black' }}
                            onClick={openFileInput}
                        >
                            <AttachFileIcon />
                            <input
                                type="file"
                                ref={fileInputRef}
                                id="file-upload"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleFileSelection}
                            />

                        </IconButton>
                    </div>
                    <div className='flex w-1/4 my-3'>
                        <button
                            about='btn'
                            type='button'
                            className='p-3 bg-blue-600 text-white md:w-3/5 rounded-lg mx-auto'
                            onClick={handlePublishPost}
                        >
                            <PublishedWithChangesIcon />
                            <span className='mx-1'>{'Publish'}</span>
                        </button>
                    </div>
                </div>
            </div>

        </Modal>
    )

}



/**
 * 
 * 
             <div className='border border-red-700 h-screen'>
                <div className='min-h-[400px] h-auto w-[400px] shadow-xl mx-auto my-32 rounded-xl'>
                    <div className='flex flex-col p-3 rounded-xls'>
                        <div className='flex flex-row justify-between'>
                            <IconButton>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcREiyKK9yDiO8n4AJ2ddzgaUGtfJscwIJNK9AWWIK2zDz4YwkQUCtouFFAGv9cS6B8b-qLF1rMBCK0IrfXSKZeFJLD4DTg9xNU4eAn3MHON'}
                                    sx={{ width: 60, height: 60 }}
                                    className="rounded-full border-4 border-white shadow-lg"
                                />
                            </IconButton>
                            <div className='w-full text-left my-5'>
                                <p className='text-sm font-bold'>{`Rahul's Post`}</p>
                            </div>
                            <IconButton>
                                <CloseIcon />

                            </IconButton>
                        </div>
                        <div className='border-t my-5 h-auto'>
                            <textarea
                                about='content-for-post'
                                name='post-content'
                                id='post-content'
                                className='w-full focus:outline-none my-3 resize-none border-none outline-none h-auto'
                                placeholder={`Tell me What's In your Mind`}
                                aria-multiline='true'
                            />
                        </div>
                    </div>
                </div>
            </div>
 */






/**
 * Schema for posts 
 * 
 * post_id :    
 * author_name : 
 * author_username : 
 * content : 
 * like :               
 * comment : 
 * repost : 
 * 
 */
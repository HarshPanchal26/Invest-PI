import React, { useState, useRef, SetStateAction, useContext } from 'react';
import { IconButton } from '@mui/material'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import axios from '../../../../axios.config';
import { ContextForDashBord } from '../../../context/contextForDashBord';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type PropsType = {
  objForProfile: any,
  closeModal: React.Dispatch<SetStateAction<{ open: boolean, child: string | null }>>
}

export default function UpdateCoverImage({ objForProfile, closeModal }: PropsType) {

  const contextForDashBord = useContext(ContextForDashBord);
  const [urlForProfile, setUrl] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<FormData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [Loader, setLoader] = useState<boolean>(false);
  const formData = new FormData();

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const changeProfileURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    console.log("selectedFile", selectedFile)
    if (selectedFile) {
      const blobUrl = URL.createObjectURL(selectedFile);
      setUrl(blobUrl);
      formData.append('cover', selectedFile);
      selectedFile && setUploadedFile(formData);
    }

  };

  const handleProfileUpdate = async () => {
    error && setError(null);
    console.log("uploadedFile=>", uploadedFile)
    try {
      setLoader(true)
      const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}profile/update/coverimage`, uploadedFile, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      })
      contextForDashBord.USER.COVERIMAGE = res.data.url
      setLoader(false)
      closeModal({
        child: null,
        open: false
      })
      setUrl(res.data.imageUrl)
    } catch (error: any) {
      console.log("error", error)
      setError(error)
    }
  }

  React.useEffect(() => {
    setUrl(objForProfile?.COVERIMAGE || ''); // Ensure a default value if PROFILEIMAGE is not provided
  }, [objForProfile]);

  return (
    <div className='flex flex-col w-full md:min-w-[500px]'>
      <div
        className="flex h-60 border-b bg-slate-200 w-full my-3"
      >
        <img src={urlForProfile} alt='coverImage' className='h-full w-full' />
      </div>
      {objForProfile.USERTYPE !== 'VISITOR' && (
        <div className="text-black p-3 flex flex-row border-t-2 gap-6">

          <div>
            <label htmlFor="file-upload">
              <IconButton
                onClick={openFileInput}
                className="h-12 w-12 my-2 cursor-pointer bg-black"
                style={{ color: 'black' }}
              >
                <PermMediaIcon style={{ width: '30px', height: '30px' }} />
              </IconButton>
            </label>
            <input
              type="file"
              ref={fileInputRef}
              id="file-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={changeProfileURL}
            />

            <p className="p-1 text-xl text-center">{'Edit'}</p>
          </div>
          <div>
            <IconButton
              aria-label="upload picture"
              component="span"
              className="h-12 w-12 my-2 cursor-pointer bg-black"
              style={{ color: 'black' }}
              onClick={handleProfileUpdate}
            >
              <PublishedWithChangesIcon style={{ width: '30px', height: '30px' }} />
            </IconButton>
            <p className="p-1 text-xl text-center">{'Update'}</p>
          </div>


        </div>)}
        <Backdrop
            sx={{ color: 'blue', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={Loader}
          >
            <div className=' flex flex-row'>
              <CircularProgress color="inherit" />
              <span className='mx-3 my-auto'>{'Upadting .......'}</span>
            </div>
          </Backdrop>
    </div>
  )
}

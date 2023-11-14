import React, { useState, useRef, useEffect, SetStateAction, useContext } from 'react';
import { Avatar, IconButton } from '@mui/material';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import axios from 'axios';
import { ContextForDashBord } from '../../../context/contextForDashBord';

type PropsType = {
  objForProfile: any,
  closeModal: React.Dispatch<SetStateAction<{ open: boolean, child: string | null }>>
}

export default function UpdateProfileImage({ objForProfile, closeModal }: PropsType) {

  const contextForDashBord = useContext(ContextForDashBord);
  const [urlForProfile, setUrl] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<FormData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formData = new FormData();

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const changeProfileURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const blobUrl = URL.createObjectURL(selectedFile);
      setUrl(blobUrl);
      formData.append('profile', selectedFile);
      selectedFile && setUploadedFile(formData);
    }
  };

  const handleProfileUpdate = async () => {
    error && setError(null);
    console.log("uploadedFile=>", uploadedFile)
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}profile/update/profileimage`, uploadedFile, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      })
      contextForDashBord.USER.PROFILEIMAGE = res.data.url
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

  useEffect(() => {
    setUrl(objForProfile?.PROFILEIMAGE || ''); // Ensure a default value if PROFILEIMAGE is not provided
  }, [objForProfile]);

  useEffect(() => {
    console.log("Seconed use Effect", uploadedFile)
  }, [uploadedFile])

  return (
    <div className="flex flex-col">
      <p className="text-3xl font-bold text-black p-2 my-4">Profile Picture</p>
      <IconButton className="mx-auto">
        <Avatar
          alt="Remy Sharp"
          src={urlForProfile}
          sx={{ width: 260, height: 260 }}
          className="rounded-full w-40 h-40 border-4 border-white shadow-lg"
        />
      </IconButton>
      {(objForProfile.USERTYPE !== 'VISITOR' ) && (
        <div className="text-black p-3 flex flex-row border-t-2 gap-6">
          <div className='flex flex-col'>
            <label htmlFor="file-upload">
              <IconButton
                onClick={openFileInput}
                className="h-12 w-12 my-2 cursor-pointer bg-black"
                style={{ color: 'black' }}
              >
                <PermMediaIcon style={{width : '30px' , height : '30px'}}/>
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
          <div className='flex flex-col'>
            <IconButton
              aria-label="upload picture"
              component="span"
              className="h-12 w-12 my-2 cursor-pointer bg-black"
              style={{ color: 'black' }}
              onClick={handleProfileUpdate}
            >
              <PublishedWithChangesIcon style={{width : '30px' , height : '30px'}}/>
            </IconButton>
            <p className="p-1 text-xl text-center">{'Update'}</p>
          </div>
        </div>)}
    </div>
  );
}

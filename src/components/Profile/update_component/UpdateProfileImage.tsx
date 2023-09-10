import React, { useState, useRef, useEffect, SetStateAction , useContext } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { EyeIcon, PencilIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { ContextForDashBord } from '../../../context/contextForDashBord';

type PropsType = {
  objForProfile : any,
  closeModal : React.Dispatch<SetStateAction<{open : boolean , child : string | null}>>
}

export default function UpdateProfileImage({ objForProfile , closeModal}: PropsType) {

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
    console.log("selectedFile" , selectedFile)
    if (selectedFile) {
      const blobUrl = URL.createObjectURL(selectedFile);
      setUrl(blobUrl);
      formData.append('profile', selectedFile);
      selectedFile && setUploadedFile(formData);
    }
    
  };
  
  const handleProfileUpdate = async () => {
    error && setError(null);
    console.log("uploadedFile=>" , uploadedFile)
    try {
      const res = await axios.post('/profile/update/profileimage', uploadedFile , {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      })
      contextForDashBord.USER.PROFILEIMAGE = res.data.url
      closeModal({
        child : null,
        open : false
      })
      setUrl(res.data.imageUrl)
    } catch (error: any) {
      console.log("error" , error)
      setError(error)
    }
  }

  useEffect(() => {
    setUrl(objForProfile?.PROFILEIMAGE || ''); // Ensure a default value if PROFILEIMAGE is not provided
  }, [objForProfile]);

  useEffect(()=>{
    console.log("Seconed use Effect" , uploadedFile)
  } , [uploadedFile])

  return (
    <div className="flex flex-col w-96">
      <p className="text-3xl font-bold text-black p-2 my-4">Profile Picture</p>
      <IconButton className="mx-auto">
        <Avatar
          alt="Remy Sharp"
          src={urlForProfile}
          sx={{ width: 260, height: 260 }}
          className="rounded-full w-40 h-40 border-4 border-white shadow-lg"
        />
      </IconButton>
      <div className="text-black p-3 flex flex-row border-t-2 gap-6">

        <div>
          <label htmlFor="file-upload">
            <IconButton
              onClick={openFileInput}
              className="h-12 w-12 my-2 cursor-pointer bg-black"
              style={{ color: 'black' }}
            >
              <PencilIcon />
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

          <p className="p-1">{'Edit'}</p>
        </div>
        <div>
          <IconButton
            aria-label="upload picture"
            component="span"
            className="h-12 w-12 my-2 cursor-pointer bg-black"
            style={{ color: 'black' }}
            onClick={handleProfileUpdate}
          >
            <EyeIcon />
          </IconButton>
          <p className="p-1">{'View'}</p>
        </div>


      </div>
    </div>
  );
}

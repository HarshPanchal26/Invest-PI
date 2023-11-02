import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
    const navigate = useNavigate();
    return (
        <div className='w-full text-left '>
            <IconButton
                aria-label="upload picture"
                component="span"
                className="h-12 w-12 my-2 cursor-pointer bg-black mx-10"
                style={{ color: 'black' }}
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon />
            </IconButton>
        </div>
    )
}


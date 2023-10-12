import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <div className='h-full w-full'>
      <div className='flex flex-col justify-center items-center my-1/2 mx-1/2 h-full'>
          <CircularProgress />
      </div>
    </div>
  )
}

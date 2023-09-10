import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Input, InputProps } from '@mui/base/Input';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';


const CustomInput = React.forwardRef(function CustomInput(
  props: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <Input
      // slots={{ input: StyledInputElement, textarea: StyledTextareaElement }}
      {...props}
      ref={ref}
    />
  );
});
export default function RaiseFund() {
  return (
    <div className='border border-red-700 h-screen'>
      <div className='min-h-[400px] h-auto w-[400px] shadow-xl mx-auto my-32 rounded-xl'>
        <div className='flex flex-col p-3 rounded-xls'>
          {/*  section for user profile */}
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
          {/*  Section FOR Content */}
          <div className='border-t my-5 h-auto'>
            {/* <textarea
              about='content-for-post'
              name='post-content'
              id='post-content'
              className='w-full focus:outline-none my-3 resize-none border-none outline-none h-auto'
              placeholder={`Tell me What's In your Mind`}
              aria-multiline='true'
            /> */}
            <CustomInput aria-label="Demo input" multiline placeholder="Type something…" />
          </div>
        </div>
      </div>
    </div>
  )
}

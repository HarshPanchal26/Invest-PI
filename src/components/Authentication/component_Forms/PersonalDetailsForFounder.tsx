import React from 'react'

type propsType = {
    handleNext : Function
}
export default function PersonalDetailsForFounder({handleNext}: propsType) {

    const handleClick = () =>{
        handleNext();
    }
  return (
    <div className='border'>
        <button type='button' className='p-3 w-28' onClick={handleClick}>Next Inside</button>
    </div>
  )
}

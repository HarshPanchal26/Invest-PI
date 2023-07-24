import React, { useEffect, useState } from 'react'
import RegistartionForVC from '../Authentication/component_Auth/RegistrationForVC';
import RegistrationForAngel from './component_Auth/RegistrationForAngel';
import RegistrationForFounders from './component_Auth/RegistrationForFounders';
import RegistrationForStartUp from './component_Auth/RegistrationForStartUp';

const userCast = ["VC" , "angelinvestor" , "founder" , "startUp"];

export default function SignInPage() {
  
  const [userType , setUserType] = useState<String | null>(null);
  
  useEffect(()=>{

    const location  = window.location.search
    const queryString = new URLSearchParams(location);
    const type : any  = queryString.get('type')
    if(type !== null && userCast.includes(type)){
      setUserType(type)
    }else{
      window.location.href= '/signin/type';
    }
   } , [userType])

  return (
    <div className='border h-full md:mx-5 md:p-8 mx-2 p-5'>
      {
        userType === 'VC' && <RegistartionForVC/>   
      }
      {
        userType === 'angelinvestor' && <RegistrationForAngel/>   
      }
      {
        userType === 'founder' && <RegistrationForFounders/>   
      }
      {
        userType === 'startUp' && <RegistrationForStartUp/>   
      }
        
    </div>
  )
}

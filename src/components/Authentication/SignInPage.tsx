import React, { useEffect, useState } from 'react'
import axios from 'axios';
import RegistartionForCF from './component_Auth/RegistartionForCF';
import RegistrationForAngel from './component_Auth/RegistrationForAngel';
import RegistrationForFounders from './component_Auth/RegistrationForFounders';
import RegistrationForBuisness from './component_Auth/RegistrationForBuisness';

const userCast = ["investor", "business", "founder", "CF"];

export default function SignInPage() {

  const [loader, setloader] = React.useState<boolean>(true)
  const [userType, setUserType] = useState<String | null>(null);

  const checkAutorization = async () => {
    await axios.get('/signin/authorization').then((result) => {
      console.log("res", result)
      if (result.data.authorized) {
        // setloader(false)
        // const location  = window.location.search
        // const queryString = new URLSearchParams(location);
        // const type : any  = queryString.get('type')
        // if(type !== null && userCast.includes(type)){
        //   setUserType(type)
        // }else{
        //   window.location.href= '/signin/type';
        // }
        window.location.href = '/feed'
      }
    }).catch((error) => {
      console.log("error", error)
      setloader(false)
      const location = window.location.search
      const queryString = new URLSearchParams(location);
      const type: any = queryString.get('type')
      if (type !== null && userCast.includes(type)) {
        setUserType(type)
      } else {
        window.location.href = '/signin/type';
      }
    })
  }

  useEffect(() => {
    checkAutorization()
  }, [])
  return (
    <div className='border h-auto md:mx-5 md:p-8 mx-2 p-5'>
      {
        //  used for Registration of capital firm
        userType === 'CF' && <RegistartionForCF />  
      }
      {
        //  used for angel investor or individual investpr
        userType === 'investor' && <RegistrationForAngel />
      }
      {
        //  used for founders registration
        userType === 'founder' && <RegistrationForFounders />
      }
      {
        //  used for registartion of Buisness (Start ups , Mid level compony , giant compony)
        userType === 'business' && <RegistrationForBuisness />
      }


    </div>
  )
}

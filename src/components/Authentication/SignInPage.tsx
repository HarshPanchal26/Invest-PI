import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RegistartionForCF from './component_Auth/RegistartionForCF';
import RegistrationForAngel from './component_Auth/RegistrationForAngel';
import RegistrationForBuisness from './component_Auth/RegistrationForBuisness';
import RegistrationForProducts from './component_Auth/RegistrationForProducts';
import RegistrationForIndividuals from './component_Auth/RegistrationForIndividuals';
import Loading from '../../Assets/Loading';

const userCast = ["investor", "business", "founder", "CF", "product", "individuals"];

export default function SignInPage() {
                        
  const [loader, setloader] = React.useState<boolean>(true)
  const [userType, setUserType] = useState<String | null>(null);

  const checkAutorization = async () => {
    await axios.get('/api/signin/authorization').then((result) => {
      console.log("res", result)
      if (result.data.authorization) {
        window.location.href = '/feed'
      } else {
        //  No need here for else block jsut put for unexpected error (For Development only)
        const location = window.location.search
        const queryString = new URLSearchParams(location);
        const type: any = queryString.get('type')
        if (type !== null && userCast.includes(type)) {
          setUserType(type)
          setloader(false)
        } else {
          window.location.href = '/signin/type';
        }
      }
    }).catch((error) => {
      console.log("error", error)
      setloader(false)
      const location = window.location.search
      const queryString = new URLSearchParams(location);
      const type: any = queryString.get('type')
      if (type !== null && userCast.includes(type)) {
        setUserType(type)
        setloader(false)
      } else {
        window.location.href = '/signin/type';
      }
    })
  }

  useEffect(() => {
    checkAutorization()
  }, [])

  if (!loader) {
    return (
      <div className='h-auto md:mx-5 md:p-8 mx-2 p-5'>
        {
          //  used for Registration of capital firm
          userType === 'CF' && <RegistartionForCF />
        }
        {
          //  used for angel investor or individual investpr (Not in use)
          userType === 'investor' && <RegistrationForAngel />
        }
        {
          //  used for founders registration
          userType === 'individuals' && <RegistrationForIndividuals />
        }
        {
          //(Not in use right now)  used for registartion of Buisness (Start ups , Mid level company , giant company)
          userType === 'business' && <RegistrationForBuisness />
        }
        {
          //  used for registartion of Buisness (Start ups , Mid level company , giant company)
          userType === 'product' && <RegistrationForProducts />
        }
      </div>
    )
  } else {
    return (
      <Loading />
      // <div className='border h-auto md:mx-5 md:p-8 mx-2 p-5'>
      // </div>
    )
  }
}

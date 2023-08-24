import React, { useEffect, useState } from 'react'
import Logo from '../../../Assets/logo';
import { verifyDataForSignUp } from '../../../Verification/SignUpVerification'
import axios from 'axios';

type formatForSignInData = {
  Email: string,
  username : string,
  Password: string,
  CPassword: string
}

type typeForProps = {
  objForSignInComonent: any
  ArrayForInterest: Array<string>
}

/**
 * 
 * @param param0 is a Object which conatains additional data for registration process , like (personal information , cpmpony information etc . ) obj is changes whith the type of user 
 * @returns 
 */

export default function SignInForm({ objForSignInComonent, ArrayForInterest }: typeForProps) {

  const [dataForSignIn, setdataForSignIn] = useState<formatForSignInData>({
    Email: objForSignInComonent.email,
    username : '',
    Password: '',
    CPassword: ''
  })

  const [error, setError] = useState<string | null>(null);
  const [typeOfUser, setTypeOfUser] = useState<string | null>(null);

  const handleClick = async () => {
    error !== null && setError(null);

    try {
      await verifyDataForSignUp(dataForSignIn);
      if (typeOfUser !== null) {
        try {
          const objects = {
            details: {
              ...objForSignInComonent,
              username : dataForSignIn.username
            },
            authenticationData: {
              email: dataForSignIn.Email,
              password: dataForSignIn.Password,
              username : dataForSignIn.username,
              type: typeOfUser
            }
          }
          const result = await axios.post(`/signin/${typeOfUser}`, objects)
          console.log("result from form", result)
          if (result.data.authorization) {
            window.location.href = '/feed';
          } else {
            setError(result.data.message)
          }

        } catch (error: any) {
          console.log("error form Sign in Form " , error)
          if(error.response?.data?.message) setError(error.response.data.message);
          else setError('Error Due to Network Issue')

        }
      }
    } catch (error: any) {
      alert(`Error is ${error}`)
    }
  }

  const handleChageInInputs = (event: any) => {
    const { name, value } = event.target;
    setdataForSignIn({
      ...dataForSignIn,
      [name]: value
    })
  }

  useEffect(() => {
    // Effect for push user type and ArrayForInterest inside main objects            
    objForSignInComonent.interest = [...ArrayForInterest]
    console.log('objForSignInComonent==>', objForSignInComonent, ArrayForInterest)
    setTypeOfUser(objForSignInComonent.type);
  }, [])

  return (
    <div className='flex md:w-1/2 w-full mx-auto flex-col h-auto my-10'>
      <Logo />
      {error && <p className=' my-5 border border-red-700 rounded-xl p-1 bg-red-600 block mx-auto text-white w-1/2'>{error}</p>}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6" >
          <div className="">
            <div className="text-sm flex justify-between">
              <label htmlFor="password" className="flex justify-start text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Change Email?
              </a>
            </div>
            <div className="mt-2">
              <input
                id="email"
                name="Email"
                type="email"
                autoComplete="email"
                required
                value={dataForSignIn.Email}
                onChange={handleChageInInputs}
                disabled
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-5 "
              />
            </div>
            <p className="mt-1 text-sm leading-6 text-gray-600">This Email will use for your login , If you want you can change it now.</p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
            </div>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                required
                onChange={handleChageInInputs}
                className="block w-full rounded-md border-0 py-1.5 px-5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>s */}
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="Password"
                type="password"
                autoComplete="current-password"
                required
                onChange={handleChageInInputs}
                className="block w-full rounded-md border-0 py-1.5 px-5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="cpassword"
                name="CPassword"
                type="password"
                autoComplete="current-password"
                required
                onChange={handleChageInInputs}
                className="block w-full rounded-md border-0 py-1.5 px-5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className='my-4'>
            <button
              type="submit"
              onClick={handleClick}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}




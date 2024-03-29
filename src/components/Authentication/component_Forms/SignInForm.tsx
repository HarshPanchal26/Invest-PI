import React, { useEffect, useState } from 'react'
import Logo from '../../../Assets/logo';
import { verifyDataForSignUp } from '../../../Verification/SignUpVerification'
import axios from '../../../../axios.config';

type formatForSignInData = {
  email: string,
  username: string,
  password: string,
  cPassword: string
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
    email: objForSignInComonent.email,
    username: '',
    password: '',
    cPassword: ''
  })
  const [LoaderForLogin, setLoaderForLogin] = useState<boolean>(false);


  const [error, setError] = useState<string | null>(null);
  const [typeOfUser, setTypeOfUser] = useState<string | null>(null);

  const handleClick = async () => {
    error !== null && setError(null);

    try {
      await verifyDataForSignUp(dataForSignIn);
      if (typeOfUser !== null) {
        setLoaderForLogin(true)
        try {
          const objects = {
            details: {
              ...objForSignInComonent,
              username: dataForSignIn.username
            },
            authenticationData: {
              name: objForSignInComonent.companyname || objForSignInComonent.firmname || (objForSignInComonent.firstName + " " + objForSignInComonent.lastName),
              email: dataForSignIn.email,
              password: dataForSignIn.password,
              username: dataForSignIn.username,
              type: typeOfUser
            }
          }
          const result = await axios.post(`${import.meta.env.VITE_APP_API_URL}signin/${typeOfUser}`, objects)
          if (result.data.authorization) {
            window.location.href = '/feed';
          } else {
            setError(result.data.message)
            setLoaderForLogin(false)
          }
        } catch (error: any) {
          setLoaderForLogin(false)
          if (error.response?.data?.message) setError(error.response.data.message);
          else setError('Error Due to Network Issue')

        }
      }
    } catch (error: any) {
      setLoaderForLogin(false)
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
    objForSignInComonent.interest = [...ArrayForInterest]
    setTypeOfUser(objForSignInComonent.type);
  }, [])

  return (
    <div className='flex md:w-1/2 w-full mx-auto flex-col h-auto my-10'>
      <Logo />
      {error && <p className=' my-5 p-1 text-lg block mx-auto text-red-600 w-1/2'>{error}</p>}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
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
                value={dataForSignIn.email}
                onChange={handleChageInInputs}
                disabled
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-5 "
              />
            </div>
            <p className="mt-1 p-2 text-sm leading-6 text-gray-600">This Email will use for your login , If you want to change , change it now.</p>
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
                name="password"
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
                name="cPassword"
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
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}




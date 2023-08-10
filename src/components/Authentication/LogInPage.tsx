import { useEffect, useState } from "react"
import Logo from "../../Assets/logo"
import axios from "axios"
import verifyDataForLogIn from '../../Verification/LoginDataVarification'

type TypeForLogIn = {
  email : string,
  password : string  
}

export default function LogInPage() {

  const [loader, setLoader] = useState<boolean>(true);
  const [loginData , setLoginData] = useState<TypeForLogIn>({
    email : '',
    password : ''
  })
  const [error, setError] = useState<string | null>(null);


  const checkAutorization = async () => {
    await axios.get('/login/authorization')
      .then((result) => {
        if (result.data.authorized) {
          window.location.href = '/feed'
        } else {
          setLoader(false);
        }
      }).catch((error) => {
        setLoader(false);
        console.log("Login Error relatred to token", error)
      })
  }

  const handlechangeInData=(event : any )=>{
    const {name , value} = event.target;
    setLoginData({
      ...loginData,
      [name] : value
    })      
  }

  const handleLogin = async()=>{
    error!==null &&  setError(null);
    try {
      const res: any = await verifyDataForLogIn(loginData);
      console.log("res form login" , res)
      if(res?.Verified){
      await axios.post('/login' , loginData)
        .then((_res)=>{
          window.location.href = '/feed' 
        }).catch((error)=>{
          console.log(error.message)
        })
      }else{
        setError(res?.message)
      } 
    } catch (error : any) {
      setError(error?.message)
    }
  }

  useEffect(() => {
    checkAutorization()
  }, [])

  if (!loader) {
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>
      {error && <p className=' my-5 border border-red-700 rounded-xl p-1 bg-red-600 block mx-auto text-white w-1/2'>{error}</p>}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div className="">
              <label htmlFor="password" className="flex justify-start text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={loginData.email}
                  onChange={handlechangeInData}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-5 "
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={loginData.password}
                  onChange={handlechangeInData}
                  className="block w-full rounded-md border-0 py-1.5 px-5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleLogin}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="/signin/type" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Create Your Account
            </a>
          </p>
        </div>
      </div>)

  } else {
    return (<div>
      <h1>{'Loading.....'}</h1>
    </div>)
  }
}

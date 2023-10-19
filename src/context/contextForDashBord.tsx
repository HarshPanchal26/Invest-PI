import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Assets/Loading";
import {
  GenerateObjForProducts,
  GenerateObjForIndividual,
  GenerateObjForCF, ObjForVisitedUser
}
  from "../utils/factory/ObjForUser";
import {Manager , ManagerOptions , io} from 'socket.io-client'

type child = {
  children: React.ReactNode
}
type TypeForAuthorizationState = {
  isAutorizedUser: boolean,
  valueForProvider: any | null,
  userType: string | null
}

export const ContextForDashBord = createContext<null | any>(null);

export function ContextProviderForDashBord({ children }: child) {
  const [loader, setLoader] = useState<boolean>(true);
  const [objForAuthorizationState, setObjForAuthorizationState] = useState<TypeForAuthorizationState>({
    isAutorizedUser: false,
    valueForProvider: null,
    userType: null,
  })

  const [arrayForPosts, setArrayForPosts] = useState<Array<Object> | null>()

  const fetchThoughtsForUser = async () => {
    const res = await axios.get('/api/feed/fetchposts');
    console.log("res", res.data.data)
    setArrayForPosts(res.data.data);
  }

  const checkAuthorization = () => {
    console.log("I am inside Authorization")
    return new Promise(async (resolve, reject) => {
      try {
        // let res = await axios.get('/api/check/authorization')
        let res = await axios.get('/api/authorization')
        console.log("resresres", res)
        if (res.data.user) {
          let Obj: any = null;
          if (res.data.user.type === 'product') {
            Obj = GenerateObjForProducts(res.data.user, res.data.thoughts, res.data.product, 'USERS');
          } else if (res.data.user.type === 'CF') {
            Obj = GenerateObjForCF(res.data.user, res.data.thoughts, 'USERS');
          } else if (res.data.user.type === 'individual') {
            console.log("Obj...", res.data.thoughts)
            Obj = GenerateObjForIndividual(res.data.user, res.data.thoughts, 'USERS');
          } else {
            alert("Somthig is wrong inside Context Area ")
          }
          // const socket = io('http://localhost:5000', {
          //   transports: ['websocket' , 'polling'],
          //   autoConnect: false, // Disable auto-connect for now
          //   reconnection: true, // Enable reconnection
          //   reconnectionAttempts: 3, // Number of reconnection attempts
          //   reconnectionDelay: 1000, // Delay between reconnection attempts in milliseconds
          //   reconnectionDelayMax: 5000, // Maximum delay between reconnection attempts
          // });
          // // socket.connect();
          // console.log("socket=====>" , socket)  
          setObjForAuthorizationState({
            ...objForAuthorizationState,
            isAutorizedUser: true,
            valueForProvider: Obj
          })
        }
        setLoader(false)
        resolve(objForAuthorizationState.valueForProvider)
      } catch (error: any) {
        setObjForAuthorizationState({
          ...objForAuthorizationState,
          isAutorizedUser: true,
        })
        reject(error.message)
        window.location.href = '/login'
      }
    })
  }

  const checkForVisitedAccount = (username: string) => {
    return new Promise(async (resolve, reject) => {

      if (username === ObjForContextData.USER?.USERNAME) {
        resolve(ObjForContextData.USER);
        return;
      }

      if (ObjForVisitedUser.length > 0) {
        const res = ObjForVisitedUser.filter((item: any) => item.USERNAME === username);
        if (res.length > 0) {
          resolve(res[0]);
          return;
        }
      }

      try {
        const res = await axios.post('/api/profile/users', { username: username });
        console.log(res)
        if (res.data.user) {
          let Obj: any = null;
          if (res.data.user.type === 'product') {
            Obj = GenerateObjForProducts(res.data.user, res.data.thoughts, res.data.product, 'VISITOR');
          } else if (res.data.user.type === 'CF') {
            Obj = GenerateObjForCF(res.data.user, res.data.thoughts, 'VISITOR');
          } else if (res.data.user.type === 'individual') {
            Obj = GenerateObjForIndividual(res.data.user, res.data.thoughts, 'VISITOR');
          } else {
            alert("Something is wrong inside Context Area Else");
          }
          ObjForVisitedUser.push(Obj);
          resolve(Obj);
          return;
        }
      } catch (error: any) {
        console.log("Error from Context ", error)
        reject(`Error is ==>${error.message}`);
      }
    })

  };


  const ObjForContextData = {
    checkAuthorization: checkAuthorization,  // function
    checkForVisitedAccount: checkForVisitedAccount,
    fetchThoughtsForUser: fetchThoughtsForUser,
    USER: objForAuthorizationState.valueForProvider,//Provide user data 
    isAutorizedUser: objForAuthorizationState.isAutorizedUser,  /// value
    POSTS: []
  }

  useEffect(() => {
    if (!ObjForContextData.isAutorizedUser) {
      checkAuthorization();
    }
  }, []);

  return (
    <ContextForDashBord.Provider value={ObjForContextData}>
      {loader && (
        <Loading />
      )}
      {!loader && children}
    </ContextForDashBord.Provider>
  )
}


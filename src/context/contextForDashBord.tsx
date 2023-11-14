import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Assets/Loading";
import {
  GenerateObjForProducts,
  GenerateObjForIndividual,
  GenerateObjForCF, ObjForVisitedUser
}
  from "../utils/factory/ObjForUser";

type child = {
  children: React.ReactNode
}
type TypeForAuthorizationState = {
  isAutorizedUser: boolean,
  userData: any | null,
  userType: string | null
}

export const ContextForDashBord = createContext<null | any>(null);

export function ContextProviderForDashBord({ children }: child) {
  const [loader, setLoader] = useState<boolean>(true);
  const [StateForUser, setStateForUser] = useState<TypeForAuthorizationState>({
    isAutorizedUser: false,
    userData: null,
    userType: null,
  })

  const [ArrayForNewThoughts, setArrayForNewThoughts] = useState<[]>([]);
  const [ArrayForMyPiches , setArrayForMyPiches] = useState<[]>([]);
  const [arrayForPosts, setArrayForPosts] = useState<Array<Object> | null>()

  const fetchThoughtsForUser = async () => {
    const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}feed/fetchposts`);
    setArrayForPosts(res.data.data);
  }

  const fetchDataForMainFeed = async () => {
    const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}feed/thoughts/all`);
    setArrayForNewThoughts(res.data.newthoughts)
  }

  const checkAuthorization = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.get(`${import.meta.env.VITE_APP_API_URL}check/authorization`)
        console.log("resresres", res)
        if (res.data.user) {
          let Obj: any = null;
          if (res.data.user.type === 'product') {
            Obj = GenerateObjForProducts(res.data.user, res.data.thoughts, res.data.product, 'USERS');
          } else if (res.data.user.type === 'CF') {
            Obj = GenerateObjForCF(res.data.user, res.data.thoughts, 'USERS');
          } else if (res.data.user.type === 'individual') {
            Obj = GenerateObjForIndividual(res.data.user, res.data.thoughts, 'USERS');
          } else {
            alert("Somthig is wrong inside Context Area ")
          }
          setStateForUser({
            ...StateForUser,
            isAutorizedUser: true,
            userData: Obj
          })
        }
        setLoader(false)
        resolve(StateForUser.userData)
      } catch (error: any) {
        setStateForUser({
          ...StateForUser,
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
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}profile/users`, { username: username });
        console.log("New Profile foe visit", res);
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
        reject(error)
      }
    })

  };



  const ObjForContextData = {
    USER: StateForUser.userData,//Provide user data 
    isAutorizedUser: StateForUser.isAutorizedUser,  /// value
    POSTS: ArrayForNewThoughts,
    MYPITCHES : ArrayForMyPiches,
    checkAuthorization: checkAuthorization,  // function
    checkForVisitedAccount: checkForVisitedAccount,
    fetchThoughtsForUser: fetchThoughtsForUser,
    setArrayForNewThoughts : setArrayForNewThoughts,
    setArrayForMyPiches :setArrayForMyPiches,
  }

  useEffect(() => {
    if (!ObjForContextData.isAutorizedUser) {
      checkAuthorization();
    }
  }, [ObjForContextData.isAutorizedUser]);


  return (
    <ContextForDashBord.Provider value={ObjForContextData}>
      {loader && (
        <Loading />
      )}
      {!loader && children}
    </ContextForDashBord.Provider>
  )
}


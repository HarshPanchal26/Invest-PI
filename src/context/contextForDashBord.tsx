import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Assets/Loading";
import { GenerateObjForProducts,
         GenerateObjForIndividual ,
         GenerateObjForCF } 
    from "../utils/factory/ObjForUser";

type child = {
  children: React.ReactNode
}
type TypeForAuthorizationState = {
  isAutorizedUser: boolean,
  valueForProvider: Object | null,
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

  const checkAuthorization = async () => {
    try {
      let res = await axios.get('/api/authorization')
      console.log("Data", res.data.user.type)
      if (res.data.user) {
        let Obj = null;
        if (res.data.user.type === 'product') {
          Obj = GenerateObjForProducts(res.data.user);
        } else if (res.data.user.type === 'CF') {
          Obj = GenerateObjForCF(res.data.user);
        } else if (res.data.user.type === 'individual') {
          Obj = GenerateObjForIndividual(res.data.user);
        } else {
          alert("Somthig is wrong inside Context Area Else")
        }
        setObjForAuthorizationState({
          ...objForAuthorizationState,
          isAutorizedUser: true,
          valueForProvider: Obj
        })
      }
      setLoader(false)
    } catch (error) {
      console.log("error form context ", error)
      setObjForAuthorizationState({
        ...objForAuthorizationState,
        isAutorizedUser: true,
      })
      window.location.href = '/login'
    }
  }

  const ObjForContextData = {
    checkAuthorization: checkAuthorization,
    USER: objForAuthorizationState.valueForProvider,
    isAutorizedUser: objForAuthorizationState.isAutorizedUser
  }

  useEffect(() => {
    checkAuthorization();
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


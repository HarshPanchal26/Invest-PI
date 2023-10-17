import {verifyAllFeilds , checkEmail , checkPasswordMatch} from './VerificationFunctions';

type SignUpType ={
    email: string,
    username : string,
    password: string,
    cPassword: string
}

type responceType = {
    type : 'error' | 'warning' ,
    message : string,
    verified : boolean
}
export const verifyDataForSignUp = (Obj : SignUpType) =>{
        return new Promise(async(resolve , reject)=>{
            try {
                  await checkEmail(Obj.email)
                  await verifyAllFeilds(Obj);
                  await checkPasswordMatch(Obj.password , Obj.cPassword)
                  resolve({
                    type : 'None',
                    message : `Everything is Ohk`,
                    Verified : true
                })
            } catch (error : any) {
                 reject(error.message)
            }
        })
}




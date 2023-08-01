import {verifyAllFeilds , checkEmail , checkPasswordMatch} from './VerificationFunctions';

type SignUpType ={
    Email : string,
    Password : string,
    CPassword : string
}

type responceType = {
    type : 'error' | 'warning' ,
    message : string,
    verified : boolean
}
export const verifyDataForSignUp = (Obj : SignUpType) =>{
        return new Promise(async(resolve , reject)=>{
            try {
                  await checkEmail(Obj.Email)
                  await verifyAllFeilds(Obj);
                  await checkPasswordMatch(Obj.Password , Obj.CPassword)
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




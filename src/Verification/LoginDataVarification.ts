import {verifyAllFeilds , checkEmail } from './VerificationFunctions';

type LogInType ={
    email : string,
    password : string,
}

const verifyDataForLogIn = (Obj : LogInType) =>{
        return new Promise(async(resolve , reject)=>{
            try {
                  await verifyAllFeilds(Obj);
                  await checkEmail(Obj.email)
                  resolve({
                    type : 'None',
                    message : `Everything is Ohk`,
                    Verified : true
                })
            } catch (error : any) {
                 reject({
                    type : 'error',
                    message : `${error.message}`,
                    Verified : false
                 })
            }
        })
}


export default verifyDataForLogIn;




import {verifyAllFeilds , checkEmail , checkValidString} from './VerificationFunctions';

type TypeForPersonalDetails = {
    "first-name": string,
    "last-name": string,
    "email": string,
    "country": string,
    "street-address": string,
    "city": string,
    "state": string,
    "ZIP": number
  }


export const PersonalDataVarificationForFounder = (Obj : TypeForPersonalDetails)=>{
    return new Promise(async(resolve , reject)=>{
        try {
            await verifyAllFeilds(Obj);
            await checkEmail(Obj.email);
            await checkValidString({
                "first-name": Obj['first-name'],
                "last-name": Obj['last-name'],
                "country": Obj.country,
                "street-address": Obj['street-address'],
                "city": Obj.city,
                "state": Obj.state,
            })
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
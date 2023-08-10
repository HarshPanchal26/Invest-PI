import {
    verifyAllFeilds, checkEmail, checkValidString,
    checkForValidPhoneNumber
} from './VerificationFunctions';

type TypeForPersonalDetailsForFounder = {
    "first-name": string,
    "last-name": string,
    "email": string,
    "phone-number": string,
    // "house-number" : number,
    "country": string,
    "street-address": string,
    "city": string,
    "State": string,
    "ZIP": number
}

type TypeForPersonalDetailsCF = {
    "company-name" : string,
    "email": string,
    "about" : string,
    // "size" : string,
    "categories" : string,
    "headquarters" : string,
    "State" : string,
    "city" : string,
    "country" : string,
}


type TypeForPersonalDetailForEIL = {
    "company-name": string,
    "email": string,
    "about": string,
    "size": string,
    "industry": string,
    "specialization": string,
    "headquarters": string,
    "State": string,
    "city": string,
    "country": string,
}

type TypeForPersonalDetailForStartUps = {
    "company-name" : string,
    "email": string,
    "about" : string,
    "industry" : string,
    "specialization": string,
    "State" : string,
    "city" : string,
    "country" : string,
}

type TypeForPersonalDetailForInvestor = {
        "first-name": string,
        "last-name": string,
        "email": string,
        "categories" : string,
        "country" : string,
        "State" : string,
        "city" : string,
}
type TypeForPersonalDetailForEC = {
    "company-name" : string,
    "email": string,
    "about" : string,
    "size" : string,
    "industry" : string,
    "specialization": string,
    "headquarters" : string,
    "State" : string,
    "city" : string,
    "country" : string,
  }

export const PersonalDataVarificationForFounder = (Obj: TypeForPersonalDetailsForFounder) => {
    return new Promise(async (resolve, reject) => {
        try {
            await verifyAllFeilds(Obj);
            await checkEmail(Obj.email);
            await checkValidString({
                "first-name": Obj['first-name'],
                "last-name": Obj['last-name'],
                "country": Obj.country,
                "city": Obj.city,
                "State": Obj.State,
            })
            await checkForValidPhoneNumber(Obj['phone-number'])


            resolve({
                type: 'None',
                message: `Everything is Ohk`,
                Verified: true
            })

        } catch (error: any) {
            reject(error.message)
        }
    })
}
export const PersonalDataVarificationForCF = (Obj: TypeForPersonalDetailsCF) => {
    return new Promise(async (resolve, reject) => {
        try {
            await verifyAllFeilds(Obj);
            await checkEmail(Obj.email);
            await checkValidString({
                "first-name": Obj['company-name'],
                "country": Obj.country,
                "city": Obj.city,
                "State": Obj.State,
            })


            resolve({
                type: 'None',
                message: `Everything is Ohk`,
                Verified: true
            })

        } catch (error: any) {
            reject(error.message)
        }
    })
}

export const PersonalDataVarificationForEIL = (Obj: TypeForPersonalDetailForEIL) => {
    return new Promise(async (resolve, reject) => {
        try {
            await verifyAllFeilds(Obj);
            await checkEmail(Obj.email);
            await checkValidString({
                "company-name": Obj['company-name'],
                "about": Obj.about,
                "State": Obj.State,
                "city": Obj.city,
                "country": Obj.country,
            })
            resolve({
                type: 'None',
                message: `Everything is Ohk`,
                Verified: true
            })

        } catch (error: any) {
            reject(error.message)
        }
    })
}

export const PersonalDataVarificationForStartUps = (Obj: TypeForPersonalDetailForStartUps) => {
    return new Promise(async (resolve, reject) => {
        try {
            await verifyAllFeilds(Obj);
            await checkEmail(Obj.email);
            await checkValidString({
                "company-name": Obj['company-name'],
                "about": Obj.about,
                "State": Obj.State,
                "city": Obj.city,
                "country": Obj.country,
            })
            resolve({
                type: 'None',
                message: `Everything is Ohk`,
                Verified: true
            })

        } catch (error: any) {
            reject(error.message)
        }
    })
}

export const PersonalDataVarificationForInvestor = (Obj: TypeForPersonalDetailForInvestor) => {
    return new Promise(async (resolve, reject) => {
        try {
            await verifyAllFeilds(Obj);
            await checkEmail(Obj.email);
            await checkValidString({
                "first-name": Obj['first-name'],
                "last-name": Obj['last-name'],
                "State": Obj.State,
                "city": Obj.city,
                "country": Obj.country,
            })
            resolve({
                type: 'None',
                message: `Everything is Ohk`,
                Verified: true
            })

        } catch (error: any) {
            reject(error.message)
        }
    })
}

export const PersonalDataVarificationForEC = (Obj: TypeForPersonalDetailForEC) => {
    return new Promise(async (resolve, reject) => {
        try {
            await verifyAllFeilds(Obj);
            await checkEmail(Obj.email);
            await checkValidString({
                "Company Name": Obj['company-name'],
                "State": Obj.State,
                "city": Obj.city,
                "Country": Obj.country,
            })
            resolve({
                type: 'None',
                message: `Everything is Ohk`,
                Verified: true
            })

        } catch (error: any) {
            reject(error.message)
        }
    })
}
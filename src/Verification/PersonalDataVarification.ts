import {
    verifyAllFeilds, checkEmail, checkValidString,
    checkForValidPhoneNumber, checkForZIPCode
} from './VerificationFunctions';

import {
    TypeForStartUpsData
    , TypeForEILData,
    TypeForECData,
    TypeForCFData,
    TypeForInvestorData,
    TypeForFoundersData,
    TypeForCompany
} from '../utils/type'



export const PersonalDataVarificationForFounder = (Obj: TypeForFoundersData) => {
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
            await checkForValidPhoneNumber(Obj.phone)
            await checkForZIPCode(Obj.ZIP)


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
export const PersonalDataVarificationForCF = (Obj: TypeForCFData) => {
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

export const PersonalDataVarificationForEIL = (Obj: TypeForEILData) => {
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

export const PersonalDataVarificationForStartUps = (Obj: TypeForStartUpsData) => {
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

export const PersonalDataVarificationForInvestor = (Obj: TypeForInvestorData) => {
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

export const PersonalDataVarificationForEC = (Obj: TypeForECData) => {
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

export const PersonalDataVarificationForCompany = (Obj: TypeForCompany) => {
    return new Promise(async (resolve, reject) => {
        try {
            await verifyAllFeilds(Obj);
            await checkEmail(Obj.email);
            await checkValidString({
                "Company Name": Obj['company-name'],
                "about" : Obj.about,
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
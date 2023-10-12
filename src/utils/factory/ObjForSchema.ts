//  Please do not check single word in this file without discussion 

import {
    TypeForStartUpsData
    , TypeForEILData,
    TypeForECData,
    TypeForCFData,
    TypeForInvestorData,
    TypeForIndividualsData,
    TypeForCompany
} from '../../utils/type'

type TypeForstateForInterest = {
    type: string,
    feild: string[]
}




const SchemaForCompanyObj = (Obj: TypeForCompany) => {
    return {
        companyname: Obj['company-name'].trim(),
        // about: Obj.about.trim(),
        email: Obj.email,
        industry: Obj.industry.trim(),
        specialization: Obj.specialization.trim(),
        stage: Obj.stage,
        // link: Obj.link,
        size: Obj.size,
        headquarters: Obj.headquarters.trim(),
        state: Obj.State.trim(),
        city: Obj.city.trim(),
        country: Obj.country.trim(),
        type: 'product',
        interest: []
    }
}



const SchemaForCFObj = (Obj: TypeForCFData) => {
    return {
        firmname: Obj['company-name'].trim(),
        email: Obj.email.trim(),
        categories: Obj.categories.trim(),
        headquarters: Obj.headquarters.trim(),
        country: Obj.country.trim(),
        city: Obj.city.trim(),
        state: Obj.State.trim(),
        type: 'CF',
        interest: []
    }
}

const SchemaForIndividualsObj = (Obj: TypeForIndividualsData) => {
    return {
        firstName: Obj['first-name'],
        lastName: Obj['last-name'],
        email: Obj.email,
        phone: Obj.phone,
        country: Obj.country,
        city: Obj.city,
        state: Obj.State,
        ZIP: Obj.ZIP,
        type: 'individual',
        interest: [],
        investorType : Obj.investorType
    }
}

const SchemaForInterest = (Obj: Array<TypeForstateForInterest>) => {

    let feildOfInterest: Array<string> = [];
    Obj.filter((item: any) => {
        return item.feild.length > 0 &&
            item.feild.map((item: string) => feildOfInterest.push(item))

    })
    return feildOfInterest
}


//  NOT IN USE RIGHT NOW (Above ones are been in use)

const SchemaForStartupsobj = (Obj: TypeForStartUpsData) => {
    return {
        companyname: Obj['company-name'].trim(),
        about: Obj.about.trim(),
        email: Obj.email,
        industry: Obj.industry.trim(),
        specialization: Obj.specialization.trim(),
        link: Obj.link.trim(),
        size: "",
        headquarters: "",
        state: Obj.State.trim(),
        city: Obj.city.trim(),
        country: Obj.country.trim(),
        type: 'startups',
        interest: []
    }
}
const SchemaForInvestorObj = (Obj: TypeForInvestorData) => {
    return {
        firstName: Obj['first-name'],
        lastName: Obj['last-name'],
        email: Obj.email,
        categories: Obj.categories,
        country: Obj.country,
        // street: Obj.,
        city: Obj.city,
        state: Obj.State,
        type: 'investor',
        interest: []
    }
}
const SchemaForECObj = (Obj: TypeForECData) => {
    return {
        companyname: Obj['company-name'],
        email: Obj.email,
        about: Obj.about,
        size: Obj.size,
        industry: Obj.industry,
        specialization: Obj.specialization,
        link: "",
        headquarters: Obj.headquarters,
        state: Obj.State,
        city: Obj.city,
        country: Obj.country,
        type: 'EC',
        interest: []
    }
}

const SchemaForEILObj = (Obj: TypeForEILData) => {

    return {
        companyname: Obj['company-name'],
        email: Obj.email,
        about: Obj.about,
        size: Obj.size,
        industry: Obj.industry,
        specialization: Obj.specialization,
        headquarters: Obj.headquarters,
        state: Obj.State,
        city: Obj.city,
        country: Obj.country,
        type: 'EIL',
        interest: []
    }
}


export {
    SchemaForStartupsobj,
    SchemaForCFObj,
    SchemaForECObj,
    SchemaForEILObj,
    SchemaForIndividualsObj,
    SchemaForInvestorObj,
    SchemaForInterest,
    SchemaForCompanyObj
}
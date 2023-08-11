import {
    TypeForStartUpsData
    , TypeForEILData,
    TypeForECData,
    TypeForCFData,
    TypeForInvestorData,
    TypeForFoundersData
} from '../../utils/type'

type TypeForstateForInterest = {
    type: string,
    feild: string[]
}


const SchemaForStartupsobj = (Obj: TypeForStartUpsData) => {
    return {
        componyname: Obj['company-name'].trim(),
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

const SchemaForECObj = (Obj: TypeForECData) => {
    return {
        companyname: Obj['company-name'],
        email: Obj.email,
        about: Obj.about,
        size: Obj.size,
        industry: Obj.industry,
        specialization: Obj.specialization,
        // link: "",
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

const SchemaForCFObj = (Obj: TypeForCFData) => {
    return {
        firmname: Obj['company-name'],
        email: Obj.email,
        about: Obj.about,
        // size: Obj.size,
        categories: Obj['categories'],
        headquarters: Obj['headquarters'],
        country: Obj.country,
        city: Obj.city,
        state: Obj.State,
        type: 'CF',
        interest: []
    }
}

const SchemaForFounderObj = (Obj: TypeForFoundersData) => {
    return {
        firstName: Obj['first-name'],
        lastName: Obj['last-name'],
        email: Obj.email,
        phone: Obj.phone,
        country: Obj.country,
        city: Obj.city,
        state: Obj.State,
        ZIP: Obj.ZIP,
        type: 'founder',
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


const SchemaForInterest = (Obj: Array<TypeForstateForInterest>) => {

    let feildOfInterest: Array<string> = [];
    Obj.filter((item: any) => {
        return item.feild.length > 0 &&
            item.feild.map((item: string) => feildOfInterest.push(item))

    })
    return feildOfInterest
}



export {
    SchemaForStartupsobj,
    SchemaForCFObj,
    SchemaForECObj,
    SchemaForEILObj,
    SchemaForFounderObj,
    SchemaForInvestorObj,
    SchemaForInterest
}
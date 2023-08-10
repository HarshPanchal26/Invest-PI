const SchemaForStartupsobj = (Obj: any) => {
    return {
        componyname: Obj['company-name'].trim(),
        about: Obj.about.trim(),
        email: Obj.email,
        industry: Obj.industry.trim(),
        specialization: Obj.specialization.trim(),
        link : Obj.link.trim(),
        size: "",
        headquarters: "",
        state: Obj.State.trim(),
        city: Obj.city.trim(),
        country: Obj.country.trim(),
        type: 'startups'
    }
}


const SchemaForECObj = (Obj: any) => {
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
        type: 'EC'
    }
}

const SchemaForEILObj = (Obj: any) => {

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
        type: 'EIL'
    }
}



const SchemaForCFObj = (Obj : any) => {
    return {
        firmname: Obj['firm-name'],
        email: Obj.email,
        about : Obj.about,
        size : Obj.size,
        categories : Obj['categories'],
        headquarters: Obj['headquarters'],
        country: Obj.country,
        city: Obj.city,
        state: Obj.State,
        // ZIP: Obj.ZIP,
        type: 'CF'
    }
}

const SchemaForFounderObj = (Obj : any ) => {
    return {
        firstName: Obj['first-name'],
        lastName: Obj['last-name'],
        email: Obj.email,
        phone: Obj['phone-number'],
        country: Obj.country,
        street: Obj.street,
        city: Obj.city,
        state: Obj.State,
        ZIP: Obj.ZIP,
        type: 'founder'
    }
}

const SchemaForInvestorObj = (Obj: any) => {
    return {
        firstName: Obj['first-name'],
        lastName: Obj['last-name'],
        email: Obj.email,
        categories : Obj.categories,
        country: Obj.country,
        street: Obj.street,
        city: Obj.city,
        state: Obj.State,
        type: 'investor'
    }
}

type TypeForstateForInterest = {
    type: string,
    feild: string[]
}

const SchemaForInterest = (Obj:Array<TypeForstateForInterest>)=>{
    
    let feildOfInterest : Array<string> =  [];
    Obj.filter((item : any)=>{
        return item.feild.length > 0 &&
              item.feild.map((item : string )=>feildOfInterest.push(item))    
        
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
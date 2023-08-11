type TypeForFoundersData = {
    "first-name": string,
    "last-name": string,
    "email": string,
    "phone": string,
    "country": string,
    // "street": string,
    "city": string,
    "State": string,
    "ZIP": string
}

type TypeForInvestorData = {
    "first-name": string,
    "last-name": string,
    "email": string,
    "categories": string,
    "country": string,
    "State": string,
    "city": string,
}

type TypeForCFData = {
    "company-name": string,
    "email": string,
    "about": string,
    // "size" : string,
    "categories": string,
    "headquarters": string,
    "State": string,
    "city": string,
    "country": string,
}

type TypeForECData = {
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

type TypeForEILData = {
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

type TypeForCompany = {
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
    "link " : string,
    "stage" : string
}

type TypeForStartUpsData = {
    "company-name" : string,
    "email": string,
    "about" : string,
    "link" : string
    "industry" : string,
    "specialization": string,
    "State" : string,
    "city" : string,
    "country" : string,
}

export type {
    TypeForStartUpsData
    , TypeForEILData,
    TypeForECData,
    TypeForCFData,
    TypeForInvestorData,
    TypeForFoundersData ,
    TypeForCompany
}
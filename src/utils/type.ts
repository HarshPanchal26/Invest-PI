type TypeForIndividualsData = {
    "first-name": string,
    "last-name": string,
    "email": string,
    "phone": string,
    "country": string,
    // "street": string,
    "city": string,
    "State": string,
    "ZIP": string
    "investorType" : string
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
    "stage" : string
    "size" : string,
    "industry" : string,
    "specialization": string,
    "headquarters" : string,
    "State" : string,
    "city" : string,
    "country" : string,
    "link" : string,
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


type ContextTypeForProduct = {
   username :  string,
   companyname : string,
   email : string,
   bio : string,
   about : string,
   followers : string,
   following :  string,
   size : string,
   link : string,
   stage : string,
   industry : string,
   specialization : string,
   headquarters : string,
   city : string,
   state : string,
   country : string,
   type : string,
   interest : [],
   thoughts : [],
   companies : [],
   investments : [],
   profileImage : string,
   coverImage: string
}

type ContextTypeForCF = {
   username :  string,
   firmname : string,
   email : string,
   bio : string,
   about : string,
   badges : [],
   categories : string,
   followers : string,
   following :  string,
   headquarters : string, 
   city : string,
   state : string,
   country : string,
   type : string,
   interest : [],
   thoughts : [],
   companies : [],
   investments : [],
   profileImage : string,
   coverImage: string
}

type ContextTypeForIndividual = {
    username :  string,
    firstName : string,
    lastName : string,
    email : string,
    bio : string,
    about : string,
    follower : string,
    following :  string,
    badges : string,
    phone : string,
    city : string,
    state : string,
    country : string,
    type : string,
    investorType : string,
    interest : [],
    thoughts : [],
    companies : [],
    profileImage : string,
    coverImage : string
}

export type {
    TypeForStartUpsData
    , TypeForEILData,
    TypeForECData,
    TypeForCFData,
    TypeForInvestorData,
    TypeForIndividualsData ,
    TypeForCompany,
    ContextTypeForProduct,
    ContextTypeForIndividual,
    ContextTypeForCF
}
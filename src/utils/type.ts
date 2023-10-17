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
   people : {},
   investors : []
   investments : [],
   products : [],
   profileImage : string,
   coverImage: string,
   fundingRounds : []
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
   link : string,
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
    followers : string,
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
    investments : [],
    companies : [],
    profileImage : string,
    coverImage : string
}


type ContextTypeForThoughts = {
    author : string,
    authorprofile : string,
    authortype : string,
    comments : Array<string>,
    createdAt : string,
    isMedia : string,
    likes : string,
    link : string,
    rid : string,
    tag : Array<string>,
    thoughts : string,
    username : string,
    _id: string
}

//  Type For FAQs 


type TypeForAnswer = {
    text: string,
    urls?: string[]
  }
  
  type TypeForQueAns = {
    que: string,
    key ?: string
    ans: TypeForAnswer
  }

  type TypeForOtherDetails = {
      startDate : string,
      buisnessMode : string,
      url : string,
      avgSixMonthSale : string,
      avgSixMonthViews : string,
      avgSixMonthCustomer : string,
      avgYearSale : string,
      avgYearViews : string,
      avgYearCustomer : string,
      targetAudiences  : string
  }
  
  type TypeForFAQs = {
    Business: Array<TypeForQueAns>,
    Performance: Array<TypeForQueAns>,
    Market: Array<TypeForQueAns>,
    Financials: Array<TypeForQueAns>,
    Audience : Array<TypeForQueAns>,
    Equity : Array<TypeForQueAns>
  }

  type TypeForDetailsAboutBusiness = {
    startDate : string,
    buisnessMode : string,
    url : string,
    avgSixMonthSale : string,
    avgSixMonthViews : string,
    avgSixMonthCustomer : string,
    avgYearSale : string,
    avgYearViews : string,
    avgYearCustomer : string,
    targetAudiences  : string,
    seekingFund : number,
    currentValuation : number,
    offeredEquity : number,     
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
    ContextTypeForCF,
    ContextTypeForThoughts,
    TypeForFAQs,
    TypeForQueAns,
    TypeForAnswer,
    TypeForDetailsAboutBusiness
}
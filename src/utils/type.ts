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
    "investorType": string
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

type TypeForCompany = {
    "company-name": string,
    "email": string,
    "about": string,
    "stage": string
    "size": string,
    "industry": string,
    "specialization": string,
    "headquarters": string,
    "State": string,
    "city": string,
    "country": string,
    "link": string,
}

type TypeForStartUpsData = {
    "company-name": string,
    "email": string,
    "about": string,
    "link": string
    "industry": string,
    "specialization": string,
    "State": string,
    "city": string,
    "country": string,
}


type ContextTypeForProduct = {
    _id: string,
    rid: string,
    username: string,
    companyname: string,
    email: string,
    bio: string,
    about: string,
    followers: string,
    following: string,
    size: string,
    link: string,
    stage: string,
    industry: string,
    specialization: string,
    headquarters: string,
    city: string,
    state: string,
    country: string,
    type: string,
    interest: [],
    thoughts: [],
    companies: [],
    people: {},
    investors: []
    investments: [],
    products: [],
    profileImage: string,
    coverImage: string,
    fundingRounds: []
}

type ContextTypeForCF = {
    username: string,
    firmname: string,
    email: string,
    bio: string,
    about: string,
    badges: [],
    categories: string,
    followers: string,
    following: string,
    link: string,
    headquarters: string,
    city: string,
    state: string,
    country: string,
    type: string,
    interest: [],
    thoughts: [],
    companies: [],
    investments: [],
    profileImage: string,
    coverImage: string
}

type ContextTypeForIndividual = {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    bio: string,
    about: string,
    followers: string,
    following: string,
    badges: string,
    phone: string,
    city: string,
    state: string,
    country: string,
    type: string,
    investorType: string,
    interest: [],
    thoughts: [],
    investments: [],
    companies: [],
    profileImage: string,
    coverImage: string
}


type ContextTypeForThoughts = {
    author: string,
    authorprofile: string,
    authortype: string,
    comments: Array<string>,
    createdAt: string,
    isMedia: string,
    likes: string,
    link: string,
    rid: string,
    tag: Array<string>,
    thoughts: string,
    username: string,
    _id: string
}


type TypeForAnswer = {
    text: string,
    urls?: string[]
}

type TypeForQueAns = {
    que: string,
    key?: string
    ans: TypeForAnswer
}

type TypeForOtherDetails = {
    startDate: string,
    buisnessMode: string,
    url: string,
    avgSixMonthSale: string,
    avgSixMonthViews: string,
    avgSixMonthCustomer: string,
    avgYearSale: string,
    avgYearViews: string,
    avgYearCustomer: string,
    targetAudiences: string
}

type TypeForFAQs = {
    Business: Array<TypeForQueAns>,
    Performance: Array<TypeForQueAns>,
    Market: Array<TypeForQueAns>,
    Financials: Array<TypeForQueAns>,
    Audience: Array<TypeForQueAns>,
    Equity: Array<TypeForQueAns>
}

type TypeForDetailsAboutBusiness = {
    startDate: string,
    buisnessMode: string,
    url: string,
    avgSixMonthSale: string,
    avgSixMonthViews: string,
    avgSixMonthCustomer: string,
    avgYearSale: string,
    avgYearViews: string,
    avgYearCustomer: string,
    targetAudiences: string,
    seekingFund: number,
    currentValuation: number,
    offeredEquity: number,
    maximunofferedEquity : number
}

type TypeForFaqs = {
    ans: {
        text: string,
        urls: Array<string>
    },
    que: string
}

type ContextTypeForPitches = {
    seekingFund: string,
    avgSixMonthCustomer: string,
    avgSixMonthSale: string,
    avgSixMonthViews: string,
    avgYearCustomer: string,
    avgYearSale: string,
    avgYearViews: string,
    buisnessMode: string,
    currentValuation: string,
    interests: Array<string>,
    counter: Array<string>,
    views: Array<string>,
    FAQS: {
        Audience: Array<TypeForFaqs>,
        Business: Array<TypeForFaqs>,
        Equity: Array<TypeForFaqs>,
        Financials: Array<TypeForFaqs>,
        Market: Array<TypeForFaqs>,
        Performance: Array<TypeForFaqs>,
    },
    fundingType: string,
    getFunded: Boolean,
    offeredEquity: number,
    maximunOffer : number,
    rid: string,
    startDate: string,
    targetAudiences: string,
    url: string,
    _id: string,
}

type ContextTypeForComapnyDataForPitch = {
    _id: string,
    rid: string,
    companyname: string,
    username: string,
    bio: string,
    email: string,
    about: string,
    headquarters: string,
    size: string,
    city: string,
    state: string,
    country: string,
    specialization: string,
    stage: string,
    industry: string,
    link: string,
    people: Array<any>,
    profileImage: string,
    coverImage: string,
}

type TypeForInvestments = {
    recipient: string,
    dateofInvestment: string,
    typeOfInvestment: string,
    allInvestor: Array<string>,
    leadInvestors: Array<string>,
    raisedAmount: string,
    lastValuationofFundee: string,
}

type TypeForUSPs = {
    title: string,
    aboutUSP: string,
    url: string,
    likes: string,
}

type TypeForMiedia = {
    imageUrl: string,
    title: string,
    subtitle: string,
}

type ContextTypeForProductsDataForPitch = {
    _id: string,
    rid: string,
    news: Array<string>,
    usp: Array<TypeForUSPs>,
    media: Array<TypeForMiedia>,
    totalInvestor: number,
    totalRaisedFund: number,
    totalValuation: number,
    investments: Array<TypeForInvestments>,
}

type TypeForCounterNotification =  {
    _id: string,
    type: string,
    pitchId: string,
    offerFor: string,
    offerBy: string,
    offereAmount: string,
    offeredEquity: string,
    accepted: boolean,
    rejected: boolean,
    createdAt: string
}

export type {
    TypeForStartUpsData,
    TypeForEILData,
    TypeForOtherDetails,
    TypeForECData,
    TypeForCFData,
    TypeForInvestorData,
    TypeForIndividualsData,
    TypeForCompany,
    ContextTypeForProduct,
    ContextTypeForIndividual,
    ContextTypeForCF,
    ContextTypeForThoughts,
    TypeForFAQs,
    TypeForQueAns,
    TypeForAnswer,
    TypeForDetailsAboutBusiness,
    ContextTypeForPitches,
    ContextTypeForComapnyDataForPitch,
    ContextTypeForProductsDataForPitch,
    TypeForMiedia,
    TypeForFaqs,
    TypeForCounterNotification
}


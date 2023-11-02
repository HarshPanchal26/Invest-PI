import {
   ContextTypeForProduct,
   ContextTypeForIndividual,
   ContextTypeForCF,
   ContextTypeForThoughts,
   ContextTypeForPitches,
   ContextTypeForComapnyDataForPitch,
   ContextTypeForProductsDataForPitch
} from '../type';

import { decodeTextFromDisplay } from '../../utils/factory/FormatText'


type TypeForPitchData = {
   PITCHDATA : ContextTypeForPitches | null ,
   COMPANYDATA : ContextTypeForComapnyDataForPitch | null ,
   PRODUCTDATA : ContextTypeForProductsDataForPitch | null 
}

type TypeOfCommanData = {
   _id: string,
   name: string,
   username: string,
   profileImage: string,
   type: string
}

// Once Vsisted Account will being stored here until page gat refresh.
const ObjForVisitedUser: Array<Object> = [];

// COMMAN USER DATA STORAGE FOR SERCHED OR FINDED ACCOUNTS

const CommanUserDataStotage: Array<TypeOfCommanData> = [];

// COMMAN DATA STORAGE FOR VISITED PITCH

const CommanStorageForVisitedPitch : Array<TypeForPitchData> = [] 

const GenerateObjForCommanUserData = (Obj: any) : TypeOfCommanData => {
   let tmpObj = {
      _id: Obj._id,
      name: Obj.name,
      username: Obj.username,
      profileImage: Obj.profileImage,
      type: Obj.type
   }
   CommanUserDataStotage.push(tmpObj);
   return tmpObj
}


const GenerateObjForIndividual = (Obj: ContextTypeForIndividual, ArrayForThoughts: Array<ContextTypeForThoughts>, USERTYPE: 'VISITOR' | 'USERS') => {

   const ARRAYOFTHOUGHTS: ContextTypeForThoughts[] = [];

   for (let i = 0; i < ArrayForThoughts.length; i++) {
      let item = ArrayForThoughts[i];
      item.author = Obj.firstName + " " + Obj.lastName;
      item.authorprofile = Obj.profileImage;
      item.username = Obj.username;
      ARRAYOFTHOUGHTS.push(item);
   }
   return {
      USERNAME: Obj.username,
      FIRST_NAME: Obj.firstName,
      LAST_NAME: Obj.lastName,
      EMAIL: Obj.email,
      BIO: Obj.bio,
      ABOUT: decodeTextFromDisplay(Obj.about),
      FOLLOWER: Obj.followers,
      FOLLOWING: Obj.following,
      BADGES: Obj.badges,
      PHONE: Obj.phone,
      CITY: Obj.city,
      STATE: Obj.state,
      COUNTRY: Obj.country,
      TYPE: Obj.type,
      INVESTORTYPE: Obj.investorType,
      INTEREST: Obj.interest,
      THOUGHTS: Obj.thoughts,
      COMPANIES: Obj.companies,
      INVESTMENTS: Obj.investments,
      PROFILEIMAGE: Obj.profileImage,
      COVERIMAGE: Obj.coverImage,
      ARRAYOFTHOUGHTS: ARRAYOFTHOUGHTS,
      USERTYPE: USERTYPE
   }
}


const GenerateObjForProducts = (Obj: ContextTypeForProduct, ArrayForThoughts: ContextTypeForThoughts[], product: any, USERTYPE: 'VISITOR' | 'USERS') => {

   const ARRAYOFTHOUGHTS: ContextTypeForThoughts[] = [];

   for (let i = 0; i < ArrayForThoughts.length; i++) {
      let item = ArrayForThoughts[i];
      item.author = Obj.companyname;
      item.authorprofile = Obj.profileImage;
      item.username = Obj.username;
      ARRAYOFTHOUGHTS.push(item);
   }

   return {
      USERID: Obj.rid,
      USERNAME: Obj.username,
      COMPANYNAME: Obj.companyname,
      EMAIL: Obj.email,
      BIO: Obj.bio,
      ABOUT: decodeTextFromDisplay(Obj.about),
      FOLLOWER: Obj.followers,
      FOLLOWING: Obj.following,
      SIZE: Obj.size,
      LINK: Obj.link,
      STAGE: Obj.stage,
      INDUSTRY: Obj.industry,
      SPECIALIZATION: Obj.specialization,
      HEADQUARTERS: Obj.headquarters,
      CITY: Obj.city,
      STATE: Obj.state,
      COUNTRY: Obj.country,
      TYPE: Obj.type,
      INTEREST: Obj.interest,
      THOUGHTS: Obj.thoughts,
      COMPANIES: Obj.companies,
      PEOPLE: Obj.people,
      INVESTOR: Obj.investors,
      PRODUCTINSIDE: product,
      INVESTMENTS: [],
      FUNDINGROUNDS: Obj.fundingRounds || [],
      PROFILEIMAGE: Obj.profileImage,
      COVERIMAGE: Obj.coverImage,
      ARRAYOFTHOUGHTS: ARRAYOFTHOUGHTS,
      USERTYPE: USERTYPE
      // PRODUCTS : Obj.products,
   }
}

const GenerateObjForCF = (Obj: ContextTypeForCF, ArrayForThoughts: ContextTypeForThoughts[], USERTYPE: 'VISITOR' | 'USERS') => {
   const ARRAYOFTHOUGHTS: ContextTypeForThoughts[] = [];

   for (let i = 0; i < ArrayForThoughts.length; i++) {
      let item = ArrayForThoughts[i];
      item.author = Obj.firmname;
      item.authorprofile = Obj.profileImage;
      item.username = Obj.username;
      ARRAYOFTHOUGHTS.push(item);
   }
   return {
      USERNAME: Obj.username,
      FIRMNAME: Obj.firmname,
      EMAIL: Obj.email,
      BIO: Obj.bio,
      ABOUT: decodeTextFromDisplay(Obj.about),
      FOLLOWER: Obj.followers,
      FOLLOWING: Obj.following,
      CATEGORIES: Obj.categories,
      HEADQUARTERS: Obj.headquarters,
      CITY: Obj.city,
      BADGES: Obj.badges,
      STATE: Obj.state,
      COUNTRY: Obj.country,
      TYPE: Obj.type,
      LINK: Obj.link,
      INTEREST: Obj.interest,
      THOUGHTS: Obj.thoughts,
      COMPANIES: Obj.companies,
      INVESTMENTS: Obj.investments,
      PROFILEIMAGE: Obj.profileImage,
      COVERIMAGE: Obj.coverImage,
      ARRAYOFTHOUGHTS: ARRAYOFTHOUGHTS,
      USERTYPE: USERTYPE
   }
}


const GenerateObjForPitchData = (ObjForPitch: any): ContextTypeForPitches => {
   return {
      seekingFund: ObjForPitch.seekingFund,
      avgSixMonthCustomer: ObjForPitch.avgSixMonthCustomer,
      avgSixMonthSale: ObjForPitch.avgSixMonthSale,
      avgSixMonthViews: ObjForPitch.avgSixMonthViews,
      avgYearCustomer: ObjForPitch.avgYearCustomer,
      avgYearSale: ObjForPitch.avgYearSale,
      avgYearViews: ObjForPitch.avgYearViews,
      buisnessMode: ObjForPitch.buisnessMode,
      currentValuation: ObjForPitch.currentValuation,
      interests: ObjForPitch.engagement.interests,
      counter: ObjForPitch.engagement.counter,
      views: ObjForPitch.engagement.views,
      fundingType: ObjForPitch.fundingType,
      getFunded: ObjForPitch.getFunded,
      offeredEquity: ObjForPitch.offeredEquity,
      rid: ObjForPitch.rid,
      startDate: ObjForPitch.startDate,
      targetAudiences: ObjForPitch.targetAudiences,
      url: ObjForPitch.url,
      maximunOffer : ObjForPitch.maximumOffer,
      FAQS: {
         Audience: ObjForPitch.faqs.Audience,
         Business: ObjForPitch.faqs.Business,
         Equity: ObjForPitch.faqs.Equity,
         Financials: ObjForPitch.faqs.Financials,
         Market: ObjForPitch.faqs.Market,
         Performance: ObjForPitch.faqs.Performance,
      },
      _id: ObjForPitch._id
   }
}

const GenerateCompanyObjForPitch = (ObjForCompanyData: any): ContextTypeForComapnyDataForPitch => {
   return {
      _id: ObjForCompanyData._id,
      rid: ObjForCompanyData.rid,
      companyname: ObjForCompanyData.companyname,
      username: ObjForCompanyData.username,
      bio: ObjForCompanyData.bio,
      email: ObjForCompanyData.email,
      about: ObjForCompanyData.about,
      headquarters: ObjForCompanyData.headquarters,
      size: ObjForCompanyData.size,
      city: ObjForCompanyData.city,
      state: ObjForCompanyData.state,
      country: ObjForCompanyData.country,
      specialization: ObjForCompanyData.specialization,
      stage: ObjForCompanyData.stage,
      industry: ObjForCompanyData.industry,
      link: ObjForCompanyData.link,
      people: ObjForCompanyData.people,
      profileImage: ObjForCompanyData.profileImage,
      coverImage: ObjForCompanyData.coverImage,
   }
}

const GenerateProductObjDataForPitch = (ObjForProduct: any): ContextTypeForProductsDataForPitch => {
   return {
      _id: ObjForProduct._id,
      rid: ObjForProduct.rid,
      news: ObjForProduct.news,
      usp: ObjForProduct.usp,
      media: ObjForProduct.media,
      totalInvestor: ObjForProduct.totalInvestor,
      totalRaisedFund: ObjForProduct.totalRaisedFund,
      totalValuation: ObjForProduct.totalValuation,
      investments: ObjForProduct.investments,
   }
}



export {
   GenerateObjForProducts,
   GenerateObjForIndividual,
   GenerateObjForCF,
   GenerateObjForCommanUserData,
   GenerateCompanyObjForPitch ,
   GenerateObjForPitchData,
   GenerateProductObjDataForPitch,
   ObjForVisitedUser,
   CommanUserDataStotage,
   CommanStorageForVisitedPitch
};
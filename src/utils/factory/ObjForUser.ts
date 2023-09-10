import { ContextTypeForProduct ,
    ContextTypeForIndividual , 
    ContextTypeForCF} from '../type';
import {decodeTextFromDisplay} from '../../utils/factory/FormatText'

const GenerateObjForIndividual = (Obj : ContextTypeForIndividual)=>{
   console.log("Data For Individual" ,Obj )
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
      PROFILEIMAGE: Obj.profileImage,
      COVERIMAGE: Obj.coverImage
   }
}


const GenerateObjForProducts = (Obj: ContextTypeForProduct) => {
   return {
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
      INVESTMENTS: Obj.investments,
      PROFILEIMAGE: Obj.profileImage,
      COVERIMAGE: Obj.coverImage
   }
}

const GenerateObjForCF = (Obj : ContextTypeForCF)=>{
   console.log("Data for CF " , Obj)
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
      BADGES : Obj.badges,
      STATE: Obj.state,
      COUNTRY: Obj.country,
      TYPE: Obj.type,
      INTEREST: Obj.interest,
      THOUGHTS: Obj.thoughts,
      COMPANIES: Obj.companies,
      INVESTMENTS: Obj.investments,
      PROFILEIMAGE: Obj.profileImage,
      COVERIMAGE: Obj.coverImage
   }
}


const ObjForVisitedUser : Array<Object>  = [];


export {  GenerateObjForProducts , GenerateObjForIndividual,GenerateObjForCF , ObjForVisitedUser };
import { ContextTypeForProduct ,
    ContextTypeForIndividual , 
    ContextTypeForCF} from '../type';

const GenerateObjForIndividual = (Obj : ContextTypeForIndividual)=>{
   return {
      USERNAME: Obj.username,
      FIRST_NAME: Obj.firstName,
      LAST_NAME: Obj.lastName,
      EMAIL: Obj.email,
      BIO: Obj.bio,
      ABOUT: Obj.about,
      FOLLOWER: Obj.follower,
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
   console.log("Product Generator " , Obj)
   return {
      USERNAME: Obj.username,
      COMPANYNAME: Obj.companyname,
      EMAIL: Obj.email,
      BIO: Obj.bio,
      ABOUT: Obj.about,
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
   return {
      USERNAME: Obj.username,
      FIRMNAME: Obj.firmname,
      EMAIL: Obj.email,
      BIO: Obj.bio,
      ABOUT: Obj.about,
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

export {  GenerateObjForProducts , GenerateObjForIndividual,GenerateObjForCF};
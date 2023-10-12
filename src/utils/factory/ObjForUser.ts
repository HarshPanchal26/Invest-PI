import { ContextTypeForProduct ,
    ContextTypeForIndividual , 
    ContextTypeForCF , ContextTypeForThoughts} from '../type';
import {decodeTextFromDisplay} from '../../utils/factory/FormatText'

const GenerateObjForIndividual = (Obj : ContextTypeForIndividual , ArrayForThoughts : Array<ContextTypeForThoughts>)=>{

   const ARRAYOFTHOUGHTS : ContextTypeForThoughts[]   = []; 
   
   for(let i=0;i<ArrayForThoughts.length; i++){
      let item = ArrayForThoughts[i];
      console.log("item" ,item);
      item.author =  Obj.firstName + " " + Obj.lastName;
      item.authorprofile = Obj.profileImage;
      item.username = Obj.username;
      console.log("item" , item);
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
      ARRAYOFTHOUGHTS : ARRAYOFTHOUGHTS
   }
}


const GenerateObjForProducts = (Obj: ContextTypeForProduct , ArrayForThoughts : ContextTypeForThoughts[] , product : any) => {
   
   const ARRAYOFTHOUGHTS : ContextTypeForThoughts[]   = []; 
   
   for(let i=0;i<ArrayForThoughts.length; i++){
      let item = ArrayForThoughts[i];
      item.author =  Obj.companyname;
      item.authorprofile = Obj.profileImage;
      item.username = Obj.username;
      ARRAYOFTHOUGHTS.push(item);
   }

   return  {
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
      PRODUCTS : Obj.products,
      INVESTMENTS: Obj.investments,
      PROFILEIMAGE: Obj.profileImage,
      COVERIMAGE: Obj.coverImage,
      ARRAYOFTHOUGHTS : ARRAYOFTHOUGHTS,
      PRODUCTINSIDE : product
   }
}

const GenerateObjForCF = (Obj : ContextTypeForCF , ArrayForThoughts : ContextTypeForThoughts[])=>{
   const ARRAYOFTHOUGHTS : ContextTypeForThoughts[]   = []; 
   
   for(let i=0;i<ArrayForThoughts.length; i++){
      let item = ArrayForThoughts[i];
      item.author =  Obj.firmname;
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
      BADGES : Obj.badges,
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
      ARRAYOFTHOUGHTS : ARRAYOFTHOUGHTS

   }
}


const ObjForVisitedUser : Array<Object>  = [];


export {  GenerateObjForProducts , GenerateObjForIndividual,GenerateObjForCF , ObjForVisitedUser };
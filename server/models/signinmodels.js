const mongoose = require('mongoose');
const validator = require('validator');

// Schema is been is use for Individual account(Investor and Founder)
const SchemaForIndividuals = new mongoose.Schema({
  rid: {
    type: String,
    required: true,
  },
  username : {
    type : String,
    required : true 
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  bio : {
    type : String,
    require : false,
    default  : 'NA'
  },
  about : {
    type : String,
    require : false,
    default  : 'NA'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address',
    }
  },
  followers : {
    type : Number,
    require : false,
    default : 0
  },
  following : {
    type : Number,
    require : false,
    default : 0
  },
  phone: {
    type: Number,
    required: true,
  },
  badges : {
    type : Array,
    require : false,
    default  : []
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  type : {
    type: String,
    required: true,
  },
  investorType : {
    type: String,
    required: true,
  },
  interest  :{
    type : Array,
    required: false,
    default  : []
  },
  thoughts : {
    type : Array,
    require : false,
    default : []
  },
  companies :{
    type : Array,
    require : false,
    default : []
  },
  investments : {
    type : Array,
    require : false,
    default : []
  },
  profileImage : {
    type : String,
    require : false,
    default : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'        

  },
  coverImage : {
    type : String,
    default  : 'NA',
    require : false,
  },

})

// Schema for Capital Firm 
const SchemaForCF = new mongoose.Schema({
  rid: {
    type: String,
    required: true,
  },
  username : {
    type : String,
    required : true 
  },
  firmname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address',
    },
  },
  bio : {
    type: String,
    required: false,
    default  : 'NA'
  },
  about: {
    type: String,
    required: false,
    default  : 'NA'
  },
  followers : {
    type : Number,
    require : false,
    default : 0
  },
  following : {
    type : Number,
    require : false,
    default : 0
  },
  categories: {
    type: String,
    required: true,
  },
  badges : {
    type : Array,
    require : false,
    default  : []
  },
  headquarters : {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  type : {
    type: String,
    required: true,
  },
  link : {
    type: String,
    required: false,
    default : 'NA'    
  },
  interest  :{
    type : Array,
    required: true,
  },
  thoughts : {
    type : Array,
    require : false,
    default : []
  },
  companies :{
    type : Array,
    require : false,
    default : []
  },
  investments : {
    type : Array,
    require : false,
    default : []
  },
  profileImage : {
    type : String,
    require : false,
    default : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'        

  },
  coverImage : {
    type : String,
    require : false,
    default  : 'NA'
  },
  people : {
    type : Array,   
    require : false,
    default  : []
  },
  createdAt : {
    type : Date,
    require : false,
    default : new Date()    
  },
  lastUpdated : {
    type : Date,
    require : false,
    default : new Date()
  }

})

// Schema for Company or products
const SchemaForCompany = new mongoose.Schema({
  rid: {
    type: String,
    required: true,
  },
  username : {
    type: String,
    required: true,
  },
  companyname: {
    type: String,
    required: true,
  },
  bio : {
    type: String,
    required: false,
    default : 'NA'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address',
    },
  },
  about: {
    type: String,
    required: false,
    default : 'NA'
  },
  followers : {
    type : Number,
    require : false,
    default : 0
  },
  following : {
    type : Number,
    require : false,
    default : 0
  },
  size: {
    type: String,
    required: false,
  },
  link : {
    type: String,
    required: false,
    default : 'NA'    
  },
  industry : {
    type: String,
    required: true,    
  },
  specialization: {
    type: String,
    required: true,
  },
  stage : {
    type: String,
    required: true,
  },
  headquarters: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  type : {
    type: String,
    required: true,
  },
  interest  :{
    type : Array,
    required: true,
  },
  badges : {
    type : [],
    require : false,
    default : []
  },
  thoughts : {
    type : Array,
    require : false,
    default : []
  },
  companies :{
    type : Array,
    require : false,
    default : []
  },
  people : {
    type : Object,
    require : false,
    default : {}
  },
  investors : {
    type : Array,
    require : false,
    default : []    
  },
  investments : {
    type : Array,
    require : false,
    default : []
  },
  products : {
    type : Array,
    require : false,
    default : []    
  },
  profileImage : {
    type : String,
    require : false,
    default : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'        

  },
  coverImage : {
    type : String,
    require : false,
    default : 'NA'
  },
  fundingRounds :{
    type : Array,
    require : false,
    default : []
  },

} , { minimize: false })

// Schema for common data (authentication and authorization)
const SchemaForCommanUserData = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  username : {
    type: String,
    required: true,
  },
  name : {
    type: String,
    required: false,
    default : 'name'    
  },
  profileImage : {
    type: String,
    required: false,
    default : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'        
  }

})



module.exports = { SchemaForIndividuals,
   SchemaForCommanUserData, 
   SchemaForCF,
   SchemaForCompany
  };

// const SchemaForEC = new mongoose.Schema({
  //   rid: {
  //     type: String,
  //     required: true,
  //   },
  //   companyname: {
  //     type: String,
  //     required: true,
  //   },
  //   email: {
  //     type: String,
  //     required: true,
  //     unique: true,
  //     validate: {
  //       validator: validator.isEmail,
  //       message: 'Invalid email address',
  //     },
  //   },
  //   about: {
  //     type: String,
  //     required: true,
  //   },
  //   size: {
  //     type: String,
  //     required: true,
  //   },
  //   industry : {
  //     type: String,
  //     required: true,    
  //   },
  //   specialization: {
  //     type: String,
  //     required: true,
  //   },
  //   link : {
  //     type: String,
  //     required: true,
  //   },
  //   headquarters: {
  //     type: String,
  //     required: true,
  //   },
  //   city: {
  //     type: String,
  //     required: true,
  //   },
  //   state: {
  //     type: String,
  //     required: true,
  //   },
  //   country: {
  //     type: String,
  //     required: true,
  //   },
  //   type : {
  //     type: String,
  //     required: true,
  //   },
  //   interest  :{
  //     type : Array,
  //     required: true,
  //   }
  
  // })
  
  // const SchemaForStartUp = new mongoose.Schema({
  //   rid: {
  //     type: String,
  //     required: true,
  //   },
  //   companyname: {
  //     type: String,
  //     required: true,
  //   },
  //   email: {
  //     type: String,
  //     required: true,
  //     unique: true,
  //     validate: {
  //       validator: validator.isEmail,
  //       message: 'Invalid email address',
  //     },
  //   },
  //   about: {
  //     type: String,
  //     required: true,
  //   },
  //   size: {
  //     type: String,
  //     required: true,
  //   },
  //   industry : {
  //     type: String,
  //     required: true,    
  //   },
  //   specialization: {
  //     type: String,
  //     required: true,
  //   },
  //   link : {
  //     type: String,
  //     required: true,
  //   },
  //   headquarters: {
  //     type: String,
  //     required: true,
  //   },
  //   city: {
  //     type: String,
  //     required: true,
  //   },
  //   state: {
  //     type: String,
  //     required: true,
  //   },
  //   country: {
  //     type: String,
  //     required: true,
  //   },
  //   type : {
  //     type: String,
  //     required: true,
  //   },
  //   interest  :{
  //     type : Array,
  //     required: true,
  //   }
  
  // })


  //  Not in use right now
// const SchemaForInvestor = new mongoose.Schema({
//   rid: {
//     type: String,
//     required: true,
//   },
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     validate: {
//       validator: validator.isEmail,
//       message: 'Invalid email address',
//     },
//   },
//   categories: {
//     type: String,
//     required: true,
//   },
//   city: {
//     type: String,
//     required: true,
//   },
//   state: {
//     type: String,
//     required: true,
//   },
//   country: {
//     type: String,
//     required: true,
//   },
//   type : {
//     type: String,
//     required: true,
//   },
//   interest  :{
//     type : Array,
//     required: true,
//   }

// })




// const client = new Client();

// client
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('64e86e3e11bf8bb954c6');




/*
  VERTICAL HORIZONTAL SCALLINIG
  APP SERVER WEB SERVER 
  CDN
  PRIVATE NETWORK 
  DRIVERS 
*/
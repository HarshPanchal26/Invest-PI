const mongoose = require('mongoose');
const { string } = require('prop-types');
const validator = require('validator');

const SchemaForFounders = new mongoose.Schema({
  rid: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  phone: {
    type: Number,
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
  }

})

const SchemaForInvestor = new mongoose.Schema({
  rid: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  categories: {
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
  }

})

const SchemaForCF = new mongoose.Schema({
  rid: {
    type: String,
    required: true,
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
  about: {
    type: String,
    required: true,
  },
  categories: {
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
  }

})

const SchemaForEIL = new mongoose.Schema({
  rid: {
    type: String,
    required: true,
  },
  companyname: {
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
  about: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  industry : {
    type: String,
    required: true,    
  },
  specialization: {
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
  }

})

const SchemaForEC = new mongoose.Schema({
  rid: {
    type: String,
    required: true,
  },
  companyname: {
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
  about: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  industry : {
    type: String,
    required: true,    
  },
  specialization: {
    type: String,
    required: true,
  },
  link : {
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
  }

})

const SchemaForStartUp = new mongoose.Schema({
  rid: {
    type: String,
    required: true,
  },
  companyname: {
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
  about: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  industry : {
    type: String,
    required: true,    
  },
  specialization: {
    type: String,
    required: true,
  },
  link : {
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
  }

})

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
  }
})


module.exports = { SchemaForFounders,
   SchemaForCommanUserData, 
   SchemaForInvestor ,
   SchemaForCF,
   SchemaForEIL,
   SchemaForStartUp,
   SchemaForEC
  };
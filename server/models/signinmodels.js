const mongoose = require('mongoose');
const validator = require('validator');

const SchemaForuserPersonalData = new mongoose.Schema({
    rid : {
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
      phoneNumber  : {
        type : Number,
        required: true,
      },
      streetAddress : {
        type : String,
        required: true,
      },
      city : {
        type : String,
        required: true,
      },
      State : {
        type : String,
        required: true,
      },
      country : {
        type : String,
        required: true,
      },
      ZIPCode : {
        type : String,
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
    password : {
        type : String,
        required: true,
    },
    type : {
        type : String,
        required: true,
    }
})
// const commonDataForuser = mongoose.model('CommonUserData' , SchemaForCommanUserData , 'common-users-storage')
// const PersonalData = mongoose.model('PerosnalData' , SchemaForuserPersonalData );
module.exports = {SchemaForuserPersonalData , SchemaForCommanUserData};
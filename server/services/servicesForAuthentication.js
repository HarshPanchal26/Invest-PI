const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { mongoose } = require('../config/database');
const { SchemaForCommanUserData , SchemaForuserPersonalData} = require('../models/signinmodels');

const createUser = (objForSignIn , objForData)=>{
    return new Promise(async(resolve, reject) => {
        const db = mongoose.connection.useDb('users');
        const Model = db.model('Users', SchemaForCommanUserData , 'common-users-storage');
        try {
            const res = await Model.create(objForSignIn);
            console.log("Id" , res._id)
            const token = await createSession({uid : res._id }) 
            console.log("token" , token)
            const additionalData = await addUserDetails({rid : res._id , ...objForData })
            console.log("additionalData" , additionalData)
            resolve({
                data : res,
                token : token   
            })    
        } catch (error) {
            reject(error.message)
        }
    })
}

const addUserDetails = (obj)=>{
    return new Promise(async(resolve , reject)=>{
        const db = mongoose.connection.useDb('users');
        const Model = db.model('Users', SchemaForuserPersonalData , 'user-as-founder');
        try {
            const res = await Model.create(obj)
            console.log("res" , res)
            resolve({
                status : true,
                verified: true,
                token : true,
                additionalata : true,
                message : 'Sign In Completed with data storage'   
            })
        } catch (error) {
            console.log('Error form additional data ' , error)
            reject(
                `Sign In is completed but ${error.message}  `   
            )
        }
    })         
}


const encryptedPassword=(value)=>{
   const saltRounds = 10;
   return new Promise(async(resolve , reject)=>{
       try {
           const salt  = await bcrypt.genSalt(saltRounds);
           const hashedPassword = await bcrypt.hash(value, salt);
           resolve(hashedPassword);
        } catch (error) {
           reject(error.message)
        }
           
    })
        
}


const createSession = (obj)=>{
   return new Promise((resolve , rejects)=>{
        try {
            const token = jwt.sign(obj , process.env.ACCESS_TOKEN_SECRET ,{expiresIn : '30m'});
            resolve(token)
        } catch (error) {
            rejects({
                token : false,
                error : error.message
            })
        }
   }) 
}

module.exports = {createUser , createSession , encryptedPassword};
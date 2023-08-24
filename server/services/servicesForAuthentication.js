const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { mongoose } = require('../config/database');
const { 
    SchemaForIndividuals,
    SchemaForCommanUserData, 
    // SchemaForInvestor,
    SchemaForCF,
    SchemaForCompany } = require('../models/signinmodels');

const createUser = ( objForData , objForSignIn) => {
    const responceObj = {
        status: false,
        token: null,
        dataStorage: false,
        message: ''
    }
    let Schema = null;
    let Collection = '';

    // console.log("objForData.type" , objForData.type , objForData.stage)

    if(objForData.type === 'product'){
        Schema = SchemaForCompany 
        Collection = 'user-as-company'
    }else if(objForData.type === 'CF'){
        Schema = SchemaForCF
        Collection = 'user-as-CF'
    }else {
        Schema = SchemaForIndividuals
        Collection = 'user-as-individual'  
    }


    return new Promise(async (resolve, reject) => {
        const db = mongoose.connection.useDb('users');
        const Model = db.model('Users', SchemaForCommanUserData, 'common-users-storage');
        try {
            const res = await Model.create(objForSignIn);
            responceObj.status = true
            const token = await createSession({ uid: res._id , type : objForData.type})
            // console.log("token", token)
            responceObj.token = token
            const additionalData = await addUserDetails({ rid: res._id, ...objForData } , Schema , Collection.trim())
            responceObj.dataStorage = additionalData._id;
            resolve(responceObj)
        } catch (error) {
            reject({
                ...responceObj,
                message: error.message
            })
        }
    })
}

const addUserDetails = (obj , Schema , Collection) => {
    return new Promise(async (resolve, reject) => {
        const db = mongoose.connection.useDb('users');
        const Model = db.model('Users', Schema, Collection);
        try {
            const res = await Model.create(obj)
            resolve(res)
        } catch (error) {
            console.log('Error form additional data', error)
            reject(error.message)
        }
    })
}


const encryptedPassword = (value) => {
    const saltRounds = 10;
    return new Promise(async (resolve, reject) => {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            console.log("salt" ,salt)
            const hashedPassword = await bcrypt.hash(value, `$2b$10$.Ndp7FhVhm1.wo0aiRLPpO`);
            resolve(hashedPassword);
        } catch (error) {
            reject(error.message)
        }

    })
}

const createSession = (obj) => {
    return new Promise((resolve, rejects) => {
        try {
            const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
            resolve(token)
        } catch (error) {
            rejects(error.message)
        }
    })
}

module.exports = { createUser, createSession, encryptedPassword };



// $2b$10$DmXtr2LX8eiYBLPqzGDJue


// $2b$10$.Ndp7FhVhm1.wo0aiRLPpO
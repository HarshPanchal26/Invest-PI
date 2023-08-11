const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { mongoose } = require('../config/database');
const { SchemaForCommanUserData, SchemaForFounders } = require('../models/signinmodels');

const createUser = (objForSignIn, objForData) => {
    const responceObj = {
        status: false,
        token: null,
        dataStorage: false,
        message: ''
    }
    return new Promise(async (resolve, reject) => {
        const db = mongoose.connection.useDb('users');
        const Model = db.model('Users', SchemaForCommanUserData, 'common-users-storage');
        try {
            const res = await Model.create(objForSignIn);
            responceObj.status = true
            const token = await createSession({ uid: res._id })
            console.log("token", token)
            responceObj.token = token
            const additionalData = await addUserDetails({ rid: res._id, ...objForData })
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

const addUserDetails = (obj) => {
    return new Promise(async (resolve, reject) => {
        const db = mongoose.connection.useDb('users');
        const Model = db.model('Users', SchemaForFounders, 'user-as-founder');
        try {
            const res = await Model.create(obj)
            resolve(res)
        } catch (error) {
            console.log('Error form additional data ', error)
            reject(error.message)
        }
    })
}


const encryptedPassword = (value) => {
    const saltRounds = 10;
    return new Promise(async (resolve, reject) => {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(value, salt);
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
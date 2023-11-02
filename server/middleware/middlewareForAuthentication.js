const { mongoose } = require('../config/database')
const { SchemaForCommanUserData } = require('../models/signinmodels')
const jwt = require('jsonwebtoken');


// function for check whether user with same email and username is exist or not 
const isValidUser = async (req, res, next) => {
    const { authenticationData } = req.body;

    const db = mongoose.connection.useDb('users');
    const Model = db.model('Users', SchemaForCommanUserData, 'common-users-storage');

    try {
        let user = await Model.findOne({ email: authenticationData.email });
        if (user !== null) {
            res.status(401).json({
                status: false,
                verified: false,
                token: false,
                message: 'This Email is already in use'
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("error =>"  , error) 
        res.status(401).json({
            status: false,
            verified: false,
            token: false,
            message: error.message
        })
    }
}

const isTokenValid = (req, res, next) => {
    console.log("headers", req.cookies['access_token']);
    let token = req.cookies['access_token'];
    if (token) {

        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    console.log(err.message);
                    res.json({
                        authorization: false,
                        message: err.message
                    })
                } else {
                    req.headers['Access-id'] = decoded.uid
                    next();
                }
            });
        } catch (error) {
            res.status(404).send(error.message);
        }
    } else {
        res.json({
            authorization: false,
            message: 'You Need to Login Fisrt'
        });
    }

}

// method for authenticate session token whethere it is valid or not 
const isAutorized = (req, res, next) => {
    console.log("headers is Authorized ==>", req.cookies['access_token']);
    let token = req.cookies['access_token'];
    if (token) {
        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.json({
                        authorized: false,
                        message: 'You Need to Login/SignIn'
                    })
                } else {
                    console.log("decoded token===>" , decoded.uid)
                    req.headers['Access-id'] = decoded.uid;
                    res.locals.uid =  decoded.uid
                    res.locals.type = decoded.type
                    next();
                }
            })
        } catch (error) {
            console.log("error in Authorization " , error)
            res.status(401).json({
                authorized: false,
                message: error.message
            })
        }
    }else{
        res.status(402).json({
            authorized: false,
            message: 'You are not authorized'
        })
    }
}

const varifySessionData = (req , res)=>{

}



module.exports = { isValidUser, isTokenValid, isAutorized  , varifySessionData}



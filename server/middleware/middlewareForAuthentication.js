const { mongoose } = require('../config/database')
const { SchemaForCommanUserData } = require('../models/signinmodels')
const jwt = require('jsonwebtoken');

const isValidUser = async (req, res, next) => {
    const { authenticationData } = req.body;

    const db = mongoose.connection.useDb('users');
    const Model = db.model('Users', SchemaForCommanUserData, 'common-users-storage');

    try {
        let user = await Model.findOne({ email: authenticationData.email });
        if (user !== null) {
            console.log("error ===>"  , "Not valid") 
            res.json({
                status: false,
                verified: false,
                token: false,
                message: 'This Email is not valid'
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("error =>"  , error) 
        res.json({
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
                        Autorization: false,
                        message: err.message
                    })
                } else {
                    // console.log("decode =============?????", decoded)
                    req.headers['Access-id'] = decoded.uid
                    next();
                }
            });
        } catch (error) {
            res.status(404).send(error.message);
        }
    } else {
        res.json({
            Autorization: false,
            message: 'You Need to Login Fisrt'
        });
    }

}

const isAutorized = (req, res, next) => {
    console.log("headers", req.cookies['access_token']);
    let token = req.cookies['access_token'];
    if (token) {

        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.json({
                        authorized: false,
                        message: 'You Need to Login/SignIn '
                    })
                } else {
                    console.log("decoded token " , decoded.uid)
                    req.headers['Access-id'] = decoded.uid;
                    next();
                }
            })
        } catch (error) {
            res.json({
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


module.exports = { isValidUser, isTokenValid, isAutorized }



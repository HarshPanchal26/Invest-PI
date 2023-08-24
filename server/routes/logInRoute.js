const experess = require('express');
const controllerForLogIn = require('../controller/controllerForLogIn') 
const {isValidUser , isAutorized} = require('../middleware/middlewareForAuthentication')

const router = experess.Router();

router.get('/', (_req,res)=>{
    res.send("I am body")
})

router.post('/user', controllerForLogIn);

router.get('/authorization' , isAutorized , (_req , res)=>{
    res.status(201).json({
        authorized : true,
        message : 'Autorized Person'
    })
})

module.exports = router;


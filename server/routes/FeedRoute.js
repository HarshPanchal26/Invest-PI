const experess = require('express');
const ControllerForFeed = require('../controller/controllerForFeed') 
const {isValidUser , isAutorized} = require('../middleware/middlewareForAuthentication')
const getUserData = require('../middleware/middlewareForUserData')

const router = experess.Router();

router.get('/', (req,res)=>{
    res.send("I am body")
})

router.get('/authorization' , isAutorized , getUserData , (_req , res)=>{
    res.status(201).json({
        authorized : true,
        data : res.locals.user,
        message : 'Autorized Person.',
    })
})
router.post('/posts', isValidUser , (req , res)=>{
    res.status(201).send("All Clear")
});



module.exports = router;

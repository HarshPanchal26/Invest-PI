const experess = require('express');
const {isAutorized} = require('../middleware/middlewareForAuthentication')
const getUserData = require('../middleware/middlewareForUserData');
const {controllerForFeed , controllerForSingleFeed} = require('../controller/controllerForFeed');

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

router.post('/fetchposts', isAutorized , controllerForFeed);
router.post('/fetchposts/single', isAutorized , controllerForSingleFeed);

module.exports = router;

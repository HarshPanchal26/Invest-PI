const experess = require('express');
const {isAutorized} = require('../middleware/middlewareForAuthentication')
const getUserData = require('../middleware/middlewareForUserData');
const {controllerForAllFeed, controllerForSingleFeed} = require('../controller/controllerForFeed');
const {ServerSocket} = require('../socketio');
const {io} = require('../server');

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

router.get('/thoughts/all', isAutorized , controllerForAllFeed);
router.post('/fetchposts/single', isAutorized , controllerForSingleFeed);

module.exports = router;

const experess = require('express');
const ContollerForSignIn = require('../controller/controllerForSignIn') 
const {isValidUser , isAutorized} = require('../middleware/middlewareForAuthentication')

const router = experess.Router();

router.get('/', (_req,res)=>{
    res.send("I am body")
})
router.get('/authorization' , isAutorized , (_req , res)=>{
    res.status(201).json({                  
        authorization : true,
        message : 'Autorized Person'
    })
})
router.post('/individual',  isValidUser , ContollerForSignIn); 
router.post('/product', isValidUser  ,  ContollerForSignIn);
router.post('/CF', isValidUser , ContollerForSignIn);
// router.post('/founder',  isValidUser  , ContollerForSignIn);
// router.post('/investor', isValidUser  , ContollerForSignIn);
// router.post('/business', isValidUser , ContollerForSignIn);


module.exports = router;









// Paassword for Cluster
// # ATnFtvrjXmwmsMlW

// passowrd for Realm
// # 3HSNlszVuqdlOy5L


// link 
// # mongodb+srv://hrppanchal27:ATnFtvrjXmwmsMlW@clusterpi.3x7htsc.mongodb.net/?retryWrites=true&w=majority
// # mongodb+srv://hrppanchal27:<password>@clusterpi.3x7htsc.mongodb.net/
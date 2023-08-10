const experess = require('express');
const controllerForLogIn = require('../controller/controllerForLogIn') 
const {isValidUser , isAutorized} = require('../middleware/middlewareForAuthentication')

const router = experess.Router();

router.get('/', (_req,res)=>{
    res.send("I am body")
})

router.post('/', controllerForLogIn);

router.get('/authorization' , isAutorized , (_req , res)=>{
    res.status(201).json({
        authorized : true,
        message : 'Autorized Person'
    })
})

module.exports = router;









// Paassword for Cluster
// # ATnFtvrjXmwmsMlW

// passowrd for Realm
// # 3HSNlszVuqdlOy5L


// link 
// # mongodb+srv://hrppanchal27:ATnFtvrjXmwmsMlW@clusterpi.3x7htsc.mongodb.net/?retryWrites=true&w=majority
// # mongodb+srv://hrppanchal27:<password>@clusterpi.3x7htsc.mongodb.net/
const experess = require('express');
const ControllerForFeed = require('../controller/controllerForFeed') 
const {isValidUser , isAutorized} = require('../middleware/middlewareForAuthentication')

const router = experess.Router();

router.get('/', (req,res)=>{
    res.send("I am body")
})
router.get('/authorization' , isAutorized , (_req , res)=>{
    res.status(201).json({
        authorized : true,
        message : 'Autorized Person'
    })
})
router.post('/posts', isValidUser , (req , res)=>{
    res.status(201).send("All Clear")
});



module.exports = router;

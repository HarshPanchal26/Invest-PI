const experess = require('express');
const controllerForLogOut = require('../controller/controllerForLogOut') 

const router = experess.Router();

router.get('/', (_req,res)=>{
    res.send("I am body")
})

router.get('/user', controllerForLogOut);

module.exports = router;



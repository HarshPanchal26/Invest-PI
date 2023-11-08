const experess = require('express');
const {isAutorized} = require('../middleware/middlewareForAuthentication');
const { controllerForNewInvestment  , controllerForFetchInvestments , controllerForActionOnClaim} = require('../controller/controllerForInvestment');

const router = experess.Router();

router.post('/new' , isAutorized , controllerForNewInvestment);
router.get('/fetch' , isAutorized , controllerForFetchInvestments);
router.post('/fetch' , isAutorized , controllerForFetchInvestments);
router.post('/claim/action/accept' , isAutorized , (req , res , next)=>{
    req.customData = { action : 'ACCEPT'}
    next()
},controllerForActionOnClaim);
router.post('/claim/action/decline' , isAutorized , (req , res , next)=>{
    req.customData = { action : 'DECLINE'}
    next()
},controllerForActionOnClaim);

module.exports = router;
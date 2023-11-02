const experess = require('express');
const router = experess.Router();
const ControllerForPitches = require('../controller/controllerForPitches')
const {isAutorized} = require('../middleware/middlewareForAuthentication');


router.get('/fetch/multiple' ,isAutorized ,  ControllerForPitches.fetchMultiplePitches);
router.get('/fetch/single' ,isAutorized , ControllerForPitches.fetchSinglePitch);
router.post('/fetch' ,isAutorized , ControllerForPitches.fetchPitchesForGlobal);
router.post('/counter/create' ,isAutorized , ControllerForPitches.controllerForCounterOffer);
router.post('/counter/fetch' ,isAutorized , ControllerForPitches.controllerForFetchAllCounterOffers);
router.post('/counter/action/accept' ,isAutorized , (req , res , next)=>{
    req.customData = { action : 'ACCEPT'}
    next()
} , ControllerForPitches.controllerForActionOnCounterOffer);
router.post('/counter/action/decline' ,isAutorized , (req , res , next)=>{
    req.customData = { action : 'DECLINE'}
    next()
} , ControllerForPitches.controllerForActionOnCounterOffer);

module.exports = router

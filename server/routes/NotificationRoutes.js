const experess = require('express');
const ControllerForNotification = require('../controller/controllerForNotification') 

const router = experess.Router();

router.post('/fetch/newInterests' ,ControllerForNotification.newInvestmentNotification)
router.post('/fetch/newPosts' , ControllerForNotification.notificationForNewPost)
router.post('/fetch/newinvestments', ControllerForNotification.newInvestmentNotification)
router.post('/fetch/newclaims' , ControllerForNotification.notificationForPositionClaim)
router.post('/fetch/counter/new' , ControllerForNotification.notificationForCounterOffers)
router.post('/fetch/counter/results' , ControllerForNotification.notoficationForCounterResults)

module.exports = router

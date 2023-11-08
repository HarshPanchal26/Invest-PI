const { json } = require('body-parser')
const ServiceForNotification = require('../services/serviceForNotification')

const newInvestmentNotification = async (req, res) => {
    const idofNotification = req.body.id
    let result = null
    try {
        result = await ServiceForNotification.fetchNotificatinForNewInvestmenst(idofNotification)
        res.status(201).json({
            newData: result,
            message: ''
        })
    } catch (error) {
        res.status(201).json({
            message: error
        })
    }
}

const notificationForPositionClaim = async (req, res) => {
    const idofNotification = req.body.id
    const rid = res.locals.uid
    let result = null

    try {
        result = await ServiceForNotification.fetchNotificatinForClaimedInvestors(idofNotification, rid)
        res.status(201).json({
            newData: result,
            message: ''
        })
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

const notificationForCounterOffers = async (req, res) => {

    const id = req.body.id;
    let result = null

    try {
        result = await ServiceForNotification.fetchNotificationForCounterOffers({ _id: id }, res.locals.uid);
        res.status(201).json({
            newData: result,
            message: ''
        })
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

const notoficationForCounterResults = async (req, res) => {
    let documentID = req.body.docID;
    let userId = res.locals.uid;
    try {
        const result = await ServiceForNotification.fetchCounterOfferResult(documentID, userId);
        res.status(201).json({
            newData : result,
            message : ''
        })
    } catch (error) {
        res.status(201).json({
            newData : null,
            message : error.message
        })
    }
}


const notificationForNewPost = async (req, res) => {
    const idofNotification = req.body.id
    let result = null
    try {
        result = await ServiceForNotification.fetchNotificationForNewPosts(idofNotification)
        res.status(201).json({
            newData: result,
            message: ''
        })
    } catch (error) {
        res.status(201).json({
            message: error
        })
    }
}

const notificationForInterests = async (req, res) => {
    const idofNotification = req.body.id
    const filter = req.body.filter
    let result = null
    try {
        result = await ServiceForNotification.fetchNotificatinForClaimedPosition(idofNotification, filter)
        res.status(201).json({
            newData: result,
            message: ''
        })
    } catch (error) {
        res.status(201).json({
            message: error
        })
    }
}


const controllerForResultOfClaimInvesttorsAction = async(req  ,res)=>{
    let documentID = req.body.docID;
    let userId = res.locals.uid;
    try {
        await ServiceForNotification.fetchClaimInvestorsAction(documentID)
        res.status(201).json({
            fetch : true,
            message : ''
        })
    } catch (error) {
        res.status(201).json({
            fetch : false,
            message : ''
        })
    }
}

module.exports = {
    notificationForPositionClaim,
    newInvestmentNotification,
    notificationForInterests,
    notificationForNewPost,
    notificationForCounterOffers,
    notoficationForCounterResults,
    controllerForResultOfClaimInvesttorsAction
}

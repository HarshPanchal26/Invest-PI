const { mongoose } = require('../config/database');
const {
    SchemForNotificationOfNewInvestment,
    SchemaForClaimInvestorsNotification,
    SchemaForCounterOfferNotifications
} = require('../models/NotifiationModels');
const { SchemaForCounterOffer } = require('../models/PitchModels');

const dbForNotification = mongoose.connection.useDb('notifications');

const newInvestmentNotification = (obj) => {
    return new Promise(async (reslove, reject) => {
        try {
            const Model = dbForNotification.model('newInvestment', SchemForNotificationOfNewInvestment, 'n-newinvestments');
            const res = await Model.create(obj);
            reslove(res);
        } catch (error) {
            reject(error)
        }
    })
}

const notificationForClaimedInvestors = (objForNotification) => {
    return new Promise(async (reslove, reject) => {
        try {
            const Model = dbForNotification.model('newInvestment', SchemaForClaimInvestorsNotification, 'n-asinvestors');
            const res = await Model.create({
                irid: objForNotification.rid,
                company: objForNotification.company,
                allinvestors: objForNotification.allinvestors,
                leadinvestors: objForNotification.leadinvestors,
                details: {
                    raisedAmount: objForNotification.details.raisedAmount,
                    typeOfInvestment: objForNotification.details.typeOfInvestment
                }
            });
            console.log("Climed Posistion ", res)
            reslove(res);
        } catch (error) {
            reject(error)
        }
    })
}

const createNotificationForCounterOffers = (ObjForCounterOffer) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Model = dbForNotification.model('Counter', SchemaForCounterOfferNotifications, 'n-counterOffers');
            const notify = await Model.create({
                crid: ObjForCounterOffer.idOfCounterObj,
                pitchId: ObjForCounterOffer.pitchId,
                offerFor: ObjForCounterOffer.offerTo,
                offerBy: ObjForCounterOffer.offerBy,
                offereAmount: ObjForCounterOffer.counterAmount,
                offeredEquity: ObjForCounterOffer.counterEquity
            });
            resolve(notify);
        } catch (error) {
            reject(error)
        }
    })
}


const fetchNotificatinForNewInvestmenst = (idofNotification) => {
    return new Promise(async (reslove, reject) => {
        const Model = dbForNotification.model('newInvetments', SchemForNotificationOfNewInvestment, 'n-newinvestments')
        try {
            if (idofNotification) {
                const res = await Model.find({ _id: idofNotification });
                reslove(res)
            } else {
                const res = await Model.find().limit(2);
                reslove(res)
            }

        } catch (error) {
            reject(error)
        }
    })
}

const fetchNotificatinForClaimedInvestors = (idofNotification, rid) => {
    return new Promise(async (reslove, reject) => {
        const Model = dbForNotification.model('Position', SchemaForClaimInvestorsNotification, 'n-asinvestors')
        try {
            if (idofNotification) {
                const res = await Model.find({ _id: idofNotification });
                reslove(res)
            } else {
                const res = await Model.find({

                    $or: [
                        { allinvestors: rid },
                        { leadinvestors: rid }
                    ]

                });
                console.log("!!!!!!!!!!!!Climed Posistion By Filter", res)
                reslove(res)
            }

        } catch (error) {
            reject(error)
        }
    })
}

const fetchNotificatinForNewInterests = (idofNotification, filter) => {
    return new Promise(async (reslove, reject) => {
        const Model = dbForNotification.model('Interests', SchemForNotificationOfNewInvestment, 'n-newinterest')
        try {
            if (idofNotification) {
                const res = await Model.find({ _id: idofNotification });
                reslove(res)
            } else {
                const res = await Model.find(filter);
                reslove(res)
            }

        } catch (error) {
            reject(error)
        }
    })
}

const fetchNotificationForNewPosts = (idofNotification) => {
    return new Promise(async (reslove, reject) => {
        const Model = dbForNotification.model('Interests', SchemForNotificationOfNewInvestment, 'n-newinterest')
        try {
            if (idofNotification) {
                const res = await Model.find({ _id: idofNotification });
                reslove(res)
            } else {
                const res = await Model.find({}).limit(2);
                reslove(res)
            }

        } catch (error) {
            reject(error)
        }
    })
}

const fetchNotificationForCounterOffers = (filterObj, userId) => {
    return new Promise(async (reslove, reject) => {
        try {
            const Model = dbForNotification.model('Counter', SchemaForCounterOfferNotifications, 'n-counterOffers')
            let res = null;
            if (filterObj._id) {
                res = await Model.find(filterObj);
            }
            else {
                res = await Model.find({ offerFor: userId, rejected: false, accepted: false })
            }
            reslove(res);
        } catch (error) {
            reject(error);
        }
    })
}

const AcceptCounterOfferNotofication = (id) => {
    return new Promise(async (reslove, reject) => {
        try {
            const Model = dbForNotification.model('Counter', SchemaForCounterOfferNotifications, 'n-counterOffers')
            const res = await Model.updateOne({ crid: id }, {
                $set: {
                    accepted: true
                }
            })
            reslove(res)
        } catch (error) {
            reject(error)
        }
    })
}

const DeclineCounterOfferNotification = (id) => {
    return new Promise(async (reslove, reject) => {
        try {
            const Model = dbForNotification.model('Counter', SchemaForCounterOfferNotifications, 'n-counterOffers')
            const res = await Model.updateOne({ crid: id }, {
                $set: {
                    rejected: true
                }
            })
            reslove(res)
        } catch (error) {
            reject(error)
        }
    })
}

const fetchCounterOfferResult = (docID, userId) => {
    return new Promise(async (resolve, reject) => {
        let result = null;
        try {
            const Model = dbForNotification.model('Counter', SchemaForCounterOfferNotifications, 'n-counterOffers')
            if (docID) {
                result = await Model.find({ crid: docID });
                resolve(result)
            } else {
                result = await Model.find({
                    offerBy: userId,
                    $or: [
                        { rejected: true },
                        { accepted: true }
                    ]
                })
                resolve(result)
            }
        } catch (error) {
            reject(error)
        }
    })
}


const AcceptClaimForInvestor = (compnayId , docId, userId) => {
    return new Promise(async (reslove, reject) => {
        try {
            const Model = dbForNotification.model('Invetsments', SchemaForClaimInvestorsNotification, 'n-counterOffers')
            const res = await Model.updateOne({ 
                irid: docId ,
                company : compnayId
            }, {
                $set: {
                    ['approval'[userId]]: true
                }
            })
            reslove(res)
        } catch (error) {
            reject(error)
        }
    })
}

const DeclineClaimForInvestor = (compnayId ,docId, userId) => {

    return new Promise(async (reslove, reject) => {
        try {
            const Model = dbForNotification.model('Counter', SchemaForClaimInvestorsNotification, 'n-counterOffers')
            const res = await Model.updateOne({
                 irid: docId ,
                 company :compnayId  
                }, {
                $set: {
                    ['approval'[userId]]: true
                }
            })
            reslove(res)
        } catch (error) {
            reject(error)
        }
    })
}

const fetchClaimInvestorsAction = ()=>{
    return new Promise(async(reslove ,reject)=>{
        try {
            
        } catch (error) {
            
        }
    })
}


module.exports = {
    notificationForClaimedInvestors,
    newInvestmentNotification,
    fetchNotificatinForNewInvestmenst,
    fetchNotificatinForClaimedInvestors,
    fetchNotificatinForNewInterests,
    fetchNotificationForNewPosts,
    fetchNotificationForCounterOffers,
    createNotificationForCounterOffers,
    AcceptCounterOfferNotofication,
    DeclineCounterOfferNotification,
    fetchCounterOfferResult,
    AcceptClaimForInvestor,
    DeclineClaimForInvestor,
    fetchClaimInvestorsAction
}
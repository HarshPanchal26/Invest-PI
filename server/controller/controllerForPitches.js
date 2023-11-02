const ServicesForPitches = require('../services/serviceForPitches')
const ServiceForNotification = require('../services/serviceForNotification')
const { fetchProductprofile } = require('../services/serviceForProfile')


const fetchSinglePitch = async (req, res) => {
    let id = req.query.uid;
    try {
        let ObjToReturn = {
            pitchData: null,
            organizationData: null,
        }
        const pitch = await ServicesForPitches.fetchSinglePitch(id);
        ObjToReturn.pitchData = pitch;
        const orgData = await fetchProductprofile({ rid: pitch.rid });
        ObjToReturn.organizationData = orgData;
        res.status(201).json({
            pitch: ObjToReturn,
            message: ''
        })
    } catch (error) {
        console.log("Error in fetching Data", error)
        res.status(201).json({
            pitch: null,
            message: error.message
        })
    }
}

// const fetchMultiplePitches = async (req, res) => {
//     let uid = req.query.uid
//     if(!uid){
//         uid = res.locals.uid;
//     }
//     try {
//         const pitch = await ServicesForPitches.fetchMultiplePitches(uid);
//         res.status(201).json({
//             pitch: pitch,
//             message: ''
//         })
//     } catch (error) {
//         console.log("What is error" , error)
//         res.status(401).json({
//             pitch: null,
//             message: error.message
//         })
//     }
// }

const fetchMultiplePitches = async (req, res) => {
    let uid = req.query.uid;
    if (!uid) {
        uid = res.locals.uid;
    }

    try {
        console.log('UID:', uid);
        const pitch = await ServicesForPitches.fetchMultiplePitches(uid);
        console.log('Pitch:', pitch);
        res.status(201).json({
            pitch: pitch,
            message: ''
        });
    } catch (error) {
        console.log("Error:", error); // Debugging line
        res.status(401).json({
            pitch: null,
            message: error.message
        });
    }
};


const fetchPitchesForGlobal = async (req, res) => {
    const filterObject = req.body;
    let ArrayForReturn = [];
    try {
        const pitches = await ServicesForPitches.fetchMultiplePichesWithFilters(filterObject);
        for (let i = 0; i < pitches.length; i++) {
            const orgData = await fetchProductprofile({ rid: pitches[i].rid });
            let ObjForPush = {
                pitchData: pitches[i],
                organizationData: orgData
            }
            ArrayForReturn.push(ObjForPush);
        }
        res.status(201).json({
            pitchs: ArrayForReturn,
            message: ''
        })
    } catch (error) {
        res.status(201).json({
            pitch: null,
            message: error.message
        })
    }
}

const controllerForCounterOffer = async (req, res) => {
    const ObjForController = req.body;
    let io = req.app.get('io')
    let ObjForCounterOffer = {
        pitchId: ObjForController.pitchId,
        offerBy: res.locals.uid,
        offerTo: ObjForController.offerTo,
        counterAmount: ObjForController.counterAmout,
        counterEquity: ObjForController.counterEquity
    }
    try {
        const result = await ServicesForPitches.makeCounterOffer(ObjForCounterOffer);
        let idOfCounterObj = result._id;
        let ObjForNotification = {
            ...ObjForCounterOffer,
            idOfCounterObj: idOfCounterObj
        }
        const objForNotification = await ServiceForNotification.createNotificationForCounterOffers(ObjForNotification);
        // Trigger Notifications
        io.triggerNotificatioinForCounterOffers(ObjForCounterOffer.offerTo, objForNotification._id.toString())
        res.status(201).json({
            counterOffer: true,
            message: ''
        })

    } catch (error) {
        res.status(401).json({
            counterOffer: false,
            message: error.message
        })
    }
}

const controllerForFetchAllCounterOffers = async (req, res) => {
    const filter = req.body
    try {
        await ServicesForPitches.fetchAllCounterOffersForPitch(filter);
        res.status(201).json({
            fetched: true,
            message: ''
        })
    } catch (error) {
        res.status(401).json({
            fetched: false,
            message: error.message
        })
    }
}

const controllerForActionOnCounterOffer = async (req, res) => {
    let ObjForNotification = req.body;
    console.log("ObjForNotification ########" , ObjForNotification)
    let io = req.app.get('io')
    if (ObjForNotification.crid) {
        try {
            let actionType = req.customData.action
            if (actionType === 'ACCEPT') {
                await ServicesForPitches.AcceptCounterOffers(ObjForNotification.crid);
                await ServiceForNotification.AcceptCounterOfferNotofication(ObjForNotification.crid)
                io.triggerNotificatioinForResultOfCounterOffer(ObjForNotification.offerBy, ObjForNotification.crid)
                res.status(201).json({
                    action: 'Accepted'
                })
            } else if (actionType === 'DECLINE') {
                await ServicesForPitches.DeclineCounterOffer(ObjForNotification.crid);
                await ServiceForNotification.DeclineCounterOfferNotification(ObjForNotification.crid);
                io.triggerNotificatioinForResultOfCounterOffer(ObjForNotification.offerBy, ObjForNotification.crid)
                res.status(201).json({
                    action: 'Decline'
                })
            } else {
                res.status(401).json({
                    message: 'Internal Server Error'
                })
            }
        } catch (error) {
            res.status(401).json({
                message: error.message
            })
        }
    } else {
        res.status(401).json({
            message: 'Technical Issue .Please Try Later'
        })
    }
}


module.exports = { fetchSinglePitch, fetchPitchesForGlobal, fetchMultiplePitches, controllerForCounterOffer, controllerForFetchAllCounterOffers, controllerForActionOnCounterOffer }
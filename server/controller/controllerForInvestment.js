const ServiceForInvestment = require('../services/ServiceForInvestment')
const ServiceForNotofication = require('../services/serviceForNotification')

const controllerForNewInvestment = async (req, res) => {
    try {
        const { investmentData, extarData } = req.body
        let io = req.app.get('io');

        let ObjectToInsert = {
            recipient: res.locals.uid,
            dateofInvestment: investmentData.dateofInvestment,
            typeOfInvestment: investmentData.typeOfInvestment,
            allInvestor: [],
            leadInvestors: [],
            raisedAmount: parseFloat(investmentData.raisedAmount, 10),
            lastValuationofFundee: parseFloat(investmentData.lastValuation, 10),
            milestones: extarData.milestones,
            growth: extarData.growth
        }
        const arrayForAllInvestor = investmentData.allInvestor;
        const arrayForleadInvestors = investmentData.leadInvestors;

        for (let i = 0; i < arrayForAllInvestor.length; i++) {
            let idForUser = arrayForAllInvestor[i]._id;
            ObjectToInsert.allInvestor.push(idForUser);
        }

        for (let i = 0; i < arrayForleadInvestors.length; i++) {
            ObjectToInsert.leadInvestors.push(arrayForleadInvestors[i]._id);
        }

        const result = await ServiceForInvestment.createNewInvestment(ObjectToInsert);
        await ServiceForInvestment.addNewInvestment(result._id, res.locals.uid, ObjectToInsert)

        let objForNotification = {
            rid: result._id,
            company: ObjectToInsert.recipient,
            leadinvestors: [...ObjectToInsert.leadInvestors],
            allinvestors: [...ObjectToInsert.allInvestor],
            details: {
                raisedAmount: parseFloat(investmentData.raisedAmount, 10),
                dateofInvestment: investmentData.dateofInvestment,
                typeOfInvestment: investmentData.typeOfInvestment,
            }
        }
        const resultObj = await ServiceForNotofication.newInvestmentNotification(objForNotification);

        let objForClaimNotification = {
            rid: result._id,
            leadinvestors: ObjectToInsert.leadInvestors,
            company: ObjectToInsert.recipient,
            allinvestors: ObjectToInsert.allInvestor,
            details: {
                raisedAmount: parseFloat(investmentData.raisedAmount, 10),
                dateofInvestment: investmentData.dateofInvestment,
                typeOfInvestment: investmentData.typeOfInvestment,
            }
        }
        const resForClaim = await ServiceForNotofication.notificationForClaimedInvestors(objForClaimNotification)
        io.triggerNotificationForNewInvestment("ALL", [...objForNotification.leadinvestors, ...objForNotification.allinvestors], resultObj._id, resForClaim._id)
        res.status(201).json({
            investment: result
        })
    } catch (error) {
        console.log("error", error)
        res.status(401).json({
            error: error
        })
    }
}


const controllerForFetchInvestments = async (req, res) => {
    try {
        const rid = res.locals.uid;
        const array = req.body;
        const result = await ServiceForInvestment.fetchInvestments(array);
        res.status(201).json({
            investment: result
        })
    } catch (error) {
        res.status(401).json({
            error: error
        })
    }
}

const controllerForActionOnClaim = async (req, res) => {
    let docId = req.body.irid;
    let compnayId = req.body.compnay;
    let useId = res.locals.uid
    let io = req.app.get('io')
    try {
        let actionType = req.customData.action
        if (actionType === 'ACCEPT') {
            await ServiceForInvestment.acceptClaimForInvestror(compnayId , docId, useId);
            await ServiceForNotofication.AcceptClaimForInvestor(compnayId , docId, useId)
        } else if (actionType === 'DECLINE') {
            await ServiceForInvestment.declneClaimForInvestror(compnayId , docId, useId);
            await ServiceForNotofication.DeclineClaimForInvestor(compnayId , docId, useId)
        } else {
            res.status(401).json({
                action: false,
                message: 'Server Error, Please Contact Help Center'
            })
        }
        io.triggerNotificatioinForResultOfClaimInvestor(compnayId, useId, docId)
        res.status(201).json({
            accepted: true,
            message: ''
        })
    } catch (error) {
        res.status(401).json({
            accepted: false,
            message: error.message
        })
    }
}

module.exports = { controllerForNewInvestment, controllerForFetchInvestments, controllerForActionOnClaim }
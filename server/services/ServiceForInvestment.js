const mongoose = require('mongoose');
const { SchemaForMyProduct } = require('../models/ProductModels');
const { SchemaForInvestments } = require('../models/InvestmentsModles');
const { resolve } = require('path');
const db = mongoose.connection.useDb('others');

// function for add new investments in products table / collection
const addNewInvestment = (investmentId, rid, ObjForNewInvestment) => {
    return new Promise(async (resolve, reject) => {
        try {

            const ModelForProduct = db.model('investments', SchemaForMyProduct, 'products');
            const responce = await ModelForProduct.updateOne({ rid: rid },
                {
                    $push: {
                        'investments': investmentId
                    },
                    $inc: {
                        totalRaisedFund: ObjForNewInvestment.raisedAmount,
                        totalInvestor: ObjForNewInvestment.allInvestor.length,
                    },
                    totalValuation: ObjForNewInvestment.lastValuationofFundee
                },
                {
                    new: true
                }
            )
            resolve(responce)
        } catch (error) {
            console.log("error", error)
            reject("Bye")
        }
    })
}


const createNewInvestment = (object) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ModelForProduct = db.model('Investments', SchemaForInvestments, 'investments');
            const res = await ModelForProduct.create(object);
            resolve(res)
        } catch (error) {
            console.log("error for investments", error)
            reject(error);
        }
    })
}

const fetchInvestments = (arrayOfIdsForInvestmentsObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ModelForProduct = db.model('Investments', SchemaForInvestments, 'investments');
            const res = await ModelForProduct.find(
                {
                    '_id': {
                        $in: arrayOfIdsForInvestmentsObj
                    }
                },
            )
            resolve(res)
        } catch (error) {
            console.log("error for investments", error)
            reject(error);
        }
    })
}

const acceptClaimForInvestror = (compnayId, docId, useId) => {
    return new Promise(async (reslove, reject) => {
        try {
            const ModelForProduct = db.model('Investments', SchemaForInvestments, 'investments');
            const result = ModelForProduct.updateOne(
                {
                    _id: docId,
                    recipient: compnayId
                },
                {
                    $set: {
                        ['approval'[useId]]: true
                    }
                }
            )
            reslove(result);
        } catch (error) {
            reject(error)
        }
    })
}

const declneClaimForInvestror = (compnayId, docId, useId) => {
    return new Promise(async (reslove, reject) => {
        try {
            const ModelForProduct = db.model('Investments', SchemaForInvestments, 'investments');
            const result = ModelForProduct.updateOne(
                {
                    _id: docId,
                    recipient: compnayId
                },
                {
                    $set: {
                        ['approval'[useId]]: false
                    }
                }
            )
            reslove(result);
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    addNewInvestment,
    createNewInvestment,
    fetchInvestments,
    acceptClaimForInvestror,
    declneClaimForInvestror
}

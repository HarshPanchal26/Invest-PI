const mongoose = require('mongoose');
const { SchemaForMyProduct } = require('../models/ProductModels');
const { SchemaForInvestments } = require('../models/InvestmentsModles');
const db = mongoose.connection.useDb('others');

const addNewInvestment = (object, id) => {
    return new Promise(async (resolve, reject) => {
        try {

            const ModelForProduct = db.model('investments', SchemaForMyProduct, 'products');
            const responce = await ModelForProduct.updateOne({ rid: id },
                {
                    $push: {
                        'investments': object
                    }
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
    return new Promise(async(resolve, reject) => {
        try {
            const ModelForProduct = db.model('Investments', SchemaForInvestments, 'investments');
            const res = await ModelForProduct.create(object);
            resolve(res)
        } catch (error) {
            console.log("error for investments" ,error)
            reject(error);   
        }
    })
}

module.exports = { addNewInvestment, createNewInvestment }

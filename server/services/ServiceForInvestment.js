const mongoose = require('mongoose');
const { SchemaForMyProduct } = require('../models/ProductModels');
const db = mongoose.connection.useDb('others');

const addNewInvestment = (object, id) => {
    return new Promise(async (resolve, reject) => {
        try {

            const ModelForProduct = db.model('investments', SchemaForMyProduct, 'products');
            const responce = await ModelForProduct.updateOne({ rid: id },
                {
                    $push: {
                        'financial.history': object
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

module.exports = { addNewInvestment }

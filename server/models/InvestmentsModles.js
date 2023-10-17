const mongoose = require('mongoose');


const SchemaForInvestments = new mongoose.Schema({
    
    recipient : {
        type: String,
        require: false
    },
    dateofInvestment: {
        type: String,
        require: false
    },
    typeOfInvestment: {
        type: String,
        require: false
    },
    allInvestor: {
        type: Array,
        require: false
    },
    leadInvestors: {
        type: Array,
        require: false
    },
    raisedAmount: {
        type: Number,
        require: false
    },
    lastValuationofFundee: {
        type: Number,
        require: false
    },

})    
module.exports = {SchemaForInvestments}

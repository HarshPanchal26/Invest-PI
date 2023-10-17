const mongoose = require('mongoose');

const SchemaForQnA = new mongoose.Schema({
    que: {
        type: String,
        require: false,
    },
    ans: {
        text: {
            type: String,
            require: false
        },
        urls: {
            type: Array,
            require: false
        }
    }
})

const SchemForPitchEngagement = new mongoose.Schema({
    interests : {
        type : Number,  
        require : false,
        default : 0
    },
    views :  {
        type : Number,  
        require : false,
        default : 0
    },
    getFunded : {
        type : Boolean,  
        require : false,
        default : false
    }
})

const SchemaForPitches = new mongoose.Schema({
    rid: {
        type: String,
        require: true,
        unique: true,
    },
    startDate:  {
        type: String,
        require: true
    },
    buisnessMode:  {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    avgSixMonthSale:  {
        type: String,
        require: true
    },
    avgSixMonthViews:  {
        type: String,
        require: true
    },
    avgSixMonthCustomer:  {
        type: String,
        require: true
    },
    avgYearSale:  {
        type: String,
        require: true
    },
    avgYearViews:  {
        type: String,
        require: true
    },
    avgYearCustomer:  {
        type: String,
        require: true
    },
    targetAudiences:  {
        type: String,
        require: true
    },
    seekingFund :  {
        type: String,
        require: true
    },
    currentValuation :   {
        type: String,
        require: true
    },
    offeredEquity :   {
        type: String,
        require: true
    },
    fundingType : {
        type: String,
        require: true
    },
    faqs: {
        Business: [SchemaForQnA],
        Performance: [SchemaForQnA],
        Market: [SchemaForQnA],
        Financials: [SchemaForQnA],
        Audience: [SchemaForQnA],
        Equity : [SchemaForQnA]
    },
    engagement : [SchemForPitchEngagement],
    desirePepole : {
        type : Array,
        require : false,
        default : []
    }
    
})

module.exports = { SchemaForPitches  , SchemaForQnA}

// 6513c723aa2cb125478f1a2f
// 65142e9770a95f7d9a410af1
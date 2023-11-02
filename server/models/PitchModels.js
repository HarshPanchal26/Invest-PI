const mongoose = require('mongoose');
// const ServicesForPitches = require('../services/serviceForPitches');

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
    interests: {
        type: Number,
        require: false,
        default: 0
    },
    views: {
        type: Number,
        require: false,
        default: 0
    },
    counter: {
        type: Number,
        require: false,
        default: 0
    }
})

const SchemaForPitches = new mongoose.Schema({
    rid: {
        type: String,
        require: true,
        unique: true,
    },
    localname :  {
        type: String,
        require: true,
    },
    startDate: {
        type: String,
        require: true
    },
    buisnessMode: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    avgSixMonthSale: {
        type: String,
        require: true
    },
    avgSixMonthViews: {
        type: String,
        require: true
    },
    avgSixMonthCustomer: {
        type: String,
        require: true
    },
    avgYearSale: {
        type: String,
        require: true
    },
    avgYearViews: {
        type: String,
        require: true
    },
    avgYearCustomer: {
        type: String,
        require: true
    },
    targetAudiences: {
        type: String,
        require: true
    },
    seekingFund: {
        type: Number,
        require: true
    },
    currentValuation: {
        type: Number,
        require: true
    },
    offeredEquity: {
        type: Number,
        require: true
    },
    maximumOffer: {
        type: Number,
        require: true
    },
    fundingType: {
        type: String,
        require: true
    },
    faqs: {
        Business: [SchemaForQnA],
        Performance: [SchemaForQnA],
        Market: [SchemaForQnA],
        Financials: [SchemaForQnA],
        Audience: [SchemaForQnA],
        Equity: [SchemaForQnA]
    },
    engagement: {
        interests: {
            type: Number,
            require: false,
            default: 0
        },
        views: {
            type: Number,
            require: false,
            default: 0
        },
        counter: {
            type: Number,
            require: false,
            default: 0
        }
    },
    desirePepole: {
        type: Array,
        require: false,
        default: []
    },
    getFunded: {
        type: Boolean,
        require: false,
        default: false
    }

})

const SchemaForCounterOffer = new mongoose.Schema({
    pitchId: {
        type: String,
        require: true
    },
    offerBy: {
        type: String,
        require: true
    },
    offerTo: {
        type: String,
        require: true
    },
    counterAmount: {
        type: String,
        require: true
    },
    counterEquity: {
        type: String,
        require: true
    },
    accept: {
        type: Boolean,
        require: false,
        default: false,
    },
    reject: {
        type: Boolean,
        require: false,
        default: false,
    }
})



module.exports = { SchemaForQnA, SchemaForCounterOffer, SchemaForPitches }

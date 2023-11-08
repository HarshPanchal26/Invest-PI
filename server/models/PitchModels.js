const mongoose = require('mongoose');
// const ServicesForPitches = required('../services/serviceForPitches');

const SchemaForQnA = new mongoose.Schema({
    que: {
        type: String,
        required: false,
    },
    ans: {
        text: {
            type: String,
            required: false
        },
        urls: {
            type: Array,
            required: false
        }
    }
})

const SchemForPitchEngagement = new mongoose.Schema({
    interests: {
        type: Number,
        required: false,
        default: 0
    },
    views: {
        type: Number,
        required: false,
        default: 0
    },
    counter: {
        type: Number,
        required: false,
        default: 0
    }
})

const SchemaForPitches = new mongoose.Schema({
    rid: {
        type: String,
        required: true,
        unique: true,
    },
    localname :  {
        type: String,
        required: false,
    },
    startDate: {
        type: String,
        required: true
    },
    buisnessMode: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    avgSixMonthSale: {
        type: String,
        required: true
    },
    avgSixMonthViews: {
        type: String,
        required: true
    },
    avgSixMonthCustomer: {
        type: String,
        required: true
    },
    avgYearSale: {
        type: String,
        required: true
    },
    avgYearViews: {
        type: String,
        required: true
    },
    avgYearCustomer: {
        type: String,
        required: true
    },
    targetAudiences: {
        type: String,
        required: true
    },
    seekingFund: {
        type: Number,
        required: true
    },
    currentValuation: {
        type: Number,
        required: true
    },
    offeredEquity: {
        type: Number,
        required: true
    },
    maximumOffer: {
        type: Number,
        required: true
    },
    fundingType: {
        type: String,
        required: true
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
            required: false,
            default: 0
        },
        views: {
            type: Number,
            required: false,
            default: 0
        },
        counter: {
            type: Number,
            required: false,
            default: 0
        }
    },
    desirePepole: {
        type: Array,
        required: false,
        default: []
    },
    getFunded: {
        type: Boolean,
        required: false,
        default: false
    }

})

const SchemaForCounterOffer = new mongoose.Schema({
    pitchId: {
        type: String,
        required: true
    },
    offerBy: {
        type: String,
        required: true
    },
    offerTo: {
        type: String,
        required: true
    },
    counterAmount: {
        type: String,
        required: true
    },
    counterEquity: {
        type: String,
        required: true
    },
    accept: {
        type: Boolean,
        required: false,
        default: false,
    },
    reject: {
        type: Boolean,
        required: false,
        default: false,
    }
})



module.exports = { SchemaForQnA, SchemaForCounterOffer, SchemaForPitches }

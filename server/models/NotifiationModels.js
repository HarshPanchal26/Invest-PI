const mongoose = require('mongoose')

const SchemForNotificationOfNewInvestment = new mongoose.Schema({
    type: {
        type: String,
        require: false,
        default: 'NEW_INVESTMENTS'
    },
    rid: {
        type: String,
        require: true
    },
    leadinvestors: {
        type: Array,
        require: true
    },
    company: {
        type: String,
        require: true
    },
    allinvestors: {
        type: Array,
        require: true
    },
    details: {
        type: Object,
        require: true,
    },
    createdAt: {
        type: Date,
        require: false,
        default: new Date()
    }

})
// Schema For Notifications
const SchemaForClaimInvestors = new mongoose.Schema({
    type: {
        type: String,
        require: false,
        default: 'CLAIM_INVESTORS'
    },
    leadinvestors: {
        type: Array,
        require: true
    },
    company: {
        type: String,
        require: true
    },
    allinvestors: {
        type: Array,
        require: true
    },
    details: {
        type: Object,
        require: true
    },
    createdAt: {
        type: Date,
        require: false,
        default: new Date()
    }

})

const SchemaForNewInterests = new mongoose.Schema({
    type: {
        type: String,
        require: false,
        default: 'NEW_INTERESTS'
    },
    interestedIn: {
        type: String,
        require: true
    },
    interested: {
        type: Array,
        require: true
    },
    createdAt: {
        type: Date,
        require: false,
        default: new Date()
    }
})

const SchemaForCounterOfferNotifications = new mongoose.Schema({
    type : {
        type: String,
        require: false,
        default: 'NEW_COUNTEROFFER'
    },
    crid : {    
        type : String,
        require : true        
    },
    pitchId : {
        type : String,
        require : true
    },
    offerFor : {
        type : String,
        require : true
    },
    offerBy : {
        type : String,
        require : true
    },
    offereAmount : {
        type : String,
        require : true
    },
    offeredEquity : {
        type : String,
        require : true
    },
    accepted :{
        type : Boolean,
        require : false,
        default : false
    },
    rejected :{
        type : Boolean,
        require : false,
        default : false
    },
    createdAt : {
        type : Date,
        require : false,
        default : new Date()
    }

})

module.exports = {
    SchemForNotificationOfNewInvestment,
    SchemaForClaimInvestors,
    SchemaForNewInterests,
    SchemaForCounterOfferNotifications
}


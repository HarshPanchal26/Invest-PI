const mongoose = require('mongoose')

const SchemForNotificationOfNewInvestment = new mongoose.Schema({
    type: {
        type: String,
        required: false,
        default: 'NEW_INVESTMENTS'
    },
    rid: {
        type: String,
        required: true
    },
    leadinvestors: {
        type: Array,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    allinvestors: {
        type: Array,
        required: true
    },
    details: {
        type: Object,
        required: true,
    },
    createdAt: {
        type: Date,
        required: false,
        default: new Date()
    }

})
// Schema For Notifications

const SchemaForClaimInvestorsNotification = new mongoose.Schema({
    type: {
        type: String,
        required: false,
        default: 'CLAIM_INVESTORS'
    },
    irid: {
        type: String,
        required: true
    },
    leadinvestors: {
        type: Array,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    allinvestors: {
        type: Array,
        required: true
    },
    details: {
        raisedAmount: {
            type: Number,
            required: true
        },
        dateofInvestment: {
            type: Date,
            required: false,
            default: new Date()
        },
        typeOfInvestment: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        required: false,
        default: new Date()
    },
    approval: {
        type: Object,
        required: false
    }

}, { minimize: false })

SchemaForClaimInvestorsNotification.pre('save', function (next) {
    if (!this.isNew) {
        return next();
    }
    let ObjForApproval = {};
    for (let i = 0; i < this.allinvestors.length; i++) {
        ObjForApproval.investors[i] = false
    }
    this.approval = ObjForApproval;
    console.log("Created Obj from pre function in Notofication", ObjForApproval);
    next()
})


const SchemaForNewInterests = new mongoose.Schema({
    type: {
        type: String,
        required: false,
        default: 'NEW_INTERESTS'
    },
    interestedIn: {
        type: String,
        required: true
    },
    interested: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        required: false,
        default: new Date()
    }
})

const SchemaForCounterOfferNotifications = new mongoose.Schema({
    type: {
        type: String,
        required: false,
        default: 'NEW_COUNTEROFFER'
    },
    crid: {
        type: String,
        required: true
    },
    pitchId: {
        type: String,
        required: true
    },
    offerFor: {
        type: String,
        required: true
    },
    offerBy: {
        type: String,
        required: true
    },
    offereAmount: {
        type: String,
        required: true
    },
    offeredEquity: {
        type: String,
        required: true
    },
    accepted: {
        type: Boolean,
        required: false,
        default: false
    },
    rejected: {
        type: Boolean,
        required: false,
        default: false
    },
    createdAt: {
        type: Date,
        required: false,
        default: new Date()
    }

})

module.exports = {
    SchemForNotificationOfNewInvestment,
    SchemaForClaimInvestorsNotification,
    SchemaForNewInterests,
    SchemaForCounterOfferNotifications
}


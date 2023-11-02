const mongoose = require('mongoose');

const SchemaForInvesments = new mongoose.Schema({
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
    lastValuation: {
        type: Number,
        require: false
    },
    milestones: {
        type: String,
        require: false,
    },
    growth: {
        type: String,
        require: false,
    },

})

const SchmaForUSPs = new mongoose.Schema({
    title: {
        type: String,
        require: false
    },
    aboutUSP: {
        type: String,
        require: false
    },
    url: {
        type: String,
        require: false
    },
    likes: {
        type: String,
        require: false,
        default: 0,
    }
})

const SchemaForMedia = new mongoose.Schema({
    imageUrl: {
        type: String,
        require: false
    },
    title: {
        type: String,
        require: false
    },
    subtitle: {
        type: String,
        require: false
    },

})

const SchemaForMyProduct = new mongoose.Schema({

    rid: {
        type: String,
        required: true,
    },
    valuationText : {
        type : String,
        require: false,
        default: 'Yet To Discover'        
    },
    totalInvestor : {
        type : Number,
        require : false,
        default : 0   
    },
    totalRaisedFund : {
        type : Number,
        require : false,
        default : 0           
    },
    totalValuation : {
        type : Number,
        require : false,
        default : 0           
    },
    investments : {
        type: Array,
        require: false,
        default: []
    },
    news: {
        type: Array,
        require: false,
        default: []
    },
    usp: [SchmaForUSPs],
    media: [SchemaForMedia],
    people: {
        type: Array,
        require: false,
        default: []
    }
})


SchemaForMyProduct.pre('findOneAndUpdate' , function(next){

    const originalInvestments = this._update.$set.investments;
    
    // Check if investments is an array
    if (Array.isArray(originalInvestments)) {
        const totalInvestor = originalInvestments.reduce((total, investment) => {
            return total + investment.raisedAmount;
        }, 0);
        this._update.$set.totalRaisedFund = totalInvestor;
    }

    next();

})



module.exports = { SchemaForMyProduct, SchemaForMedia, SchmaForUSPs }
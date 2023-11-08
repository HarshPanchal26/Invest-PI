const mongoose = require('mongoose');
const SchemaForInvestments = new mongoose.Schema({

    recipient: {
        type: String,
        required: false
    },
    dateofInvestment: {
        type: String,
        required: false
    },
    typeOfInvestment: {
        type: String,
        required: false
    },
    allInvestor: {
        type: Array,
        required: false
    },
    leadInvestors: {
        type: Array,
        required: false
    },
    raisedAmount: {
        type: Number,
        required: false
    },
    lastValuationofFundee: {
        type: Number,
        required: false
    },
    approval : {
        type : Object,
        required : false
    }

},{minimize: false})


SchemaForInvestments.pre('save', function (next) {
    if (!this.isNew) {
        return next();
    }
    let ObjForApproval = {};
    for (let i = 0; i < this.allInvestor.length; i++) {
        ObjForApproval.investors[i] = false  
    }
    this.approval = ObjForApproval;
    console.log("Created Obj from pre function", ObjForApproval);
    next()
})


// SchemaForInvestments.post('save', async function (doc) {

//     const idOfInvestmentsDocument = doc._id;
//     let objForNotification = {
//         rid : idOfInvestmentsDocument,
//         leadinvestors: doc.leadInvestors,
//         company: doc.recipient,
//         allinvestors: doc.allInvestor,
//         viewer: 'ALL',
//     }

//     try {
//         const res = await ServiceForNotofication.newInvestmentNotification(objForNotification);
//         console.log(res);
        
//     } catch (error) {
//         console.log("Error from Post Investment" , error);
//     }
// })

module.exports = { SchemaForInvestments }

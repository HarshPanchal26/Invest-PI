const mongoose = require('mongoose');
const SchemaForInvestments = new mongoose.Schema({

    recipient: {
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
    approval : {
        type : Object,
        require : false
    }

})


SchemaForInvestments.pre('save', function (next) {
    if (!this.isNew) {
        return next();
    }
    let ObjForApproval = {};
    for (let i = 0; i < this.allInvestor; i++) {
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

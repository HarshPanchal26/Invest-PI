const ServiceForInvestment = require('../services/ServiceForInvestment')

const controllerForNewInvestment = async (req, res) => {
    try {
        const { investmentData, extarData } = req.body

        let ObjectToInsert = {
            recipient : res.locals.uid,
            dateofInvestment: investmentData.dateofInvestment,
            typeOfInvestment: investmentData.typeOfInvestment,
            allInvestor: [],
            leadInvestors: [],
            raisedAmount: parseFloat(investmentData.raisedAmount, 10),
            lastValuationofFundee: parseFloat(investmentData.lastValuation, 10),
            milestones: extarData.milestones,
            growth: extarData.growth
        }
        const arrayForAllInvestor = investmentData.allInvestor;
        const arrayForleadInvestors = investmentData.leadInvestors;

        for(let i=0;i<arrayForAllInvestor.length;i++){
            let idForUser = arrayForAllInvestor[i]._id;
            ObjectToInsert.allInvestor.push(idForUser);
        }

        for(let i=0;i<arrayForleadInvestors.length;i++){
            ObjectToInsert.leadInvestors.push(arrayForleadInvestors[i]._id);
        }

        const result = await ServiceForInvestment.createNewInvestment(ObjectToInsert);
        res.status(201).json({
            investment: result
        })
    } catch (error) {
        console.log("error", error)
        res.status(401).json({
            error: error
        })
    }
}

module.exports = { controllerForNewInvestment }
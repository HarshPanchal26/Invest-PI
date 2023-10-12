const ServiceForInvestment = require('../services/ServiceForInvestment')

const controllerForNewInvestment = async (req, res) => {
    try {
        const { investmentData, extarData } = req.body

        let ObjectToInsert = {
            dateofInvestment: investmentData.dateofInvestment,
            typeOfInvestment: investmentData.typeOfInvestment,
            allInvestor: [],
            leadInvestors: [],
            raisedAmount: parseFloat(investmentData.raisedAmount, 10),
            lastValuation: parseFloat(investmentData.lastValuation, 10),
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

        console.log("ObjectToInsert" , ObjectToInsert)
        const result = await ServiceForInvestment.addNewInvestment(ObjectToInsert, res.locals.uid);
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
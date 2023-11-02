const ServiceForThoughts = require('../services/serviceForThoughts')
// const {io} = require('../server')

const controllerForAllFeed = async(req ,res)=>{
    let io = req.app.get('io')
    try {
        const posts = await ServiceForThoughts.fetchThoughts();
        if(io){
            // io.triggerNotificationForNewInvestment();
        }
        res.status(201).json({
            fetched : true,
            newthoughts : posts
        })
    } catch (error) {
        res.status(201).json({
            fetched : false,
            data : error.message
        })        
    }
}
const controllerForSingleFeed = async(req ,res)=>{
    try {
        const posts = await ServiceForThoughts.fetchSingleThought(req.body.id);
        res.status(201).json({
            fetched : true,
            data : posts
        })
    } catch (error) {
        res.status(201).json({
            fetched : false,
            data : error.message
        })        
    }
}

module.exports = {controllerForAllFeed , controllerForSingleFeed};
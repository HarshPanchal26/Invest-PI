const ServiceForThoughts = require('../services/serviceForThoughts')

const controllerForAllFeed = async(req ,res)=>{
    try {
        const posts = await ServiceForThoughts.fetchThoughts();
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
const ServiceForThoughts = require('../services/serviceForThoughts')

const controllerForFeed = async(req ,res)=>{
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

module.exports = controllerForFeed;
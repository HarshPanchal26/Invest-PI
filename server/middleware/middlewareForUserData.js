const { mongoose } = require('../config/database')

const ServiceForThoughts = require('../services/serviceForThoughts');
const {findSchemaAndCollection} = require('../services/servicesForAuthentication')

const getUserData = async(_req, res , next)=>{

    const db = mongoose.connection.useDb('users');
    try {
        let uid =res.locals.uid;
        let typeOfUser = res.locals.type; 
        const {Schema, Collection} = findSchemaAndCollection(typeOfUser);
        const Model = db.model('Users', Schema, Collection);
        
        const user = await Model.findOne({rid : uid});
        const userData = Object.keys(user._doc).reduce((acc , key)=>{
            if(key !=='_id' && key !== 'rid' && key !== '__v'){
                acc[key] = user._doc[key];
            }
            return acc;
        } , {})
        const thoughts = await ServiceForThoughts.fetchThoughtsForUser(uid);
        if(typeOfUser === '')
        console.log("User thoughts ===>" , thoughts)
        res.locals.user = {
            ...userData,
        }
        res.locals.thoughts = [
            ...thoughts,
        ]    
        next()
        
    } catch (error) {
        res.status(401).json({
            authorized : false,
            message : error.message,
        })
    }

}

module.exports = getUserData;
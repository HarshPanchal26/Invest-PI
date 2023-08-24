const { mongoose } = require('../config/database')
const { 
    SchemaForIndividuals,
    // SchemaForCommanUserData, 
    SchemaForCF,
    SchemaForCompany } = require('../models/signinmodels');


const getUserData = async(_req, res , next)=>{

    const db = mongoose.connection.useDb('users');
    try {
        let uid =res.locals.uid;
        let typeOfUser = res.locals.type; 
        let CollectionForUser = null;
        let Schema = null;
        if(typeOfUser === 'product'){
            Schema = SchemaForCompany 
            CollectionForUser = 'user-as-company'
        }else if(typeOfUser === 'CF'){
            Schema = SchemaForCF
            CollectionForUser = 'user-as-CF'
        }else{
            Schema = SchemaForIndividuals
            CollectionForUser = 'user-as-individual'
        }
        const Model = db.model('Users', Schema, CollectionForUser);
        
        const user = await Model.findOne({rid : uid});
        const userData = Object.keys(user._doc).reduce((acc , key)=>{
            if(key !=='_id' && key !== 'rid' && key !== '__v'){
                acc[key] = user._doc[key];
            }
            return acc;
        } , {})
        // console.log("User Data   ====>" , userData)
        res.locals.user = {
            ...userData,
        }    
        next()
        
    } catch (error) {
        res.status(401).json({
            authorized : false,
            message : error.message,
        })
    }

}

module.exports = getUserData;
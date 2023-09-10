const mongoose = require('mongoose');
const SchemaForCommanUserData = require('../models/signinmodels')
const { findSchemaAndCollection } = require('../services/servicesForAuthentication')

const controllerForProfile = async (req, res) => {
    const { username } = req.body
    const db = mongoose.connection.useDb('users');
    const Model = db.model('Users', SchemaForCommanUserData, 'common-users-storage');

    try {
        const result = await Model.findOne({ username : username });
        if (result == null) {
            res.status(401).json({
                user: 'User name is not valid'
            })
        } else {
            const {_id  , type} = result._doc;
            const { Schema , Collection } = findSchemaAndCollection(type);
            let rid = _id.toString();
            console.log("res ",result._doc);
            let Model = db.model('User' , Schema , Collection);
            let data = await Model.findOne({rid});
            res.status(201).json({
                user: data
            })
        }

    } catch (error) {
        console.log("Error insde controller ", error)
        res.status(401).json({
            data: error.message
        })
    }
}

module.exports = controllerForProfile;
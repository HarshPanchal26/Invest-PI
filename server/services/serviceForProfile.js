const mongoose = require('mongoose');
const { findSchemaAndCollection } = require('../services/servicesForAuthentication');
const { SchemaForCommanUserData, SchemaForCompany } = require('../models/signinmodels');
const ServiceForProducts = require('../services/serviceForProducts');
const ServiceForThoughts = require('../services/serviceForThoughts');
const db = mongoose.connection.useDb('users');

const fetchProfile = (filter) => {
    return new Promise(async (resolve, reject) => {
        const responceObj = {
            user: null,
        }
        try {
            const Model = db.model('Users', SchemaForCommanUserData, 'common-users-storage');
            const result = await Model.findOne(filter);
            if (result == null) {
                reject('User name is not valid')
            } else {
                const { _id, type } = result._doc;
                const { Schema, Collection } = findSchemaAndCollection(type);
                let rid = _id.toString();
                let Model = db.model('User', Schema, Collection);
                const data = await Model.findOne({ rid });
                responceObj.user = data;
                const thoughts = await ServiceForThoughts.fetchThoughtsForUser(rid);
                responceObj.thoughts = thoughts;
                if (type === 'product') {
                    const product = await ServiceForProducts.retriveProduct(rid);
                    responceObj.product = product
                }
                resolve(responceObj);
            }

        } catch (error) {
            console.log("Error insde controller ", error)
            reject(error.message)
        }
    })
}

const fetchSuggestedPepole = (userToFind) => {
    const dbForUser = mongoose.connection.useDb('users');
    const ModelForSuggestion = dbForUser.model('users', SchemaForCommanUserData, 'common-users-storage');
    const searchPattern = new RegExp(userToFind, 'i');
    return new Promise((resolve, reject) => {
        try {
            const resultantArray = ModelForSuggestion.aggregate([
                {
                    $match: {
                        $or: [
                            { username: { $regex: searchPattern } },
                            { name: { $regex: searchPattern } }
                        ],
                    }
                },
                {
                    $project: {
                        _id: 1,
                        username: 1,
                        name: 1,
                        profileImage: 1,
                        type: 1
                    }
                }

            ]);
            resolve(resultantArray);
        } catch (error) {
            reject(error);
        }
    })
}

const fetchMultipleProfile = (array, field) => {
    return new Promise(async (resolve, reject) => {
        try {
            const dbForUser = mongoose.connection.useDb('users');
            const ModelForMultipleProfile = dbForUser.model('users', SchemaForCommanUserData, 'common-users-storage');
            const result = await ModelForMultipleProfile.find(
                {
                    [field]: {
                        $in: array
                    }
                },
                {
                    _id: 1,
                    name: 1,
                    username: 1,
                    profileImage: 1,
                    type: 1
                }
            )
            console.log("result", result);
            resolve(result)
        } catch (error) {
            console.log("error For Multiple Users", error)
            reject(error)
        }

    })
}

const fetchProfileByCustomFilter = (filter) => {
    return new Promise(async (resolve, rejects) => {
        try {
            const db = mongoose.connection.useDb('users');
            const Model = db.model('Users', SchemaForCommanUserData, 'common-users-storage');
            const result = await Model.findOne(filter, {
                _id: 1,
                name: 1,
                username: 1,
                profileImage: 1,
                type: 1
            });
            resolve(result)
        } catch (error) {
            console.log("Error in this ID", filter)
            rejects(error)
        }
    })

}

const fetchProductprofile = (filterObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Model = db.model('Product', SchemaForCompany, 'user-as-company');
            const org = await Model.findOne(filterObj);
            resolve(org)
        } catch (error) {
            reject(error)
        }
    })
}

const fetchProfileByCategoryandFilters = (category) => {
    return new Promise(async(resolve, reject) => {
        try {
            const Model = db.model('Users', SchemaForCompany, 'common-users-storage');
            const res = await Model.find({type : category});
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    fetchProfile,
    fetchSuggestedPepole,
    fetchMultipleProfile,
    fetchProfileByCustomFilter,
    fetchProductprofile,
    fetchProfileByCategoryandFilters
};
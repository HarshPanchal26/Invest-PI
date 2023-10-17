const { mongoose } = require('../config/database');
const { SchemaForCommanUserData } = require('../models/signinmodels');
const db = mongoose.connection.useDb('users');

// id here is a rid (refrence is for collections)
const updateAbout = (Schema, Collection, id, Object) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Model = db.model('About', Schema, Collection);
            const res = await Model.updateOne({ rid: id }, Object);
            console.log("res UPdates ===>", res)
            resolve(res)

        } catch (error) {
            console.log("Error inside About CF ", error)
            reject(error.message);
        }
    })
}

const updateMain = (Schema, Collection, id, Object) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Model = db.model('Main', Schema, Collection);
            const res = await Model.updateOne({ rid: id }, Object);
            console.log("res Main ===>", res);
            resolve(res);
        } catch (error) {
            console.log("Error inside About CF ", error)
            reject(error.message);
        }
    })
}

const updateProfile = (Schema, Collection, id, Object) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Model = db.model('Profile', Schema, Collection);
            const res = await Model.updateOne({ rid: id }, Object);
            const ModelForCommanUser = db.model('Comman', SchemaForCommanUserData, 'common-users-storage');
            await ModelForCommanUser.updateOne({ _id: id }, {
                $set: {
                    'profileImage': Object.profileImage
                }
            })

            resolve(res)
        } catch (error) {
            console.log("Error inside updateProfile ", error)
            reject(error.message);
        }
    })
}


const updateCommanData = (id, Obj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Model = db.model('Comman', SchemaForCommanUserData, 'common-users-storage');
            const res = await Model.updateOne({ _id: id }, Obj);
            console.log("res Comman data  ===>", res)
            resolve(res)
        } catch (error) {
            console.log("Error inside updateProfile ", error)
            reject(error.message);
        }
    })
}

module.exports = { updateAbout, updateProfile, updateMain, updateCommanData }
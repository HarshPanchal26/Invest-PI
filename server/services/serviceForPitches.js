const { mongoose } = require('../config/database');
const dbForPitch = mongoose.connection.useDb('others');
const { SchemaForPitches, SchemaForCounterOffer } = require('../models/PitchModels');

const fetchSinglePitch = (_id) => {
    return new Promise((resolve, reject) => {
        try {
            const Model = dbForPitch.model('Pitches', SchemaForPitches, 'pitch');
            const pitch = Model.findOne({ _id: _id });
            resolve(pitch);
        } catch (error) {
            console.log("Error in fetching pitch from service ", error)
            reject(error)
        }
    })
}

const fetchMultiplePitches = (id) => {
    return new Promise(async (reslove, reject) => {
        try {
            const Model = dbForPitch.model('Pitches', SchemaForPitches, 'pitch');
            const pitch = await Model.find({ rid: id });
            console.log("Get Pitch", pitch)
            reslove(pitch)
        } catch (error) {
            console.log("Error while fetching ", error)
            reject(error);
        }
    })
}

const fetchMultiplePichesWithFilters = (FilterObj) => {
    return new Promise(async (reslove, reject) => {
        try {
            const Model = dbForPitch.model('Pitches', SchemaForPitches, 'pitch');
            const result = await Model.find({});
            reslove(result)
        } catch (error) {
            console.log("Error is ", error)
            reject(error)
        }
    })
}

const makeCounterOffer = (ObjForCounter) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("ObjForCounter" ,ObjForCounter)
            const ModelForCounter = dbForPitch.model('Counters', SchemaForCounterOffer, 'counter-offers');
            const res = await ModelForCounter.create(ObjForCounter);
            await updateInEngagments({ '_id': ObjForCounter.pitchId }, 'counter');
            resolve(res)
        } catch (error) {
            console.log("Hello Error I am =" , error )
            reject(error)
        }
    })
}

const fetchAllCounterOffersForPitch = (filters) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ModelForCounter = dbForPitch.model('Counters', SchemaForCounterOffer, 'counter-offers');
            const res = await ModelForCounter.find(filters);
            resolve(res);
        } catch (error) {
            reject(error)
        }
    })
}

const AcceptCounterOffers = (id)=>{
    return new Promise(async(reslove , reject)=>{
        try {   
            const ModelForCounter = dbForPitch.model('Counters', SchemaForCounterOffer, 'counter-offers');
            const res = await ModelForCounter.updateOne({_id  : id} ,{
                $set : {
                    accept : true
                }
            })
            reslove(res)
        } catch (error) {
            reject(error)    
        }
    })
}

const DeclineCounterOffer = (id)=>{
    return new Promise(async(reslove , reject)=>{
        try {   
            const ModelForCounter = dbForPitch.model('Counters', SchemaForCounterOffer, 'counter-offers');
            const res = await ModelForCounter.updateOne({_id  : id} ,{
                $set : {
                    reject : true
                }
            })
            reslove(res)
        } catch (error) {
            reject(error)    
        }
    })
}

const updateInEngagments = (filter, field) => {
    return new Promise((resolve, reject) => {
        try {
            const ModelForCounter = dbForPitch.model('Pitches', SchemaForPitches, 'pitch');
            const res = ModelForCounter.updateOne(filter, {
                $inc: { [`engagement.${field}`]: 1 } // Note the correct field construction
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    fetchSinglePitch,
    fetchMultiplePichesWithFilters,
    fetchMultiplePitches,
    updateInEngagments,
    makeCounterOffer,
    fetchAllCounterOffersForPitch,
    AcceptCounterOffers,
    DeclineCounterOffer
}
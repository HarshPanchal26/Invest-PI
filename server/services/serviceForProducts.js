const { mongoose } = require('../config/database');
const { SchemaForPitches } = require('../models/PitchModels');
const { SchemaForMyProduct } = require('../models/ProductModels');
const ServiceForFirebase = require('./serviceForFirebase')

// const dbForUser = mongoose.connection.useDb('users');
const dbForOthers = mongoose.connection.useDb('others');

const createProduct = (Obj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ModelForProduct = dbForOthers.model('Products', SchemaForMyProduct, 'products');
            const data = await ModelForProduct.create(Obj);
            console.log(data);
            resolve(data);
        } catch (error) {
            reject({
                created: false,
                message: error.message
            })
        }
    })
}


const retriveProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ModelForProduct = dbForOthers.model('Products', SchemaForMyProduct, 'products');
            if (id === undefined) {
                const data = await ModelForProduct.find({});
                resolve(data);
            }
            if (id) {
                const data = await ModelForProduct.findOne({ rid: id });
                resolve(data);
            }
        } catch (error) {
            reject({
                created: false,
                message: error.message
            })
        }
    })
}

const createUSPForProduct = (condition, object) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ModelForUSP = dbForOthers.model('usps', SchemaForMyProduct, 'products');
            let updatedObject = {
                title: object.title,
                aboutUSP: object.aboutUSP,
                url: object.imageUrl,
                // likes: object.likes
            }
            const result = await ModelForUSP.updateOne(condition, {
                $push: {
                    "usp": updatedObject
                }

            });
            console.log("Product USP is", result, object);
            resolve(result)
        } catch (error) {
            reject(error);
        }
    })
}


const createMediaForProduct = (condition, file, object) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ModelForUSP = dbForOthers.model('media', SchemaForMyProduct, 'products');
            let updatedObject = {
                imageUrl: object.img,
                title: object.title,
                subtitle: object.subtitle,
            }
            console.log("Index", object.id);
            if (file) {
                const urlForImage = await ServiceForFirebase.UploadImageOnFirebabe(file, '/media', Date.now());
                updatedObject.imageUrl = urlForImage.URL;
            }
            const result = await ModelForUSP.updateOne(condition, {
                // [`media.${object.id}`] :  updatedObject
                $set: {
                    [`media.${object.id}`]: updatedObject
                }
            });
            console.log("Product Media is", result, object);
            resolve(result)
        } catch (error) {
            reject(error);
        }
    })
}

const createPitchForProduct = (rid , object) => {
    const {faqs , additionalDetails , desireInvestor} = object;
    const {Audience , Business ,Financials ,Market , Performance , Equity} = faqs;

    let ObjectForFaqs = {
        Financials : JSON.parse(JSON.stringify(Financials)),
        Business : JSON.parse(JSON.stringify(Business)),
        Audience : JSON.parse(JSON.stringify(Audience)),
        Market : JSON.parse(JSON.stringify(Market)),
        Performance : JSON.parse(JSON.stringify(Performance)),
        Equity : JSON.parse(JSON.stringify(Equity)),
    }

    const ArrayFordesireInvestor =[];

    for(let i=0;i<desireInvestor.length;i++){
        ArrayFordesireInvestor.push(desireInvestor[i]._id)
    }

    let FinalObject = {
        rid : rid,
        ...additionalDetails,
        faqs : {
            ...ObjectForFaqs
        },
        desirePepole : [...ArrayFordesireInvestor]
    }
    
    console.log("ObjectForPitch" , FinalObject)
    return new Promise(async(resolve, reject) => {
        try {
            const ModelForPitch = dbForOthers.model('Pitch', SchemaForPitches , 'pitch');
            const result = await ModelForPitch.create(FinalObject);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createProduct,
    retriveProduct,
    createUSPForProduct,
    createMediaForProduct,
    createPitchForProduct
}





// $push: {
//     "media": {
//         $each: [
//             updatedObject
//         ],
//         $position: object.id
//     }
// },
const { default: axios } = require('axios');
const ServiceForProducts = require('../services/serviceForProducts');

const controllerForProducts = async (req, res) => {
    const { uid, type } = res.locals;
    console.log(type);
    try {
        const data = await ServiceForProducts.createProduct({ rid: uid });
        res.status(201).json({
            data: data
        })
    } catch (error) {
        res.status(402).json({
            error: error.message
        })
    }
}

const controllerForFinancial = () => {

}

const controllerForNews = () => {

}

const controllerForMedia = async (req, res) => {

    const mediaFile = req.files?.['media']?.[0]
    const metaData = JSON.parse(req.body['data']);

    try {
        const createdMedia = await ServiceForProducts.createMediaForProduct({ rid: res.locals.uid }, mediaFile, metaData);
        res.status(201).json({
            mediaSave: true,
            data: createdMedia
        });
    } catch (error) {
        res.status(402).json({
            error: error.message
        })
    }
}

const controllerForPepole = () => {

}

const contollerForUSPs = async (req, res) => {

    if (req.type === 'create') {
        try {
            const createdData = await ServiceForProducts.createUSPForProduct({ rid: res.locals.uid }, req.body);
            res.status(201).json({
                created: true,
                usp: createdData
            })
        } catch (error) {
            res.status(402).json({
                created: false,
                message: error.message
            })
        }
    } else if (req.type === 'update') {

    } else {
        res.status(402).json({
            error: 'SOME INTERNAL ERROR , CONTACT TO SERVICE CENTER'
        })
    }
}

const controllerForPitch = async (req, res) => {

    try {
        const result = await ServiceForProducts.createPitchForProduct(res.locals.uid , req.body);
        res.status(201).json({
            pitched: true,
            result: result,
        })
    } catch (error) {
        res.status(401).json({
            pitched: false,
            error: error.message
        })
    }
}

module.exports = {
    controllerForFinancial,
    controllerForMedia,
    controllerForNews,
    controllerForPepole,
    controllerForProducts,
    contollerForUSPs,
    controllerForPitch
}
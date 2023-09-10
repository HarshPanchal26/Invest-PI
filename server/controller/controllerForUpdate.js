const { findSchemaAndCollection } = require('../services/servicesForAuthentication');
const ServiceForUpdate = require('../services/serviceForUpdate')
const ServiceForFirebase = require('../services/serviceForFirebase')

async function controllerForAbout(req, res) {
    const reqObject = req.body;
    const { uid, type } = res.locals;
    const { Schema, Collection } = findSchemaAndCollection(type);
    try {
        if (type === 'CF') {

            let ObjectForUpdate = {
                about: reqObject.about,
                headquarters: reqObject.headquarters,
                link: reqObject.link,
                city: reqObject.city,
                state: reqObject.state,
                country: reqObject.country,
            }
            await ServiceForUpdate.updateAbout(Schema, Collection, uid, ObjectForUpdate);

        } else if (type === 'company') {

            let ObjectForUpdate = {
                about: reqObject.about,
                headquarters: reqObject.headquarters,
                link: reqObject.link,
                city: reqObject.city,
                state: reqObject.state,
                country: reqObject.country,
            }
            await ServiceForUpdate.updateAbout(Schema, Collection, uid, ObjectForUpdate);
        } else {
            let ObjectForUpdate = {
                about: reqObject.about,
            }
            await ServiceForUpdate.updateAbout(Schema, Collection, uid, ObjectForUpdate);
        }
        res.status(201).json({
            updated: true,
            message: 'Data is been updated'
        })
    } catch (error) {
        console.log("cOntroller error ", error)
        res.status(401).json({
            updated: false,
            message: error.message
        })
    }
}


const controllerForMain = async (req, res) => {
    try {
        const { uid, type } = res.locals;
        const reqObject = req.body;
        const { Schema, Collection } = findSchemaAndCollection(type);

        if(type === 'CF'){

            let ObjectForUpdate = {
                name: reqObject.name,
                username: reqObject.username,
                bio: reqObject.bio,
            }
            await ServiceForUpdate.updateMain(Schema, Collection, uid, ObjectForUpdate);

        }else if(type === 'company'){
            let ObjectForUpdate = {
                name: reqObject.name,
                username: reqObject.username,
                bio: reqObject.bio,
            }
            await ServiceForUpdate.updateMain(Schema, Collection, uid, ObjectForUpdate);

        }else {
            let ObjectForUpdate = {
                username: reqObject.username,
                firstName : reqObject.firstname,
                lastName : reqObject.lastname,
                bio : reqObject.bio,
                email : reqObject.email,
            }
            await ServiceForUpdate.updateMain(Schema, Collection, uid, ObjectForUpdate);
            await ServiceForUpdate.updateCommanData(uid, {username: reqObject.username});
        }
        res.status(201).json({
            updated: true,
            message: 'Data is been updated'
        })

    } catch (error) {
        console.log("Controlller For Main ", error)
        res.status(401).json({
            updated: false,
            message: error.message
        })
    }


}

const controllerForActivity = () => {

}


const controllerForProfileImage = async (req, res) => {
    const { uid, type } = res.locals;
    const { Schema, Collection } = findSchemaAndCollection(type);
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    try {
        let createdAt = new Date().getTime();
        const result = await ServiceForFirebase.UploadImageOnFirebabe(req.file, 'profile', createdAt);
        let Obj = {
            profileImage : result.URL
        }
        await ServiceForUpdate.updateProfile(Schema, Collection , uid, Obj);
        res.status(201).json({
            updated: true,
            url : result.URL,
            message: 'Profile is Updated',
        });

    } catch (error) {
        console.error('Error in file upload:', error);
        res.status(402).json({
            updated: false,
            message: error.message,
        });
    }

};
const controllerForCoverImage = async (req, res) => {
    const { uid, type } = res.locals;
    const { Schema, Collection } = findSchemaAndCollection(type);
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    try {
        let createdAt = new Date().getTime();
        const result = await ServiceForFirebase.UploadImageOnFirebabe(req.file, 'cover', createdAt);
        let Obj = {
            coverImage : result.URL
        }
        await ServiceForUpdate.updateProfile(Schema, Collection , uid, Obj);
        res.status(201).json({
            updated: true,
            url : result.URL,
            message: 'Cover is Updated',
        });

    } catch (error) {
        console.error('Error in file Cover upload:', error);
        res.status(402).json({
            updated: false,
            message: error.message,
        });
    }

};


module.exports = {
    controllerForProfileImage,
    controllerForCoverImage,
    controllerForActivity,
    controllerForMain,
    controllerForAbout
}
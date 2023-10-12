const { findSchemaAndCollection } = require('../services/servicesForAuthentication');
const ServiceForUpdate = require('../services/serviceForUpdate')
const ServiceForFirebase = require('../services/serviceForFirebase')

async function controllerForAbout(req, res) {
    const data = req.body;
    const { uid, type } = res.locals;
    const { Schema, Collection } = findSchemaAndCollection(type);
    try {
        if (type === 'CF') {

            let ObjectForUpdate = {
                about: data.about,
                headquarters: data.headquarters,
                link: data.link,
                city: data.city,
                state: data.state,
                country: data.country,
            }
            await ServiceForUpdate.updateAbout(Schema, Collection, uid, ObjectForUpdate);

        } else if (type === 'company') {

            let ObjectForUpdate = {
                about: data.about,
                headquarters: data.headquarters,
                link: data.link,
                city: data.city,
                state: data.state,
                country: data.country,
            }
            await ServiceForUpdate.updateAbout(Schema, Collection, uid, ObjectForUpdate);
        } else {
            let ObjectForUpdate = {
                about: data.about,
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
        const {data, status} = req.body;
        const { Schema, Collection } = findSchemaAndCollection(type);
        let ObjectForUpdate = null;
        console.log("Status" , req.body)
        if(type === 'CF'){
            console.log(data)   
            ObjectForUpdate = {
                name: data.firmname,
                username: data.username,
                bio: data.bio,
            }

        }else if(type === 'company'){
             ObjectForUpdate = {
                name: data.name,
                username: data.username,
                bio: data.bio,
            }

        }else {
             ObjectForUpdate = {
                username: data.username,
                firstName : data.firstname,
                lastName : data.lastname,
                bio : data.bio,
                email : data.email,
            }
        }
        if(ObjectForUpdate !== null){
            await ServiceForUpdate.updateMain(Schema, Collection, uid, ObjectForUpdate);
            // await ServiceForUpdate.updateCommanData(uid, {username: data.username});
        }else{
            res.status(401).json({
                updated: false,
                message: 'Internal Server Error , Please try after some time or rech out at help cneter'
            })
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
        return res.status(400).json({ error: 'No file For Uplaod' });
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
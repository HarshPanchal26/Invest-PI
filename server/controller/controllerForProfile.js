const ServiceForProfile = require('../services/serviceForProfile');
const controllerForOthersProfile = async (req, res) => {
    const { username } = req.body;
    try {
        const data = await ServiceForProfile.fetchProfile({ username: username });
        res.status(201).json(data);
    } catch (error) {
        console.log("Error insde controller ", error)
        res.status(401).json({
            data: error.message
        })
    }
}

const controllerForPerosnalProfile = async (req, res) => {
    const { uid, type } = res.locals;
    try {
        const data = await ServiceForProfile.fetchProfile({ _id: uid });
        res.status(201).json(data);
    } catch (error) {
        console.log("Error insde controller ", error)
        res.status(401).json({
            data: error.message
        })
    }
}


const controllerForTagPepole = async (req, res) => {
    const userToFind = req.query.find;
    let word = userToFind.split('@')[1];
    console.log("userToFind", word)
    try {
        const data = await ServiceForProfile.fetchSuggestedPepole(word);
        res.status(201).json({
            profiles: data
        })
    } catch (error) {
        res.status(401).json({
            profiles: null,
            error: error.message
        })
    }
}

const controllerForSerchPepole = async (req, res) => {
    const userToFind = req.query.find;
    try {
        const data = await ServiceForProfile.fetchSuggestedPepole(userToFind);
        res.status(201).json({
            profiles: data
        })
    } catch (error) {
        res.status(401).json({
            profiles: null,
            error: error.message
        })
    }
}


const controllerForMultipleProfile = async (req, res) => {
    const { array, field } = req.body;
    try {
        const data = await ServiceForProfile.fetchMultipleProfile(array, field);
        res.status(201).json({
            profiles: data
        })
    } catch (error) {
        res.status(401).json({
            profiles: null,
            error: error.message
        })
    }

}

const controllerForProfileById = async (req, res) => {
    const userToFind = req.query.find;
    try {
        const data = await ServiceForProfile.fetchProfileByCustomFilter({ _id: userToFind });
        res.status(201).json(data);
    } catch (error) {
        console.log("Error insde controller ", error)
        res.status(401).json({
            data: error.message
        })
    }

}

const controllerForProfileByCategory = async (req, res) => {
    const category = req.query.category;
    try {
        const data = await ServiceForProfile.fetchProfileByCategoryandFilters(category);
        res.status(201).json(data);
    } catch (error) {
        console.log("Error insde controller ", error)
        res.status(401).json({
            data: error.message
        })
    }

}

module.exports = {
    controllerForOthersProfile,
    controllerForPerosnalProfile,
    controllerForSerchPepole,
    controllerForMultipleProfile,
    controllerForTagPepole,
    controllerForProfileById,
    controllerForProfileByCategory
};














// const db = mongoose.connection.useDb('users');
// const Model = db.model('Users', SchemaForCommanUserData, 'common-users-storage');
// const responceObj = {
//     user : null,
//     product  : null,
//     thoughts : null,
// }
// try {
//     const result = await Model.findOne({ username : username });
//     if (result == null) {
//         res.status(401).json({
//             user: 'User name is not valid'
//         })
//     } else {
//         const {_id  , type} = result._doc;
//         const { Schema , Collection } = findSchemaAndCollection(type);
//         let rid = _id.toString();
//         let Model = db.model('User' , Schema , Collection);
//         const data = await Model.findOne({rid});
//         responceObj.user = data;
//         const thoughts = await ServiceForThoughts.fetchThoughtsForUser(rid);
//         responceObj.thoughts = thoughts;
//         if(type === 'product'){
//             const product = await ServiceForProducts.retriveProduct(rid);
//             responceObj.product = product
//         }
//         res.status(201).json(responceObj);
//     }

// } catch (error) {
//     console.log("Error insde controller ", error)
//     res.status(401).json({
//         data: error.message
//     })
// }
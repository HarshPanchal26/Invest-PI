const experess = require('express');
const multer = require('multer');
const controllerForProfile = require('../controller/controllerForProfile')
const { controllerForAbout,
    controllerForMain,
    controllerForProfileImage, controllerForCoverImage } = require('../controller/controllerForUpdate')
const { isAutorized } = require('../middleware/middlewareForAuthentication')
const router = experess.Router();

const Storage = multer.memoryStorage();
const upload = multer({ storage: Storage });

router.get('/', (_req, res) => {
    res.send("I am body from profile")
})

router.post('/users', isAutorized, controllerForProfile.controllerForOthersProfile);
router.post('/update/about', isAutorized, controllerForAbout);
router.post('/update/main', isAutorized, controllerForMain);
router.post('/update/profileimage', isAutorized, upload.single('profile'), controllerForProfileImage);
router.post('/update/coverimage', isAutorized, upload.single('cover'), controllerForCoverImage);
router.post('/update/activity', isAutorized, controllerForAbout);
router.get('/tag', isAutorized, controllerForProfile.controllerForTagPepole)
router.get('/search', isAutorized, controllerForProfile.controllerForSerchPepole)
router.post('/view', isAutorized, controllerForProfile.controllerForMultipleProfile)
router.get('/filter', isAutorized, controllerForProfile.controllerForProfileById)
router.get('/users/suggestions', isAutorized, controllerForProfile.controllerForProfileByCategory)

module.exports = router;





// router.get('/server/update', async (req, res) => {
//     try {
//         const db = mongoose.connection.useDb('users');
//         const ModelForServer = db.model('Users', SchemaForCommanUserData, 'common-users-storage');
//         const users = await ModelForServer.aggregate([
//             {
//                 $match: {
//                     type: 'product'
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "user-as-company",
//                     localField: 'username',
//                     foreignField: 'username',
//                     as: 'data'
//                 }
//             },
//             {
//                 $unwind: '$data'
//             },
//             {
//                 $addFields: {
//                     name: '$data.companyname',
//                     profileImage: '$data.profileImage'
//                 }
//             },
//             {
//                 $project: {
//                     data : 0
//                 }
//             },
//             {
//                 $merge: {
//                     into: 'common-users-storage',
//                     whenMatched: 'merge',
//                     whenNotMatched: 'insert'
//                 }
//             },

//         ]);
//         console.log("users", users)
//         res.status(201).json({
//             users: users
// });

//     } catch (error) {
//         console.log("error" , error)
//         res.status(500).json({
//             error: error.message
//         });
//     }
// });



// let: { commonUserId: '$username' , refrenceKey : '$username'},
// pipeline: [
//     {
//         $match: {
//             $expr: { $eq: ['$$refrenceKey', '$$commonUserId']}
//         }
//     }
// ],
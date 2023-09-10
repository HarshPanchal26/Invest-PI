const experess = require('express');
const multer = require('multer');
const controllerForProfile = require('../controller/controllerForProfile') 
const {controllerForAbout ,
     controllerForMain,
     controllerForProfileImage , controllerForCoverImage} = require('../controller/controllerForUpdate')
const {isAutorized} = require('../middleware/middlewareForAuthentication')
const router = experess.Router();

const Storage = multer.memoryStorage();
const upload = multer({storage : Storage});

router.get('/', (_req,res)=>{
    res.send("I am body from profile")
})

router.post('/users', isAutorized , controllerForProfile);
router.post('/update/about', isAutorized , controllerForAbout);
router.post('/update/main', isAutorized , controllerForMain);
router.post('/update/profileimage', isAutorized , upload.single('profile') , controllerForProfileImage);
router.post('/update/coverimage',isAutorized , upload.single('cover') , controllerForCoverImage);
router.post('/update/activity',isAutorized ,  controllerForAbout);

module.exports = router;



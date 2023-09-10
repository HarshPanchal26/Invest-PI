const experess = require('express');
const multer = require('multer');
const { isAutorized } = require('../middleware/middlewareForAuthentication')
const getUserData = require('../middleware/middlewareForUserData')
const { controllerForCreateThoughts, controllerForUpdateThoughts } = require('../controller/contollerForThoughts');
const Storage = multer.memoryStorage();
const router = experess.Router();
const upload = multer({ storage: Storage })


router.get('/', (req, res) => {
    res.send("I am body")
})

router.get('/authorization', isAutorized, getUserData, (_req, res) => {
    res.status(201).json({
        authorized: true,
        data: res.locals.user,
        message: 'Autorized Person.',
    })
})

router.post('/publish',
    isAutorized,
    upload.fields([
        {name : 'image'},
        {name : 'data'}
    ]),
    controllerForCreateThoughts
);

router.post('/update', isAutorized, controllerForUpdateThoughts);



module.exports = router;

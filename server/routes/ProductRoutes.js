const experess = require('express');
const multer = require('multer');
const { isAutorized } = require('../middleware/middlewareForAuthentication')
const getUserData = require('../middleware/middlewareForUserData')
const ProductController = require('../controller/controllerForProduct');
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
});

router.post('/create', isAutorized, ProductController.controllerForProducts);
router.post('/create/usp', isAutorized, (req, res, next) => {
    req.type = 'create';
    next();
}, ProductController.contollerForUSPs);
router.post('/create/media', isAutorized, (req, res, next) => {
    req.type = 'create';
    next();
}, upload.fields([
    { name: 'media' },
    { name: 'data' }
]), ProductController.controllerForMedia);

router.post('/create/pitch' , isAutorized , ProductController.controllerForPitch)

router.post('/add/pepole' , isAutorized , ProductController.controllerForAddPepole)

router.get('/fetch/all' , isAutorized , ProductController.controllerForRetriveProduvtWithInvestments)

module.exports = router;

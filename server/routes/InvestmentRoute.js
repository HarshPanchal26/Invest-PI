const experess = require('express');
const {isAutorized} = require('../middleware/middlewareForAuthentication');
const { controllerForNewInvestment } = require('../controller/controllerForInvestment');

const router = experess.Router();

// router.post('/new' , isAutorized , controllerForNewInvestment);
router.post('/new' , isAutorized , controllerForNewInvestment);

module.exports = router;
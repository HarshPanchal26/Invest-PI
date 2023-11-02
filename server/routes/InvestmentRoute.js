const experess = require('express');
const {isAutorized} = require('../middleware/middlewareForAuthentication');
const { controllerForNewInvestment  , controllerForFetchInvestments} = require('../controller/controllerForInvestment');

const router = experess.Router();

router.post('/new' , isAutorized , controllerForNewInvestment);
router.get('/fetch' , isAutorized , controllerForFetchInvestments);
router.post('/fetch' , isAutorized , controllerForFetchInvestments);

module.exports = router;
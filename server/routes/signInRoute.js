const experess = require('express');
const jwt = require('jsonwebtoken');

const router = experess.Router();

router.get('/', (req,res)=>{
    res.send("I am get")
})
router.post('/', (req,res)=>{
    res.send("I am post")
})

module.exports = router;









// Paassword for Cluster
// # ATnFtvrjXmwmsMlW

// passowrd for Realm
// # 3HSNlszVuqdlOy5L


// link 
// # mongodb+srv://hrppanchal27:ATnFtvrjXmwmsMlW@clusterpi.3x7htsc.mongodb.net/?retryWrites=true&w=majority
// # mongodb+srv://hrppanchal27:<password>@clusterpi.3x7htsc.mongodb.net/
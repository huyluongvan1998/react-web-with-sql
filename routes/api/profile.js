const express = require('express');
const router = express.Router();


//Create    a route;
//@Route    Get api/profile
//@desc     Test route
//@access   Public
router.get('/', (req, res)=> res.send('Profile route'));
//export the file
module.exports = router;
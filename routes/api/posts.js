const express = require('express');
const router = express.Router();


//Create    a route;
//@Route    Get api/posts
//@desc     Test route
//@access   Public
router.get('/', (req, res)=> res.send('Posts route'));
//export the file
module.exports = router;
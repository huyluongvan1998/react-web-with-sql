const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
//Create    a route;
//@Route    Get api/auth
//@desc     Test route
//@access   Public
//@middleware whenever want to use middleware then add it as a secondary argument in router.get;
//@middleware used to authenicate whether the user are valid or not
router.get('/', auth, async (req, res)=> {
    try{
        //return back the info of data obj without password
        const user =  await User.findById(req.user.id).select('-password'); 
        
        res.json(user);
    }catch(error){
        console.error(error.message);
        res.status(500).send({ msg: 'Server error'});
    }
});

//export the file
module.exports = router;
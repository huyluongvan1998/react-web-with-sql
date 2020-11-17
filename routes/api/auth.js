const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const config = require('config');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//Create    a route;
//@Route    Get api/auth
//@desc     Test route
//@access   Private
//@middleware whenever want to use middleware then add it as a secondary argument in router.get;
//@middleware used to authenicate whether the user are valid or not
router.get('/', auth, async (req, res)=> {
    try{
        //return back the info of data obj without password
        const user =  await User.findById(req.user.id).select('-password'); 
        
        res.json(user);
    }catch(error){
        console.error(error.message);
        res.status(500).send({ msg: 'Server error.'});
    }
});


//VALIDATE User data.
//@Route    POST api/auth
//@desc     Authentication User & Get token 
//@access   Private
router.post('/', [

                        // LOGIN SESSION //
    
    //check(variable, custom message if error happened)    Check to avoid empty.
    //Check for Login
    check('email', 'Please include your Email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {

    // check if whether have an error with check functions above.
    const errors = validationResult(req);
    //check whether the condition above not match.
    if(!errors.isEmpty()){
        //return the error status 400 with custom error message.
        return res.status(400).json({ errors: errors.array() });
    }
//destructoring variable in user file

    //get password the page [plain test]   
    const { email, password } = req.body;
    
    try {
        // see if user exist
        // check the email whether it exist or not [email is unique]
        // take data of the user from database by email => which have encrypted password.
        let user = await User.findOne({ email });

        // if email not exist in the db then appear error msg
        if(!user) {
            return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] }); // put the new error to the array of errors
        }
        //check whether plain pw match with encrypted pw
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) {
            return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] });
        }

        //return jsonwebtoken
        const payload ={
            user: {
                id:user.id //the id that mongodb provided for each object had been created.
            }
         };

         jwt.sign(
            payload,                    //pass in the Payload
            config.get('jwtSecret'),    //pass in the secret (password for retrieving token)
            { expiresIn: 36000},        //pass in the expire time
            (err, token) => {           //call back function to send back the token if there are no error
                if(err) throw err;
                return res.json({ token });
            }
         )
    } catch (error){
        console.error(error.message);
        res.status(500).send('Server error');
    }
 
    }
);

//export the file
module.exports = router;
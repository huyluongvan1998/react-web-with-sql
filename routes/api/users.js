const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
//jwt return object with payload (used to identify current user)  
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');

//Create    a route;
//@Route    POST api/users
//@desc     Register Route
//@access   Private

//FLOW: check function inside POST -> error handling ->user handling


//@Test test on Postman as Post request
router.post('/', [
    //check(variable, custom message if error happened)    Check to avoid empty.
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include your Email').isEmail(),
    check('password', 'Please include your Password').isLength({min: 6})
], async (req, res) => {
    // check if whether have an error with check functions above.
    const errors = validationResult(req);
    //check whether the condition above not match.
    if(!errors.isEmpty()){
        //return the error status 400 with custom error message.
        return res.status(400).json({ errors: errors.array() });
    }
//destructoring variable in user file

    
    const {name, email, password } = req.body;
    
    try {
        // see if user exist
        // check the email whether it exist or not [email is unique]
        let user = await User.findOne({ email });
        
        if(user) {
            res.status(400).json({ errors: [{msg: 'User already exists'}] }); // put the new error to the array of errors
        }
        //get user gravatar (post image on gravatar.com and input url to the code)
        const avatar = gravatar.url({
            s: '200', // size 200
            r: 'pg',  // rating permitted G images allowed
            d: 'mm'   // default type avoid error status
        })

        //create new a object that with the following data
        user = new User({
            //the order that save into database
            name,
            email,
            password,
            avatar
        })

        //encrypt password
        const salt = await bcrypt.genSalt(10); //create type for hashing
        user.password = await bcrypt.hash(password, salt); // hashing password

        await user.save(); //save data to database
        
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
                res.json({ token }); 
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
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require ('../../models/User');
const Profile = require('../../models/Profile');


const {check, validationResult} = require('express-validator');
const config = require('config');
const request = require('request')

//Create    a route;
//@Route    Get api/profile/me
//@desc     Get current user Profile
//@access   Private
router.get('/me', auth, async (req, res)=> {
    try{
        //find profile by id from auth middleware 
        // populate to take more info to profile
        //populate('user',['name','avatar'] => user: { name: '' , avatar: ' '}
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({ msg: 'there is no profile for this user' });
        }
            res.json(profile);

    }catch(error){
        console.error(error.message);
        res.status(500).send('Server error!');
    }
});


//Create    a route;
//@Route    POST api/profile/me
//@desc     Create or update user Profile
//@access   Private

router.post('/', [auth, [
    check('status', 'Status is required')
    .not()
    .isEmpty(),
    check('skills', 'Skills is required')
    .not()
    .isEmpty()
] ], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array() });
    }
  
 const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin 
 } = req.body;

 //Build Profile Object
 // check if these field have whether value or not and assign to field
 const profileFields =  {};
 profileFields.user = req.user.id;
 if(company) profileFields.company = company;
 if(website) profileFields.website = website;
 if(location) profileFields.location = location;
 if(bio) profileFields.bio = bio;
 if(status) profileFields.status = status;
 if(githubusername) profileFields.githubusername = githubusername;
 if(skills) {
     //skills is string seperate by conma => turn into Array
     //split(turn into array without ","), trim to get rid of space
     profileFields.skills = skills.split(',').map(skill => skill.trim());
 } 

 //Build Social Object -> if not create Object Social will be undefined
 profileFields.social = {}
 if(youtube) profileFields.social.youtube = youtube;
 if(twitter) profileFields.social.twitter = twitter;
 if(facebook) profileFields.social.facebook = facebook;
 if(linkedin) profileFields.social.linkedin = linkedin;
 if(instagram) profileFields.social.instagram = instagram;

 try{
    let profile = await Profile.findOne({ user: req.user.id }) 


    //If there a profile then update it
    if(profile){
        //Update
        profile = await Profile.findOneAndUpdate(
            {user: req.user.id},    //update at the user have matching id
            {$set: profileFields},  // set value at the profileField
            {new: true});           //allow update


            return res.json(profile);
    }
    // if not then Create
    //@Flow: take data from profileFields put into Profile object
    profile = new Profile(profileFields);
    
    await profile.save();
    res.json(profile);

 }catch(error){
     console.error(error.message);
     res.status(500).send('Server Error')
 }
 
})

//Create    a route;
//@Route    GET api/profile
//@desc     GET all user Profile
//@access   Private
    
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);

        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }
})

//Create    a route;
//@Route    GET api/profile/user/:user-id
//@desc     GET user Profile by user-id
//@access   Private

router.get('/user/:user_id', async (req, res) => {
    //find in collection user for the matching data.
    try {
        
        const profile = await Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar']);
        if(!profile)
            res.status(400).json({msg: 'Profile not found' });

            res.json(profile);
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            res.status(400).json({msg: 'Profile not found' })
        }
        res.status(500).send('Server error');
    }
}); 

//Create    a route;
//@Route    DELETE api/profile
//@desc     Delete user Profile by user-id
//@access   Private

router.delete('/', auth, async (req,res) => {
    try {
        //use Auth middlewhere by token -> take back user data -> delete
        //find profile by user id and delete it
        await Profile.findOneAndRemove({ user: req.user.id});
        //find user by user id and delete it
        await User.findOneAndRemove({ _id: req.user.id});

        res.json({msg: 'User deleted'});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg : 'Server Error' });
    }
})

//Create    a route;
//@Route    PUT api/profile/experience
//@desc     Add the experience to Profile by user-id
//@access   Private

router.put('/experience', [auth,
check('title', 'Title is required')
    .not()
    .isEmpty(),
check('company', 'Company is required')
    .not()
    .isEmpty(),
check('location', 'Location is required')
    .not()
    .isEmpty(),
check('from', 'From is required')
    .not()
    .isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array() });
    }
    try {
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description,
            } = req.body;

        const newExp =  {
            title,
            company,
            location,
            from,
            to,
            current,
            description,
            };

        newProfile = await Profile.findOne({ user: req.user.id})
        if(!newProfile){
            res.send('User not found!');
        }


        newProfile.experience.unshift(newExp);

        await newProfile.save();

        res.json(newProfile);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg: 'Server Error'});
    }
})

//Create    a route;
//@Route    Delete api/profile/experience
//@desc     delete the experience to Profile by user-id
//@access   Private

//remove exp from anywhere in exp collection
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        profile = await Profile.findOne({ user: req.user.id})
        
        //can nest the method of array by this
        const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id)

        profile.experience.splice(removeIndex, 1);

        await profile.save()

        res.json(profile);
            
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg : 'Server error'});
    }
})


//Create    a route;
//@Route    PUT api/profile/education
//@desc     Add the education to Profile by user-id
//@access   Private

router.put('/education', [auth, 
    check('school','School is required').not().isEmpty(),
    check('degree','Degree is required').not().isEmpty(),
    check('fieldofstudy','Field of study is required').not().isEmpty(),
    check('from','From is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array() });
    }

    try {
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }

        profile = await Profile.findOne({ user: req.user.id });

        if(!profile){
            res.send('Profile not Found');
        }

        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({  msg : 'Server Error' });
    }
})
 
//Create    a route;
//@Route    DELETE api/profile/education/:edu_id
//@desc     Delete the education to Profile by user-id at any location
//@access   Private

router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        //take user by token
        const profile = await Profile.findOne({ user: req.user.id});
        if(!profile) {
            res.send("Profile not found");
        }

        removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id)

        profile.education.splice(removeIndex, 1);

        await profile.save(); 
        
        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error'});
    }
})


//Create    a route;
//@Route    GET api/profile/github/:username
//@desc     GET the github username 
//@access   public

router.get('/github/:username', (req,res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username
            }/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')
            }&client_secret=${config.get('githubSecret')}`,
            method: "GET",
            headers: { 'user-agent' : 'nodejs'}
        };

        request(options, (error, response, body) => {
            if(error){
                console.error(error);
                res.status(500).json({msg: "Error!"});
            }
            if(response.statusCode !== 200) {
                res.status(404).json({msg: 'Github Not Found'});
            }

            res.json(JSON.parse(body));
        });

    } catch (error) {
        console.error("Server Error");
        res.status(500);
    }
})

//export the file
module.exports = router;
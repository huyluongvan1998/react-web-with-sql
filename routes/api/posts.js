const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');

const User = require ('../../models/User');
const Post = require ('../../models/Post');
const Profile = require ('../../models/Profile');

//Create    a route;
//@Route    GET api/posts
//@desc     GET all posts from db     
//@access   Private

router.get('/', auth, async (req, res) => {
    try {
        //sort date:-1 mean the most recent ones first
        // 1 for the oldest first
        const posts = await Post.find().sort({date: -1})


        res.send(posts);
    } catch (error) {
        console.error(error);
        res.status(400).json(msg);
    }
})


//Create    a route;
//@Route    GET api/posts
//@desc     GET posts by userID     
//@access   Private

router.get('/user', auth, async (req, res) => {
    try {
        //sort date:-1 mean the most recent ones first
        // 1 for the oldest first
        const posts = await Post.find({user: req.user.id}).sort({date: -1})
        
        
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(400).send('Server Error');
    }
})

//Create    a route;
//@Route    GET api/posts
//@desc     GET posts by userID     
//@access   Private

router.get('/:id', auth, async (req, res) => {
    try {
        //sort date:-1 mean the most recent ones first
        // 1 for the oldest first
        const post = await Post.findById(req.params.id).sort({date: -1})
        
        if(!post) {
            res.status(404).json({msg: "Post not Found"});
        }
        
        res.json(post);
    } catch (error) {
        console.error(error);
        if(error.kind === 'ObjectID'){
            return res.status(404).json({msg: 'Page not Found'});
        }
        res.status(500).json({msg: 'Server Error'});
    }
})


//Create    a route;
//@Route    POST api/posts
//@desc     Post new post to db     
//@access   Private
router.post('/', [auth, 
    check('text', 'Text is required').not().isEmpty()
] ,async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(500).json({errors: errors.array() })
    }

    try {
        //find by id use in case of the object has only 1 ObjectID
        const user = await User.findById(req.user.id).select('-password') 

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar ,
            user: req.user.id 
        })

        const post = await newPost.save() 

        res.json(post);
        
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ msg: "Server error"});
    }
});

//Create    a route;
//@Route    DELETE api/posts/:id
//@desc     Delete Post by id   
//@access   Private

router.delete('/:id', auth, async (req,res) => {
    try {
        post = await Post.findById(req.params.id);
        
        if(!post) {
            res.json({ msg: 'Post not Found'});
        }

        if(post.user.toString() !== req.user.id){
            res.json({ msg: 'User not Authorize'});
        }

        post.remove();
        res.json({msg: 'Deleted'});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error"});
    }
})

//Create    a route;
//@Route    PUT api/posts/like/:id
//@desc     Like a post
//@access   Private

router.put('/like/:id', auth, async (req, res)=> {
    try {
        const postInfo = await Post.findById(req.params.id);

        if( postInfo.likes
            .filter(like => like.user.toString() === req.user.id)
            .length > 0)  {
                return res.status(400).json({msg: "Post already liked"});
            }
            
            postInfo.likes.unshift({user: req.user.id});

            await postInfo.save();
            res.json(postInfo.likes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error"});
    }
})

//Create    a route;
//@Route    PUT api/posts/unlike/:id
//@desc     unlike a post
//@access   Private

router.put('/unlike/:id', auth, async (req, res)=> {
    try {
        const postInfo = await Post.findById(req.params.id);

        if( postInfo.likes
            .filter(like => like.user.toString() === req.user.id)
            .length === 0)  {
                return res.status(400).json({msg: "Post not have been liked"});
            }
            
            const removeIndex = postInfo.likes.map(like => like.user.toString())
            .indexOf(req.user.id);

            postInfo.likes.splice(removeIndex, 1);

            await postInfo.save();
            res.json(postInfo.likes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error"});
    }
})


//Create    a route;
//@Route    POST api/posts/comment/:id
//@desc     Comment a post
//@access   Private

router.post('/comment/:id', [auth, 
    check('text', 'Text is required')
], async (req, res) => {
    
    const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar
    }

    try {
        post = await Post.findById(req.params.id);
        if(!post) {
            res.json({ msg: 'Post not Found'});
        }

        post.comments.unshift(newComment);
        await post.save()

        res.json(post.comments)
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectID'){
            return res.status(404).json({msg: 'Page not Found'});
        }
        res.status(500).json({ msg: "Server error"});
    }
})

//Create    a route;
//@Route    DELETE api/posts/comment/:id/:cmtid
//@desc     DELETE a post
//@access   Private

router.delete('/comment/:id/:cmt_id', auth, async (req, res) => {

    try {
        post = await Post.findById(req.params.id);
        if(!post) {
            res.json({ msg: 'Post not Found'});
        }

        const removeIndex = post.comments.map(comment => {
            if (comment.user.toString() !== req.user.id){
                return res.json({ msg: 'User not authorized'});
            }
            return comment.id;
        }).indexOf(req.params.cmt_id);

        post.comments.splice(removeIndex, 1);
        await post.save();
        res.json(post.comments);
       
        
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectID'){
            return res.status(404).json({msg: 'Page not Found'});
        }
        res.status(500).json({ msg: "Server error"});
    }
})



//export the file
module.exports = router;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text:{
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type:String
    },
    //For the other users who likes the post
    likes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref:'users'
        },
    }],
    //For the other users who comment on the POST
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref:'users'
        },
        text: {
            type:String,
            required: true
        },
        name: {
            type: String
        },
        avatar: {
            type:String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    //For the post itself
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Post = mongoose.model('post', postSchema);
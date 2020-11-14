//mongoose communicate with mongoDB
const mongoose = require('mongoose');
//order of the element is not important
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// export: set User variable with mongoose.module( model name , schema name) to use schema
module.exports = User = mongoose.model('user', userSchema); 


const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURL');
//MongoURL must have the link from the second tab which included username:password of the db.
const connectDB = async () => {
    try{ 
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true 
        });
        
        console.log("connected!!!");
    } catch(error){
        console.error(error.message);
        //exit process with failure
        process.exit(1);
    }
} 

module.exports = connectDB;

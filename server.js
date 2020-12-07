const express = require('express');
const path = require('path');
const app = express();
const connectDB = require('./config/db');

//connect database

connectDB();
//to run: npm server run

//init Middleware => allow return req.body [use postman for testing -> choose content type, app/json 
//  -> raw session put in json data]
app.use(express.json({ extended: false }));


//Define Routes 
//Want to use require then we have to module.export = [name of file] the file
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

//Serve Static Asset in Production
if(process.env.Node_ENV === 'production'){
    //Set static Folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`));
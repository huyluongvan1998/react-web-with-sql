const express = require('express');

const app = express();
const connectDB = require('./config/db');

//connect database

connectDB();
//to run: npm server run

//init Middleware => allow return req.body [use postman for testing -> choose content type, app/json 
//  -> raw session put in json data]
app.use(express.json({ extended: false }));

//get route
app.get('/', (req, res) => res.send('API Running'));

//Define Routes 
//Want to use require then we have to module.export = [name of file] the file
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`));
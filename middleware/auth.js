const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    //GET token from the header (the jwt sign send the package with 3 part: header, payload, signature) 
    const token = req.header('x-auth-token');
    // require data from the user and then identify -> valid -> return true

    //check if there are no token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    //verify token
    try {
        //decoded token by using jwt package
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // set req.user with the user has decoded.
        req.user =  decoded.user;
        //go to the next middleware
        next();
    } catch(error) {
        //error return
        res.status(401).json({ msg: 'token is not valid ' });
    }
};

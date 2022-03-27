/* 
   This middleware will be our barrier between the protected methods to the public methods in this api, 
   Only authenticated can have access to the protected methods. 
*/
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
    try {
        // First we try to read the jwt token from the header
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN_HASH'
        if (!token) {
          throw new Error('Authentication faileddd!');
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.userData = { userId: decodedToken.userID, gameProfileID: decodedToken.gameProfileID};
        next();
    } catch (err) {
        const error = new HttpError('Authentication failed!', 403);
        return next(error);
    }
};

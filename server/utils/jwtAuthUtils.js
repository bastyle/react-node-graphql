const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * This module exports a function that verifies a JWT token from the request headers.
 * If the token is valid, it returns the decoded token.
 * If the token is not present or is invalid, it throws an error.
 */
module.exports = (req) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Unauthorized access');
    }
    const token = authHeader.split(' ')[1]; // Extract token after 'Bearer '
    try {
        return jwt.verify(token, process.env.JWT_SECRET); // Return the decoded token
    } catch (err) {
        throw new Error('Invalid token: '+ err.message);
    }
};
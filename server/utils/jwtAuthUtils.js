const jwt = require('jsonwebtoken');
require('dotenv').config();

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
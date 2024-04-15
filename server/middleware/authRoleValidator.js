
const jwt = require('jsonwebtoken');
const roleEnum = require("../enums/roleEnum");
require('dotenv').config();

module.exports = (requiredRole) => {
    return (req, res, next) => {
        console.log('role validator middleware');
        try {
            const token = req.headers.authorization.split(' ')[1]; // Extract token after 'Bearer '
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
            console.log('role::', decoded.profile);
            if (decoded.profile !== requiredRole) {
                return res.status(403).json({ message: 'Unauthorized access' });
            }
            next();
        } catch (err) {
            console.log("error validating JWT: ", err.message)
            return res.status(403).json({ message: 'Invalid token' });
        }
    };
};
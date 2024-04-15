const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();


// Create a new user
module.exports.addUser = async (req, res) => {
    try {
        console.log('adding user...');
        const user = await userModel.create(req.body);
        console.log('User created:', user);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user:' + error });
    }
}

// delete a user
module.exports.deleteUser = async (req, res) => {
    try {
        console.log('deleting user...')
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (user) {
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
}

// Get all users
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}
// Get all users by role
module.exports.getUsersByRole = async (req, res) => {
    try {
        const role = req.params.role;
        const users = await userModel.find({ role: role });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}


// Get user by ID
module.exports.getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}

module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('logging in...'+ username, password)
        const user = await userModel.findOne({ username });

        if(!user){
            return res.status(404).json({ message: 'User not found!' });
        }

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, profile: user.role, username }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, { maxAge: 3600000, httpOnly: true });

        // Return the token in the response
        res.status(201).json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging in' });
    }
}
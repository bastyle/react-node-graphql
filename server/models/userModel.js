const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },firstName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        default: uuidv4,
        unique: true
    },
    lastName: {
        type: String,
        required: true,
        default: 'No Last Name'
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
    role: {
        type: String,
        required: true,
        enum: ['nurse', 'patient']
    }
});

userSchema.pre('save', async function (next) {
    //if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    //}
    next();
});
module.exports = mongoose.model('User', userSchema);
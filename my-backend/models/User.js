// my-backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensures that usernames are unique
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures that emails are unique
    },
    password: {
        type: String,
        required: true,
    },
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;

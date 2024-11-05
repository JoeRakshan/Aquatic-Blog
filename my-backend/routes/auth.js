// my-backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Correct path to User model

const router = express.Router();

// Sign Up Route
router.post('/signup', async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Compare the hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful!', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

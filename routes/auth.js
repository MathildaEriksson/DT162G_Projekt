//Mathilda Eriksson, DT162G, HT23

const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Användaren hittades inte.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Ogiltigt lösenord.');

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h" 
    });

    res.header('Authorization', 'Bearer ' + token).send(token);
});

// Register new user
router.post('/register', async (req, res) => {
    // Check if email/user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).send('E-postadressen används redan.');

    // Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        // Save user in db
        await user.save();
        res.status(201).send('Användare skapad.');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
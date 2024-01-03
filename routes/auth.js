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

    res.header('auth-token', token).send(token);
});

module.exports = router;
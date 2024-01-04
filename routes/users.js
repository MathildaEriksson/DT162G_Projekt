//Mathilda Eriksson, DT162G, HT23

const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const verifyToken = require('../middleware/verifyToken');

// GET Show all users
router.get('/', verifyToken, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).send('Serverfel vid hämtning av användare.');
    }
});

module.exports = router;
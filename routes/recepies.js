//Mathilda Eriksson, DT162G, HT23

const express = require('express');
const router = express.Router();
const Recepie = require('../models/recepie.model');

// GET Show all recepies
router.get('/', async (req, res) => {
    try {
        const recepies = await Recepie.find();
        res.json(recepies);
    } catch (error) {
        res.status(500).send('Serverfel vid hämtning av recept.');
    }
});

module.exports = router;
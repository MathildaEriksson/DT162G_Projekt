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

// GET Show recepie with specific ID
router.get('/:id', async (req, res) => {
    try {
        const recepie = await Recepie.findById(req.params.id);
        if (!recepie) return res.status(404).send('Receptet hittades inte.');
        res.json(recepie);
    } catch (error) {
        res.status(500).send('Serverfel vid hämtning av recept.');
    }
});

// DELETE Delete recepie with specific ID
router.delete('/:id', async (req, res) => {
    try {
        const recepie = await Recepie.findByIdAndDelete(req.params.id);
        if (!recepie) return res.status(404).send('Receptet hittades inte.');
        res.send('Receptet har raderats.');
    } catch (error) {
        res.status(500).send('Serverfel vid radering av recept.');
    }
});

module.exports = router;
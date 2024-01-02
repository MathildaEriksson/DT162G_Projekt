//Mathilda Eriksson, DT162G, HT23

const express = require("express");
const router = express.Router();
const Recepie = require("../models/recepie.model");
const verifyToken = require('../middleware/verifyToken');

// GET Show all recepies
router.get("/", async (req, res) => {
  try {
    const recepies = await Recepie.find();
    res.json(recepies);
  } catch (error) {
    res.status(500).send("Serverfel vid hämtning av recept.");
  }
});

// GET Show recepie with specific ID
router.get("/:id", async (req, res) => {
  try {
    const recepie = await Recepie.findById(req.params.id);
    if (!recepie) return res.status(404).send("Receptet hittades inte.");
    res.json(recepie);
  } catch (error) {
    res.status(500).send("Serverfel vid hämtning av recept.");
  }
});

// DELETE Delete recepie with specific ID
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const recepie = await Recepie.findByIdAndDelete(req.params.id);
    if (!recepie) return res.status(404).send("Receptet hittades inte.");
    res.send("Receptet har raderats.");
  } catch (error) {
    res.status(500).send("Serverfel vid radering av recept.");
  }
});

// POST Add recepie
router.post("/", verifyToken, async (req, res) => {
  // Creates a new recepie object with data from request body
  const newRecepie = new Recepie({
    name: req.body.name,
    category: req.body.category,
    ingredients: req.body.ingredients, // Should be an array of objects with name, amount and unit
    instructions: req.body.instructions, // Should be an array of strings
    image: req.body.image,
    createdBy: req.user._id,
  });

  try {
    // Saves recepie in db
    const savedRecepie = await newRecepie.save();
    res.status(201).json(savedRecepie);
  } catch (error) {
    res.status(500).send("Serverfel vid skapande av recept.");
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const recepie = await Recepie.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        category: req.body.category,
        ingredients: req.body.ingredients, // Should be an array of objects with name, amount and unit
        instructions: req.body.instructions, // Should be an array of strings
        image: req.body.image,
        createdBy: req.user._id,
      },
      { new: true, runValidators: true } // new: true returnerar det uppdaterade dokumentet, runValidators: true ser till att Mongoose valideringar körs vid uppdatering
    );

    if (!recepie) {
      return res.status(404).send("Receptet hittades inte.");
    }

    res.json(recepie);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).send("Valideringsfel: " + error.message);
    } else {
      res.status(500).send("Serverfel vid uppdatering av recept.");
    }
  }
});

module.exports = router;
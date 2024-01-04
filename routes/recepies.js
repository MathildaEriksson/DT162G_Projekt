//Mathilda Eriksson, DT162G, HT23

const express = require("express");
const router = express.Router();
const Recepie = require("../models/recepie.model");
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// GET Show all recepies
router.get("/", async (req, res) => {
  try {
    const recepies = await Recepie.find().populate("createdBy", "name");
    res.json(recepies);
  } catch (error) {
    res.status(500).send("Serverfel vid hämtning av recept.");
  }
});

// GET search recepie (only name)
router.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.name; // Get search-term from query-parameter 'name'

    if (!searchQuery) {
      return res.status(400).send("Ange ett sökord.");
    }

    // Use regex to search without case sensitivity
    const regex = new RegExp(searchQuery, "i");
    const recepies = await Recepie.find({ name: { $regex: regex } }).populate(
      "createdBy",
      "name"
    );

    if (recepies.length === 0) {
      return res
        .status(404)
        .send("Inga recept hittades med det angivna namnet.");
    }

    res.json(recepies);
  } catch (error) {
    res.status(500).send("Serverfel vid sökning av recept: " + error.message);
  }
});

// GET logged in users recepies
router.get("/myrecepies", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id; // Get user-ID from JWT
    const recepies = await Recepie.find({ createdBy: userId }).populate(
      "createdBy",
      "name"
    ); // Find recepies by user

    if (recepies.length == 0) {
      // If user has no recepies, send custom message
      return res.status(404).send("Du har inga recept än.");
    }
    res.json(recepies);
  } catch (error) {
    res.status(500).send("Serverfel vid hämtning av användarens recept.");
  }
});

// GET Show recepie with specific ID
router.get("/:id", async (req, res) => {
  try {
    const recepie = await Recepie.findById(req.params.id).populate(
      "createdBy",
      "name"
    );
    if (!recepie) return res.status(404).send("Receptet hittades inte.");
    res.json(recepie);
  } catch (error) {
    res.status(500).send("Serverfel vid hämtning av recept.");
  }
});

// DELETE Delete recepie with specific ID
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const recepie = await Recepie.findById(req.params.id);

    if (!recepie) {
      return res.status(404).send("Receptet hittades inte.");
    }

    //Check if logged in user is the creator of the recepie
    if (recepie.createdBy.toString() !== req.user._id) {
      return res
        .status(403)
        .send("Åtkomst nekad. Du kan endast ta bort recept du själv skapat.");
    }

    await Recepie.findByIdAndDelete(req.params.id);
    res.send("Receptet har raderats.");
  } catch (error) {
    res.status(500).send("Serverfel vid radering av recept.");
  }
});

// POST Add recepie
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  let imagePath = "";
  if (req.file) {
    imagePath = req.file.path;
  }

  // Convert ingredients from string to object
  let ingredients = req.body.ingredients;
  if (typeof ingredients === "string") {
    ingredients = JSON.parse(ingredients);
  }

  const newRecepie = new Recepie({
    name: req.body.name,
    category: req.body.category,
    ingredients: ingredients, // Should be an array of objects with name, amount and unit
    instructions: req.body.instructions, // Should be an array of strings
    image: imagePath,
    createdBy: req.user._id,
  });

  try {
    // Saves recepie in db
    const savedRecepie = await newRecepie.save();
    res.status(201).json(savedRecepie);
  } catch (error) {
    // If something goes wrong, remove uploaded file
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Fel vid borttagning av fil: ", err);
      });
    }
    res.status(500).send("Serverfel vid skapande av recept.");
  }
});

// PUT update recipe with specific ID
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const recepieToUpdate = await Recepie.findById(req.params.id);
    if (!recepieToUpdate) {
      return res.status(404).send("Receptet hittades inte.");
    }

    //Check if logged in user is the creator of the recepie
    if (recepieToUpdate.createdBy.toString() !== req.user._id) {
      return res
        .status(403)
        .send("Åtkomst nekad. Du kan endast redigera recept du själv skapat.");
    }

    // Convert ingredients from string to object
    let ingredients = req.body.ingredients;
    if (typeof ingredients === "string") {
      ingredients = JSON.parse(ingredients);
    }

    let imagePath = recepieToUpdate.image; // Keep current image as standard

    // If a new image is uploaded, uppdate path and remove old image
    if (req.file) {
      imagePath = req.file.path;

      // Remove old image if it exists
      if (recepieToUpdate.image) {
        fs.unlink(path.join(__dirname, "..", recepieToUpdate.image), (err) => {
          if (err) console.error("Fel vid borttagning av gammal bild: ", err);
        });
      }
    }

    // Update recepie
    const updatedRecepie = await Recepie.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        category: req.body.category,
        ingredients: ingredients,
        instructions: req.body.instructions,
        image: imagePath
      },
      { new: true, runValidators: true }
    );

    res.json(updatedRecepie);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).send("Valideringsfel: " + error.message);
    } else {
      res
        .status(500)
        .send("Serverfel vid uppdatering av recept: " + error.message);
    }
  }
});

module.exports = router;

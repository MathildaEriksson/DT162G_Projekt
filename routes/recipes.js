//Mathilda Eriksson, DT162G, HT23

const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe.model");
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

// GET Show all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("createdBy", "name");
    res.json(recipes);
  } catch (error) {
    res.status(500).send("Serverfel vid hämtning av recept.");
  }
});

// GET search recipe (only name)
router.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.name; // Get search-term from query-parameter 'name'

    if (!searchQuery) {
      return res.status(400).send("Ange ett sökord.");
    }

    // Use regex to search without case sensitivity
    const regex = new RegExp(searchQuery, "i");
    const recipes = await Recipe.find({ name: { $regex: regex } }).populate(
      "createdBy",
      "name"
    );

    if (recipes.length === 0) {
      return res
        .status(404)
        .send("Inga recept hittades med det angivna namnet.");
    }

    res.json(recipes);
  } catch (error) {
    res.status(500).send("Serverfel vid sökning av recept: " + error.message);
  }
});

// GET logged in users recipes
router.get("/myrecipes", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const recipes = await Recipe.find({ createdBy: userId }).populate(
      "createdBy",
      "name"
    );

    res.json(recipes);
  } catch (error) {
    res.status(500).send("Serverfel vid hämtning av användarens recept.");
  }
});

// GET Show recipe with specific ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "createdBy",
      "name"
    );
    if (!recipe) return res.status(404).send("Receptet hittades inte.");
    res.json(recipe);
  } catch (error) {
    res.status(500).send("Serverfel vid hämtning av recept.");
  }
});

// DELETE Delete recipe with specific ID
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).send("Receptet hittades inte.");
    }

    // Check if logged-in user is the creator of the recipe
    if (recipe.createdBy.toString() !== req.user._id) {
      return res
        .status(403)
        .send("Åtkomst nekad. Du kan endast ta bort recept du själv skapat.");
    }

    // Check if recipe has an image and delete it
    if (recipe.image) {
      const imagePath = path.join(__dirname, "../uploads", recipe.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image file:", err);
        }
      });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.send("Receptet har raderats.");
  } catch (error) {
    res.status(500).send("Serverfel vid radering av recept.");
  }
});

// POST Add recipe
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  let imagePath = "";
  if (req.file) {
    imagePath = req.file.filename;
  }

  // Convert ingredients from string to object
  let ingredients = req.body.ingredients;
  if (typeof ingredients === "string") {
    ingredients = JSON.parse(ingredients);
  }

  // Convert instructions back to an array
  let instructions = [];
  if (typeof req.body.instructions === "string") {
    instructions = JSON.parse(req.body.instructions);
  }

  const newRecipe = new Recipe({
    name: req.body.name,
    category: req.body.category,
    ingredients: ingredients, // Should be an array of objects with name, amount and unit
    instructions: instructions, // Should be an array of strings
    image: imagePath,
    createdBy: req.user._id,
  });

  try {
    // Saves recipe in db
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    // If something goes wrong, remove uploaded file
    if (req.file) {
      fs.unlink(req.file.filepath, (err) => {
        if (err) console.error("Fel vid borttagning av fil: ", err);
      });
    }
    res.status(500).send("Serverfel vid skapande av recept." + error.message);
  }
});

// PUT update recipe with specific ID
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const recipeToUpdate = await Recipe.findById(req.params.id);
    if (!recipeToUpdate) {
      return res.status(404).send("Receptet hittades inte.");
    }

    //Check if logged in user is the creator of the recipe
    if (recipeToUpdate.createdBy.toString() !== req.user._id) {
      return res
        .status(403)
        .send("Åtkomst nekad. Du kan endast redigera recept du själv skapat.");
    }

    // Convert ingredients from string to object
    let ingredients = req.body.ingredients;
    if (typeof ingredients === "string") {
      ingredients = JSON.parse(ingredients);
    }

    // Convert instructions back to an array
    let instructions = [];
    if (typeof req.body.instructions === "string") {
      instructions = JSON.parse(req.body.instructions);
    }

    let imagePath = recipeToUpdate.image; // Keep current image as standard

    // If a new image is uploaded, uppdate path and remove old image
    if (req.file) {
      imagePath = req.file.filename;

      // Remove old image if it exists
      if (recipeToUpdate.image) {
        fs.unlink(path.join(__dirname, "..", recipeToUpdate.image), (err) => {
          if (err) console.error("Fel vid borttagning av gammal bild: ", err);
        });
      }
    }

    // Update recipe
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        category: req.body.category,
        ingredients: ingredients,
        instructions: instructions,
        image: imagePath,
      },
      { new: true, runValidators: true }
    );

    res.json(updatedRecipe);
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

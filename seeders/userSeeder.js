//Mathilda Eriksson, DT162G, HT23
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const saltRounds = 10;

// Connect to mongoDB
mongoose
  .connect("mongodb://localhost/recepieVaultDB")
  .then(() => console.log("Ansluten till MongoDB för seedning av användare."))
  .catch((err) => console.error("Kunde inte ansluta till MongoDB.", err));

// Userdata to seed
const users = [
  {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  },
];

// Create users
const seedUsers = async () => {
  try {
    for (let user of users) {
      const createdUser = await User.create(user);
      console.log("Skapad användare:", createdUser.email); // Show created users e-mail
    }

    console.log("Användare seedade i databasen.");
  } catch (err) {
    console.error("Fel vid seedning av användare:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedUsers();
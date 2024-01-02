//Mathilda Eriksson, DT162G, HT23
const User = require("../models/user.model");
let createdUserId;

// Userdata to seed
const users = [
  {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  },
];

// Create user
const seedUsers = async () => {
  try {
    for (let user of users) {
      const createdUser = await User.create(user);
      console.log("Skapad användare:", createdUser.email); // Show created users e-mail
      if (!createdUserId) createdUserId = createdUser._id;
    }

    console.log("Användare seedade i databasen.");
    return createdUserId;
  } catch (err) {
    console.error("Fel vid seedning av användare:", err);
  } 
};

module.exports = seedUsers;
//Mathilda Eriksson, DT162G, HT23
const seedUsers = require('./userSeeder');
const seedRecepies = require('./recepieSeeder');
const mongoose = require("mongoose");

// Connect to mongoDB
mongoose
  .connect("mongodb://localhost/recepieVaultDB")
  .then(() => console.log("Ansluten till MongoDB för seedning av recept."))
  .catch((err) => console.error("Kunde inte ansluta till MongoDB.", err));

  const seedDatabase = async () => {
    try {
      const createdUserId = await seedUsers();
      await seedRecepies(createdUserId);
    } catch (err) {
      console.error("Fel vid seedning av databasen:", err);
    } finally {
      mongoose.connection.close();
    }
  };

seedDatabase();
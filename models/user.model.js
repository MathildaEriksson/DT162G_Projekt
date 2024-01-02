//Mathilda Eriksson, DT162G, HT23
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Ange en giltig e-postadress"],
  },
  password: {
    type: String,
    required: true,
  },
});

// Pre-save hook for passhword hash
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
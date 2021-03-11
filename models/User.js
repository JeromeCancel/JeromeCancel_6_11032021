// VARIABLES FOR REQUIEREMENTS //
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// LOGIC FOR USERS SCHEMA //
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

// EXPORT USERS SCHEMA //
module.exports = mongoose.model('User', userSchema);
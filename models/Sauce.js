// VARIABLES FOR REQUIEREMENTS //
const mongoose = require('mongoose');

// LOGIC FOR SAUCE SCHEMA //
const sauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
  userId: { type: String, required: true },
});

// EXPORT SAUCE SCHEMA //
module.exports = mongoose.model('Sauce', sauceSchema);
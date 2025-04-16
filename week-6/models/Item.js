const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  details: String,
  image: String,
});

module.exports = mongoose.model("Item", ItemSchema);

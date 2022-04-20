const mongoose = require("mongoose");
const { Schema } = mongoose; // teknik der trækker et objekt ud af et andet objekt...

const beerModel = new Schema({
  name: { type: String },
  year: { type: Number },
  image: { type: String },
  strength: { type: Number },
  type: { type: String },
  color: { type: String }
});

module.exports = mongoose.model("Beer", beerModel);
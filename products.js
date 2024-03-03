import mongoose from "mongoose";

const ProdcutSchema = mongoose.Schema({
  title: String,
  imgURL: String,
  price: Number,
  rating: Number,
});
module.exports = mongoose.model("products", ProdcutSchema);

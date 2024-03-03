import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  title: String,
  imgURL: String,
  price: Number,
  rating: Number,
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;

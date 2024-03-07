import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  title: String,
  imgURL: String,
  price: Number,
  rating: Number,
  category: {
    type: mongoose.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;

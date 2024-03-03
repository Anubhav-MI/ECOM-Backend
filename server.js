import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
// import ProductSchema from "./products";

const app = express();
const port = 3001;

const ProductSchema = mongoose.Schema({
  title: String,
  imgURL: String,
  price: Number,
  rating: Number,
});
const Product = mongoose.model("products", ProductSchema);

mongoose.connect(
  // "mongodb+srv://anubhavmi:test123@cluster0.telzkjw.mongodb.net/Test"
  "mongodb+srv://anubhavmi:test123@cluster0.telzkjw.mongodb.net/ECOM"
);
app.use(bodyParser.json());
app.use(cors());

app.get("/products/get", (req, res) => {
  Product.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/products/add", (req, res) => {
  const ProductDetails = req.body;
  // console.log(ProductDetails);
  const newproduct = new Product(ProductDetails);
  newproduct.save();
  res.status(200).send("Received");
  console.log("Received data", newproduct);
});

app.listen(port, () => {
  console.log("server running on port", { port });
});

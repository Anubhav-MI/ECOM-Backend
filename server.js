import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import Products from "./product.js";
import User from "./user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
const port = 3001;

mongoose.connect(
  "mongodb+srv://anubhavmi:test123@cluster0.telzkjw.mongodb.net/ECOM"
);
app.use(bodyParser.json());
app.use(cors());

app.get("/products/get", (req, res) => {
  Products.find()
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
  const newproduct = new Products(ProductDetails);
  newproduct.save();
  res.status(200).send("Received");
  console.log("Received data", newproduct);
});

app.post("/register", async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password } = req.body;
    // if (!(name && email && password)) {
    //   res.status(400).send("All fields are compulsory");
    // }
    // const existinguser = await User.findOne({ email });
    // if (existinguser) {
    //   res.status(400).send("User already exists");
    // }
    const encrptpassword = await bcrypt.hash(password, 10);
    const newuser = new User({
      name,
      email,
      password: encrptpassword,
    });
    const token = jwt.sign({ id: newuser._id, email }, "shhhh", {
      expiresIn: "2h",
    });
    newuser.token = token;
    newuser.save();
    res.status(200).send("User registered successfully");
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All fields are compulsory");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id, email }, "shhhh", {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    } else {
      res.status(400).send("Wrong credentials");
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log("server running on port", { port });
});

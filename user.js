import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  token: String,
});

const User = mongoose.model("User", ProductSchema);

export default User;

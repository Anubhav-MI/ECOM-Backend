import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
  Category: { type: String, unique: true },
});
export default Catgeory = mongoose.model("Category", CategorySchema);

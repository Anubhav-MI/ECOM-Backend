import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
  Category: { name: { type: String, unique: true, required: true } },
});
export default Catgeory = mongoose.model("Category", CategorySchema);

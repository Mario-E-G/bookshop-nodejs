const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
  image_url: {
    type: String,
    default: "http://localhost:5000/images/default-image.jpg",
  },
});
const categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;

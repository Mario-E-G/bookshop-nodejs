const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 100 },
    image_url: { type: String, default: "../assets/default-image.jpg" },
});
const categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;
const mongoose = require("mongoose");


const categorySchema = mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 100 },
});
const categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;
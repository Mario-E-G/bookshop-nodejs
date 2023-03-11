const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  first_name: {
    type: String,
    minLength: 3,
    maxLength: 25,
    required: [true, "First name is required"],
  },
  last_name: {
    type: String,
    minLength: 3,
    maxLength: 25,
    required: [true, "last name is required"],
  },
  image_url: { type: String, default: "../assets/user-defualt.avif" },
  date_of_birth: { type: Date },
  author_info: { type: String },
});

const authorModel = mongoose.model("author", authorSchema);
module.exports = authorModel;

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
  image_url: {
    type: String,
    default: `http://localhost:5000/images/user-defualt.png`,
  },
  date_of_birth: { type: Date, default: "" },
  author_info: { type: String, default: "" },
});

const authorModel = mongoose.model("author", authorSchema);
module.exports = authorModel;

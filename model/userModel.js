const mongoose = require("mongoose");
const emailFormat =
  /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const passwdFormat = /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const userSchema = mongoose.Schema({
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
    required: [true, "Last name is required"],
  },
  // age: { type: Number, required: [true, "Age is Required"] },
  email: {
    type: String,
    minLength: 3,
    required: [true, "E-mail is required"],
    unique: [true, "E-mail must be unique"],
    // match: emailFormat,
  },
  gender: { type: String, enum: ["male", "female", ""], default: "" },
  birth_date: { type: Date },
  address: { type: String },
  image_url: {
    type: String,
    default: `http://localhost:5000/images/user-defualt.png`,
  },
  password: {
    type: String,
    minlength: 8,
    // match: passwdFormat,
    required: [true, "Password is required"],
  },
  is_admin: { type: Boolean, default: false },
  token: { type: String },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;

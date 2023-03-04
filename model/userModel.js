const mongoose = require("mongoose");
const emailFormat = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const passwdFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const userSchema = mongoose.Schema({
    first_name: { type: String, minLength: 3, maxLength: 25, required: [true, "First name is required"] },
    last_name: { type: String, minLength: 3, maxLength: 25, required: [true, "Last name is required"] },
    age: { type: Number, required: [true, "Age is Required"] },
    email: {
        type: String,
        minLength: 3,
        required: [true, "E-mail is required"],
        unique: [true, "E-mail must be unique"],
        match: emailFormat,
    },
    image_url: { type: String },
    password: {
        type: String,
        minlength: 8,
        match: passwdFormat,
        required: [true, "Password is Required"],
    },
    // book_status: {
    //     type: String,
    //     enum: ['Read', 'currently reading', "Want to read"],
    //     default: "new"
    // },
    is_admin: { type: Boolean, default: false },
    token: { type: String, required: [true, "Token is required"] },

})

module.exports = mongoose.model("user", userSchema);
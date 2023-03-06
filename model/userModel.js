const mongoose = require("mongoose");
const emailFormat = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const passwdFormat = /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

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
    gender: { type: String },
    birth_date: { type: Date },
    address: { type: String },
    image_url: { type: String, default: `../assets/user-defualt.avif` },
    password: {
        type: String,
        minlength: 8,
        match: passwdFormat,
        required: [true, "Password is required"],
    },
    is_admin: { type: Boolean, default: false },
    token: { type: String, required: [true, "Token is required"] },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;


// book_review: [{
//     book_id: { type: mongoose.Schema.Types.ObjectId, ref: "book", required: [true, "Book id is required"] },
//     rate: { type: Number, default: 0 },
//     review: { type: String, default: null },
//     state: { type: String, enum: ['New', 'Read', 'currently reading', "Want to read"], default: "New" },
//     _id: { _id: false }
// }],
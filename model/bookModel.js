const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    name: { type: String, minLength: 3, maxLength: 40, requierd: [true, "Book name is required"] },
    image_url: { type: String },
    book_description: { type: String, requierd: [true, "Book description is required"] },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: [true, "Category id is required"] },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "author", required: [true, "Author id is required"] },
});

const bookModel = mongoose.model("book", bookSchema);
module.exports = bookModel;
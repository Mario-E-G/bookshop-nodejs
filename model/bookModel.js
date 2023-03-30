const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 40,
    requierd: [true, "Book name is required"],
  },
  image_url: {
    type: String,
    default: "http://localhost:5000/images/default-image.jpg",
  },
  book_description: {
    type: String,
    requierd: [true, "Book description is required"],
  },
  price: { type: Number, default: 0 },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: [true, "Category id is required"],
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
    required: [true, "Author id is required"],
  },
});

const bookModel = mongoose.model("book", bookSchema);
module.exports = bookModel;

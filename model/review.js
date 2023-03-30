const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "user id is required"],
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
    required: [true, "book id is required"],
  },
  // date: { type: Date, default: Date.UTC },
  review: { type: String, default: "" },
});

const reviewModel = mongoose.model("review", reviewSchema);
module.exports = reviewModel;

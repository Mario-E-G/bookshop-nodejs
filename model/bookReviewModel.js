const mongoose = require("mongoose");

const bookReviewSchema = mongoose.Schema({
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: "book", required: [true, "book id is required"] },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: [true, "user id is required"] },
    rate: { type: Number, default: 0 },
    review: { type: String, default: null },
    book_status: { type: String, enum: ['New','Read', 'Currently reading', "Want to read"], default: "New" },
});


const bookReviewModel = mongoose.model("bookReview", bookReviewSchema);
module.exports = bookReviewModel;
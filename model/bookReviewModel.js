const mongoose = require("mongoose");

const bookReviewSchema = mongoose.Schema({
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: "book", required: [true, "book id is required"] },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: [true, "user id is required"] },
    rate: { type: Number, default: 0 },
    average_rate: { type: Number, default: 0 },
    review: { type: String, default: null },
    book_status: { type: String, enum: ['new', 'read', 'currently reading', "want to read"], default: "new" },
});


const bookReviewModel = mongoose.model("bookReview", bookReviewSchema);
module.exports = bookReviewModel;
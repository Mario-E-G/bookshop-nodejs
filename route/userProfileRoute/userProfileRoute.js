const express = require("express");
const {
  //   userProfile,
  getBookReview,
  getFilterdBookReview,
  addBookReview,
  updateBookReview,
  addReviewText,
  // bookreview,
  getBookRate,
  deleteReviewText,
  updateReviewText,
} = require("../../controller/userProfile/userProfile");
const loginAuth = require("../../middleware/middlewareLoginAuth");
const router = express.Router();

// router.get('/profile', loginAuth, userProfile);
router.get("/bookreview/:id", getBookReview);
router.get("/bookreview/rate/:book_id/:user_id", getBookRate);
//------------------use query string to filter book status for specific user ------------------------------------
router.get("/profile/:id", loginAuth, getFilterdBookReview);
//==------------------------------------------------------------------------------------------==
router.post("/profile/bookreview", loginAuth, addBookReview);
router.patch("/profile/bookReview/:id", loginAuth, updateBookReview);
router.post("/profile/bookreview/review/:book_id/:user_id", loginAuth, addReviewText);
router.delete("/profile/bookreview/review/:review_id", loginAuth, deleteReviewText);
router.patch("/profile/bookreview/review/:review_id", loginAuth, updateReviewText);

// router.get("/bookreview", loginAuth, bookreview);

module.exports = router;

const express = require("express");
const {
  //   userProfile,
  // getBookReview,
  getFilterdBookReview,
  addBookReview,
  updateBookReview,
} = require("../../controller/userProfile/userProfile");
const loginAuth = require("../../middleware/middlewareLoginAuth");
const router = express.Router();

// router.get('/profile', loginAuth, userProfile);
// router.get('/profile/bookreview', loginAuth, getBookReview);

//------------------use query string to filter book status for specific user ------------------------------------
router.get("/profile/:id", loginAuth, getFilterdBookReview);
//==------------------------------------------------------------------------------------------==
router.post("/profile/bookreview", loginAuth, addBookReview);
router.patch("/profile/bookReview", loginAuth, updateBookReview);

module.exports = router;

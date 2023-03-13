const express = require("express");
const upload = require("../../middleware/multer");
const {
  getAllBooksForUsers,
  getBookById,
  getAllCategory,
  getAuthorById,
  getBookByCategoryId,
  getAllAuthor,
} = require("../../controller/forAllUsersController/defaultRoute");
const { loginAuth } = require("../../controller/auth/logInAuth");
const { registerAuth } = require("../../controller/auth/registerAuth");
const router = express.Router();

//=============Register==========================================
router.post("/register", upload.single("image"), registerAuth);

//=============Login===========================================
router.post("/login", loginAuth);

//=========getAllBooks===============================================
router.get("/book", getAllBooksForUsers);

//====================getABookById=================================
router.get("/book/:id", getBookById);

//=========getAllCategories==========================================
router.get("/category", getAllCategory);

//====================getBookCategoryById ===============================
router.get("/category/:id", getBookByCategoryId);

//====================getAuthortById ================================
router.get("/author/:id", getAuthorById);

//=========getAllAuthors==========================================
router.get("/author", getAllAuthor);

module.exports = router;

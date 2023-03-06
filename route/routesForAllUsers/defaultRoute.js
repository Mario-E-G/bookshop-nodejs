const express = require("express");
const {
    getAllBooksForUsers,
    getBookById,
    getAllCategory,
    getAuthorById,
    getBookByCategoryId,
    getAllAuthor } = require("../../controller/forAllUsersController/defaultRoute");
const { auth } = require("../../controller/auth/logInAuth");
const router = express.Router();



//=============Login===========================================
router.post("/login", auth);

//=========getAllBooks===============================================
router.get("/book", getAllBooksForUsers);

//====================getABookById ================================
router.get('/book/:id', getBookById);

//=========getAllCategories==========================================
router.get("/category", getAllCategory);

//====================getBookCategoryById ===============================
router.get('/category/:id', getBookByCategoryId);

//====================getAuthortById ================================
router.get('/author/:id', getAuthorById);

//=========getAllAuthors==========================================
router.get("/author", getAllAuthor);


module.exports = router;
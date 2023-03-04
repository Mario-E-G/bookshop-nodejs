const express = require("express");
const {
    adminHomeRoute,
    adminAddNewCategory,
    adminGetAllCategory,
    adminGetAllBook,
    adminGetallAuthor,
    adminAddNewBook,
    adminAddNewAuthor,
    adminUpdateCategory,
    adminUpdateBook,
    adminUpdateAuthor,
    adminDeleteCategory,
    adminDeleteBook,
    adminDeleteAuthor,
    adminGetCategoryById,
    adminGetBookById,
    adminGetAuthorById } = require("../../controller/adminController/adminProfileRoute");
const router = express.Router();


//admin-profile
router.get("/", adminHomeRoute);


//get-all
router.get("/category", adminGetAllCategory);
router.get("/book", adminGetAllBook);
router.get("/author", adminGetallAuthor);


//add-new(category-book-author)
router.get("/category/:id", adminGetCategoryById);
router.get("/book/:id", adminGetBookById);
router.get("/author/:id", adminGetAuthorById);


//add-new(category-book-author)
router.post("/category", adminAddNewCategory);
router.post("/book", adminAddNewBook);
router.post("/author", adminAddNewAuthor);


//update(category-book-author)
router.patch("/category/:id", adminUpdateCategory);
router.patch("/book/:id", adminUpdateBook);
router.patch("/author/:id", adminUpdateAuthor);


//delete(category-book-author)
router.delete("/category/:id", adminDeleteCategory);
router.delete("/book/:id", adminDeleteBook);
router.delete("/author/:id", adminDeleteAuthor);

module.exports = router;

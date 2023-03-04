const express = require("express");
const {
    adminHomeRoute,
    adminAddNewCategory,
    adminGetAllCategory,
    adminGetAllBook,
    adminGetallAuthor,
    adminAddNewBook,
    adminAddNewAuthor } = require("../../controller/adminController/adminProfileRoute");
const router = express.Router();


//admin-profile
router.get("/", adminHomeRoute);

//get-all
router.get("/category", adminGetAllCategory);
router.get("/book", adminGetAllBook);
router.get("/author", adminGetallAuthor);

//add-new(category-book-author)
router.post("/category", adminAddNewCategory);
router.post("/book", adminAddNewBook);
router.post("/author", adminAddNewAuthor);






module.exports = router;

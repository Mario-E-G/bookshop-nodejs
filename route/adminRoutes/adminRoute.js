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
  adminGetAuthorById,
} = require("../../controller/adminController/adminProfileRoute");
const upload = require("../../middleware/multer");
const router = express.Router();

//admin-profile
router.get("/", adminHomeRoute);

//get-all
router.get("/category", adminGetAllCategory);
router.get("/book", adminGetAllBook);
router.get("/author", adminGetallAuthor);

//get-by-id-new(category-book-author)
router.get("/category/:id", adminGetCategoryById);
router.get("/book/:id", adminGetBookById);
router.get("/author/:id", adminGetAuthorById);

//add-new(category-book-author)
router.post("/category", upload.single("image_url"), adminAddNewCategory);
router.post("/book", upload.single("image_url"), adminAddNewBook);
router.post("/author", upload.single("image_url"), adminAddNewAuthor);

//update(category-book-author)
router.patch("/category/:id", upload.single("image_url"), adminUpdateCategory);
router.patch("/book/:id", upload.single("image_url"), adminUpdateBook);
router.patch("/author/:id", upload.single("image_url"), adminUpdateAuthor);

//delete(category-book-author)
router.delete("/category/:id", adminDeleteCategory);
router.delete("/book/:id", adminDeleteBook);
router.delete("/author/:id", adminDeleteAuthor);

module.exports = router;

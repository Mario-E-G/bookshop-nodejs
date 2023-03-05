const express = require("express");
const { GetAllBooksForUsers, getAllCategory, getCategorybyid } = require("../../controller/defaultController/defaultRoute");
const router = express.Router();

//=========get all books==================
router.get("/book", GetAllBooksForUsers);

//=========get all categories==================
router.get("/category", getAllCategory);

//====================getcatbyid ===============================
router.get('/category/:id', getCategorybyid);



module.exports = router;
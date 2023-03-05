const express = require("express");
const { GetAllBooksForUsers } = require("../../controller/defaultController/defaultRoute");
const router = express.Router();


router.get("/book", GetAllBooksForUsers);

module.exports = router;
const express = require("express");
const router = express.Router()
const { auth } = require("../../controller/auth/logInAuth");

router.post("/", auth);

module.exports = router;


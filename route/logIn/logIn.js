const express = require("express");
const router = express.Router()
const { loginAuth } = require("../../controller/auth/logInAuth");

router.post("/", loginAuth);

module.exports = router;


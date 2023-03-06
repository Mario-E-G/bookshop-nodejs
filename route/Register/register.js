const express = require("express");
const router = express.Router();
const { registerAuth } = require("../../controller/auth/registerAuth");

router.post("/register", registerAuth);

module.exports = router;

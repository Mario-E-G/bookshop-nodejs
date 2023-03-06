const express = require("express");
const { userProfile } = require("../../controller/userProfile/userProfile");
const loginAuth = require("../../middleware/middlewareLoginAuth");
const router = express.Router();


router.get("/profile", loginAuth, userProfile);

module.exports = router;
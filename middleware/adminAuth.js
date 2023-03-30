const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
ADMIN_TOKEN_KEY = process.env.ADMIN_TOKEN_KEY;

const adminAuth = async function (req, res, next) {
  const token = req.headers["access-token"];
  if (!token) {
    return res
      .status(403)
      .send({ Message: "A Token Is Required For Authentication" });
  }
  const decoded = jwt.verify(token, ADMIN_TOKEN_KEY);
  // console.log("admin:  "+decoded.is_admin);
  // const user = await userModel.findById(decoded.user_id );
  // console.log(user);
  // const user = await userModel.findOne({ email });
  // const comparePasswords = await bcrypt.compare(password, user.password);
  if (decoded.is_admin) {
    const user = jwt.verify(token, ADMIN_TOKEN_KEY);
    req.user = user;
    return next();
  } else {
    return res.status(404).send({ Message: "Sorry Only Admin Can Access." });
  }
};

module.exports = adminAuth;

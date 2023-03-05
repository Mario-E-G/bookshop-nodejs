const jwt = require("jsonwebtoken");
// const {model}=require('mongoose');
// const mongoose= require("mongoose")
const TOKEN_KEY = process.env.TOKEN_KEY

const loginAuth = function (req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const user = jwt.verify(token, TOKEN_KEY);
    req.user = user;
    console.log("kkkkk")
    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

};

module.exports = loginAuth

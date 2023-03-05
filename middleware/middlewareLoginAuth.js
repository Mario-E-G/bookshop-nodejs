const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const ADMIN_TOKEN_KEY = process.env.ADMIN_TOKEN_KEY
const USER_TOKEN_KEY = process.env.USER_TOKEN_KEY


const loginAuth = async function (req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const { email, password } = req.body;
    const retrievingUser = await userModel.findOne({ email });
    console.log(retrievingUser.is_admin)
    if (retrievingUser.is_admin) {
      const user = jwt.verify(token, ADMIN_TOKEN_KEY);
      req.user = user;
      return next();
    } else {
      const user = jwt.verify(token, USER_TOKEN_KEY);
      req.user = user;
      return next();
    }

  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

};

module.exports = loginAuth

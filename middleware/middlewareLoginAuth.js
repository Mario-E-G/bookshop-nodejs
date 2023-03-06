const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const ADMIN_TOKEN_KEY = process.env.ADMIN_TOKEN_KEY
const USER_TOKEN_KEY = process.env.USER_TOKEN_KEY


const loginAuth = async function (req, res, next) {
  const token = req.headers["access-token"];

  if (!token) {
    return res.status(403).send({ Message: "A Token Is Required For Authentication" });
  }
  try {
    const { email, password } = req.body;
    const retrievingUser = await userModel.findOne({ email });

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
    return res.status(401).send({ Message: "Invalid Token" });
  }
};

module.exports = loginAuth

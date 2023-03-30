const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const ADMIN_TOKEN_KEY = process.env.ADMIN_TOKEN_KEY;
const USER_TOKEN_KEY = process.env.USER_TOKEN_KEY;

const loginAuth = async function (req, res, next) {
  const token = req.headers["access-token"];
  if (!token) {
    return res
      .status(403)
      .send({ Message: "A Token Is Required For Authentication" });
  }
  try {
    // const { email, password } = req.body;
    // console.log(email);
    // const retrievingUser = await userModel.findOne({ email });
    // console.log(retrievingUser);
    // const comparePasswords = await bcrypt.compare(
    //   password,
    //   retrievingUser.password
    // );
    // console.log(comparePasswords);

    const decoded = jwt.verify(token, USER_TOKEN_KEY);
    const user = await userModel.findById(decoded.user_id);

    if (!user.is_admin) {
      req.user = user;
      return next();
    } else {
      return res.status(400).send({ Message: "Wrong password possibility" });
    }
  } catch (err) {
    return res.status(401).send({ Message: "Invalid Token" });
  }
};

module.exports = loginAuth;

const userModel = require("../model/userModel");

const adminAuth = async function (req, res, next) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  const comparePasswords = await bcrypt.compare(password, user.password);
  if (user.is_admin && comparePasswords) {
    const user = jwt.verify(token, ADMIN_TOKEN_KEY);
    req.user = user;
    return next();
  } else {
    return res.status(404).send({ Message: "Sorry Only Admin Can Access." });
  }
};

module.exports = adminAuth;

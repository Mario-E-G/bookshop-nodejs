const jwt = require("jsonwebtoken");
const ADMIN_TOKEN_KEY = process.env.ADMIN_TOKEN_KEY;
const USER_TOKEN_KEY = process.env.USER_TOKEN_KEY;
const userModel = require("../../model/userModel");

// const auth = require("./middlewares/auth");

const auth = async (req, res, next) => {
  //return res.send(req.headers);
  try {
    const { email, password } = req.body;
    //validation for user mail and password
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await userModel.findOne({ email });
    if (user) {
      // Create token
      let token;
      if (user.is_admin) {
        token = jwt.sign({ user_id: user._id, email }, ADMIN_TOKEN_KEY, {
          expiresIn: "2h",
        });
      } else {
        token = jwt.sign({ user_id: user._id, email }, USER_TOKEN_KEY, {
          expiresIn: "2h",
        });
      }
      user.token = token;
      return res.status(200).json(user);
    } else {
      return res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    return res.status(400).send("Error");
  }
};
module.exports = {
  auth,
};

const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;
const bcrypt = require("bcrypt");
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
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      return res.status(200).json(user);
    } else {
      return res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    return res.status(400).send("Error");
  }
}
module.exports = {
  auth,
}
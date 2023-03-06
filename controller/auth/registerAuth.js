const userModel = require("../../model/userModel");
const bcrypt = require("bcrypt");

// Register
const registerAuth = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    age,
    gender,
    address,
    birth_date,
    image_url,
  } = req.body;

  // Validate user input
  if (!(age && email && password && first_name && last_name)) {
    return res.status(400).send("Some inputs are missing");
  }
  // check if user already exist
  // Validate if user exist in our database
  const oldUser = await userModel.findOne({ email });
  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }
  const encryptedPassword = await bcrypt.hash(password, 15);

  const newUser = {
    first_name: first_name,
    last_name: last_name,
    email: email.toLowerCase(), // sanitize: convert email to lowercase
    password: encryptedPassword,
    age: age,
    gender: gender,
    address: address,
    birth_date: birth_date,
    image_url: image_url,
  };

  const user = await userModel.create(newUser);
  // Create token
  // const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY);
  // save user token
  // user.token = token;
  return user, res.status(201).send({ Message: "User successfully added" });
};

module.exports = {
  registerAuth,
};

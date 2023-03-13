const userModel = require("../../model/userModel");
const bcrypt = require("bcrypt");
const upload = require("../../middleware/multer");

const registerAuth = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    gender,
    address,
    birth_date,
  } = req.body;

  if (!(email && password && first_name && last_name)) {
    return res.status(400).send({ Message: "Some inputs are missing" });
  }

  const oldUser = await userModel.findOne({ email });
  if (oldUser) {
    return res
      .status(409)
      .json({ Message: "User Already Exist. Please Login" });
  }
  let image_url = null;
  if (req.file) {
    image_url = `${process.env.BASE_URL}/assets/${req.file.filename}`;
  }
  const encryptedPassword = await bcrypt.hash(password, 15);
  const newUser = {
    first_name: first_name,
    last_name: last_name,
    email: email.toLowerCase(), // sanitize: convert email to lowercase
    password: encryptedPassword,
    gender: gender,
    address: address,
    birth_date: birth_date,
    image_url: image_url,
  };

  const user = await userModel.create(newUser);
  return res.status(201).send({ Message: "User successfully added" });
};
module.exports = {
  registerAuth,
};

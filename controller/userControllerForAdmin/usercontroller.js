const userModel = require("../../model/userModel");

//add User
const userCreateRoute = async (req, res) => {
  try {
    const token = req.headers["access-token"];
    if (!token) {
      return res.status(400).send({ Message: "A token is required for accessing" });
    }
    const userData = { ...req.body };
    const user = await userModel.create(userData);
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({ Message: error.message });
  }
};

//update User
const userUpdateRoute = async (req, res) => {
  try {
    const token = req.headers["access-token"];
    if (!token) {
      return res.status(400).send({ Message: "A token is required for accessing" });
    }
    const userData = { ...req.body };
    const user = await userModel.findByIdAndUpdate(req.params.id, userData);
    if (user) {
      return res
        .status(200)
        .send({ Message: `User_id ${user._id} Updated Success`, user: user });
    } else {
      return res.status(404).send({ Message: "User is not Exist" });
    }
  } catch (error) {
    return res.status(500).send({ Message: error.message });
  }
};

//delete User
const userDeleteRoute = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    const remainingUSers = await userModel.find({});
    if (user) {
      return res.status(201).send({
        Message: `User_id ${user._id} Deleted Success`,
        users: remainingUSers,
      });
    } else {
      return res.status(404).send({ Message: "User is not Exist" });
    }
  } catch (error) {
    return res.status(500).send({ Message: error.message });
  }
};

//get all users
const userGetAllRoute = async (req, res) => {
  try {
    const user = await userModel.find({});
    if (user.length > 0) {
      return res.status(200).send(user);
    } else {
      return res.status(404).send({ Message: "No User Exists" });
    }
  } catch (error) {
    return res.status(500).send({ Message: error.message });
  }
};

//get user by id
const userGetByIdRoute = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (user) {
      return res.status(200).send(user);
    } else {
      return res.status(404).send({ Message: "User is not Exist" });
    }
  } catch (error) {
    return res.status(500).send({ Message: error.message });
  }
};

module.exports = {
  userCreateRoute,
  userUpdateRoute,
  userDeleteRoute,
  userGetAllRoute,
  userGetByIdRoute,
};

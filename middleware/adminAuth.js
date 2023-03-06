
const userModel = require("../model/userModel")

const adminAuth = async function (req, res, next) {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user.is_admin) {
        req.user = user;
        next();
    } else {
        return res.status(404).send({ Message: "Sorry Only Admin Can Access." });
    }
};

module.exports = adminAuth;

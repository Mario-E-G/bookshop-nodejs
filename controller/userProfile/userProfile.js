
const userProfile = (req, res) => {
    return res.status(200).send({ Message: "user Profile" });
}

module.exports = {
    userProfile,
}
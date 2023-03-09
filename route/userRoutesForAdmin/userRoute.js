const express = require("express");
const {
    userCreateRoute,
    userUpdateRoute,
    userDeleteRoute,
    userGetAllRoute,
    userGetByIdRoute
} = require("../../controller/userControllerForAdmin/usercontroller");
const router = express.Router();


router.get("/user", userGetAllRoute);
router.get("/user/:id", userGetByIdRoute);
router.post("/user", userCreateRoute);
router.patch("/user/:id", userUpdateRoute);
router.delete("/user/:id", userDeleteRoute);


module.exports = router;
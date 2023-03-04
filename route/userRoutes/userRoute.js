const express = require("express");
const {
    userCreateRoute,
    userUpdateRoute,
    userDeleteRoute,
    userGetAllRoute,
    userGetByIdRoute
} = require("../../controller/userController/usercontroller");
const router = express.Router();


router.get("/", userGetAllRoute);
router.get("/:id", userGetByIdRoute);
router.post("/", userCreateRoute);
router.patch("/:id", userUpdateRoute);
router.delete("/:id", userDeleteRoute);


module.exports = router;
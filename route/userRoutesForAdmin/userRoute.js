const express = require("express");
const { registerAuth } = require("../../controller/auth/registerAuth");
const {
  userUpdateRoute,
  userDeleteRoute,
  userGetAllRoute,
  userGetByIdRoute,
  userCreateRoute,
} = require("../../controller/userControllerForAdmin/usercontroller");
const upload = require("../../middleware/multer");
const router = express.Router();

router.get("/user", userGetAllRoute);
router.get("/user/:id", userGetByIdRoute);
// router.post("/user", userCreateRoute);
router.post("/user", upload.single("image_url"), userCreateRoute);
router.patch("/user/:id",upload.single("image_url"), userUpdateRoute);
router.delete("/user/:id", userDeleteRoute);

module.exports = router;

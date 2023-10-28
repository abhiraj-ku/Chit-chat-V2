const {
  register,
  login,
  setAvatarRoute,
} = require("../controllers/userControllers.js");

const router = require("express").Router();
router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatarRoute);

module.exports = router;

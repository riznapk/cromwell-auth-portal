const express = require("express");
const router = express.Router();
const { register, getUserInfo } = require("../controllers/userController");
const { login } = require("../controllers/userController");
const { logout } = require("../controllers/userController");
const {
  validateUserLogin,
  validateUserRegister,
} = require("../middlewares/userInputValidator");

router.post("/register", validateUserRegister, register);
router.post("/login", validateUserLogin, login);
router.post("/logout", logout);
router.get("/info", getUserInfo);

module.exports = router;

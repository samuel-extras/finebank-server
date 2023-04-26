const express = require("express");

const {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  updatePassword,
  resetPassword,
} = require("../Controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/update-password", updatePassword);
router.post("/reset-password", resetPassword);
router.get("/users/:id", getUser);
router.get("/users", getUsers);

module.exports = router;

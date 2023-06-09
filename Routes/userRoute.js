const express = require("express");

const {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  updatePassword,
  resetPassword,
  auth,
  authUpdatePassword,
  updateUser,
} = require("../Controllers/userController");
const authMiddleware = require("../Middleware/protect");
const {
  getAccounts,
  getAccountById,
  createAccount,
  editAccount,
  deleteAccount,
} = require("../Controllers/accountController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update-password", updatePassword);
router.put("/auth-update-password", authMiddleware, authUpdatePassword);
router.put("/update-user", authMiddleware, updateUser);
router.post("/reset-password", resetPassword);
router.get("/auth", authMiddleware, auth);
router.get("/users/:id", getUser);
router.get("/users", getUsers);
router.get("/accounts/:id", authMiddleware, getAccountById);
router.get("/accounts", authMiddleware, getAccounts);
router.post("/create-account", authMiddleware, createAccount);
router.put("/edit-account/:id", authMiddleware, editAccount);
router.delete("/delete-account/:id", authMiddleware, deleteAccount);

module.exports = router;

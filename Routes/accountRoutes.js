const express = require("express");

const authMiddleware = require("../Middleware/protect");
const {
  getAccounts,
  getAccountById,
  createAccount,
  editAccount,
  deleteAccount,
} = require("../Controllers/accountController");

const router = express.Router();

router.get("/accounts/:id", authMiddleware, getAccountById);
router.get("/accounts", authMiddleware, getAccounts);
router.post("/create-account", authMiddleware, createAccount);
router.put("/edit-account/:id", authMiddleware, editAccount);
router.delete("/delete-account/:id", authMiddleware, deleteAccount);

module.exports = router;

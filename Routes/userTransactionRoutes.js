const express = require("express");

const authMiddleware = require("../Middleware/protect");
const {
  addTransaction,
  getAllTransactions,
  getTransactionById,
} = require("../Controllers/userTransactionController");

const router = express.Router();

router.get("/user-transactions/:id", authMiddleware, getTransactionById);
router.get("/user-transactions", authMiddleware, getAllTransactions);
router.post("/create-user-transaction", authMiddleware, addTransaction);

module.exports = router;

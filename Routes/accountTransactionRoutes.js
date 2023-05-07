const express = require("express");

const authMiddleware = require("../Middleware/protect");
const {
  createTransaction,
  getAllTransactions,
  getTransactionById,
} = require("../Controllers/accountTransactionController");

const router = express.Router();

router.get("/account-transactions/:id", authMiddleware, getTransactionById);
router.get("/account-transactions", authMiddleware, getAllTransactions);
router.post("/create-account-transaction", authMiddleware, createTransaction);

module.exports = router;

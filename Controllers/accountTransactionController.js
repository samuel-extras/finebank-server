const AccountTransaction = require("../Models/transactionModel");

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { status, type, amount } = req.body;
    const newTransaction = new AccountTransaction({
      account: req.params.id,
      status,
      type,
      amount,
    });
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await AccountTransaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single transaction
const getTransactionById = async (req, res) => {
  try {
    const transaction = await AccountTransaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
};

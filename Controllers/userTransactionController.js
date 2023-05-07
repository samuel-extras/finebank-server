// Import your transaction model
const UserTransaction = require("../Models/userTransactionModel");

// Add a transaction
const addTransaction = async (req, res) => {
  try {
    const { reference, biller, paymentMethod, date, amount, type } = req.body;

    // Create a new transaction object
    const newTransaction = new UserTransaction({
      user: req.user._id, // assuming you have implemented user authentication
      reference,
      biller,
      paymentMethod,
      date,
      amount,
      type,
    });

    // Save the transaction to the database
    await newTransaction.save();

    // Return the newly created transaction object
    res.status(201).json(newTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const transaction = await UserTransaction.findOne({
      _id: req.params.id,
      user: req.user._id, // assuming you have implemented user authentication
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await UserTransaction.find({
      user: req.user._id, // assuming you have implemented user authentication
    });

    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addTransaction,
  getAllTransactions,
  getTransactionById,
};

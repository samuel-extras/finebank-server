const UserAccount = require("../Models/accountModel");

const createAccount = async (req, res) => {
  const { bankName, accountNumber, accountType, balance, branchName } =
    req.body;
  try {
    // Get the user ID from the request object
    const userId = req.user._id;

    // Create a new account object from the request body
    const account = new UserAccount({
      bankName: bankName,
      accountType: accountType,
      balance: balance,
      branchName: branchName,
      accountNumber: accountNumber,
      user: userId,
    });

    // Save the new account to the database
    await account.save();

    // Send a success response
    res.status(201).json({ message: "Account created successfully." });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

const editAccount = async (req, res) => {
  const { bankName, accountNumber, accountType, balance, branchName } =
    req.body;
  try {
    // Get the account ID from the request parameters
    const accountId = req.params.id;

    // Find the account in the database
    const account = await UserAccount.findById(accountId);

    // Check if the account exists
    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    // Check if the authenticated user owns the account
    if (account.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied." });
    }

    // Update the account object with the new data from the request body
    account.bankName = bankName;
    account.accountType = accountType;
    account.balance = balance;
    account.branchName = branchName;
    account.accountNumber = accountNumber;

    // Save the updated account to the database
    await account.save();

    // Send a success response
    res.json({ message: "Account updated successfully." });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

const deleteAccount = async (req, res) => {
  try {
    // Get the account ID from the request parameters
    const accountId = req.params.id;

    // Find the account in the database
    const account = await UserAccount.findById(accountId);

    // Check if the account exists
    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    // Check if the authenticated user owns the account
    if (account.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied." });
    }

    // Delete the account from the database
    await account.remove();

    // Send a success response
    res.json({ message: "Account deleted successfully." });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

const getAccounts = async (req, res) => {
  try {
    // Find all the accounts in the database that belong to the authenticated user
    const accounts = await UserAccount.find({ user: req.user._id });

    // Send the accounts as a JSON response
    res.json(accounts);
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

const getAccountById = async (req, res) => {
  try {
    // Find the account in the database by its ID and the authenticated user
    const account = await UserAccount.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    // Check if the account was found
    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    // Send the account as a JSON response
    res.json(account);
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  createAccount,
  editAccount,
  deleteAccount,
  getAccounts,
  getAccountById,
};

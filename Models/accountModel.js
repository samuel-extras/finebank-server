const mongoose = require("mongoose");

const userAccountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: [
        "savings",
        "checking",
        "credit card",
        "debit card",
        "investment",
        "loan",
        "others",
      ],
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    branchName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserAccount = mongoose.model("UserAccount", userAccountSchema);

module.exports = UserAccount;

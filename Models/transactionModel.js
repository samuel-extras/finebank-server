const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAccount",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      required: true,
    },
    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const AccountTransaction = mongoose.model(
  "AccountTransaction",
  transactionSchema
);

module.exports = AccountTransaction;

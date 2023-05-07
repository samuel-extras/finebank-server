const mongoose = require("mongoose");

const transactionTypes = ["revenue", "expense"];
const paymentMethods = ["Credit", "Debit"];

const transactionSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true },
    biller: { type: String, required: true },
    paymentMethod: { type: String, enum: paymentMethods, required: true },
    date: { type: Date, required: true, default: Date.now() },
    amount: { type: Number, required: true },
    type: { type: String, enum: transactionTypes, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const UserTransaction = mongoose.model("UserTransaction", transactionSchema);

module.exports = UserTransaction;

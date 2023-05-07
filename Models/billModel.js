const mongoose = require("mongoose");

const planValues = ["monthly", "quarterly", "biannual", "annual"];

const billSchema = new mongoose.Schema(
  {
    billDueDate: { type: Date, required: true },
    plan: { type: String, enum: planValues, required: true },
    description: { type: String, required: true },
    lastChargeDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    billName: { type: String, required: true },
    billCompany: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;

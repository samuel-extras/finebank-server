const mongoose = require("mongoose");

const monthlySavingsSchema = new mongoose.Schema(
  {
    targetAmount: { type: Number, required: true },
    achievedAmount: { type: Number, default: 0 },
    month: { type: Date, required: true, default: Date.now() },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const MonthlySavings = mongoose.model("MonthlySavings", monthlySavingsSchema);

module.exports = MonthlySavings;

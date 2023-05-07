const express = require("express");

const authMiddleware = require("../Middleware/protect");
const {
  createBill,
  editBill,
  deleteBill,
  getAllBills,
  getBillById,
} = require("../Controllers/billController");

const router = express.Router();

router.get("/bills/:id", authMiddleware, getBillById);
router.get("/bills", authMiddleware, getAllBills);
router.post("/create-bill", authMiddleware, createBill);
router.put("/edit-bill/:id", authMiddleware, editBill);
router.delete("/delete-bill/:id", authMiddleware, deleteBill);

module.exports = router;

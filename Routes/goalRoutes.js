const express = require("express");

const authMiddleware = require("../Middleware/protect");
const {
  addSavingGoal,
  editSavingGoal,
  deleteSavingGoal,
  getAllSavingGoals,
  getSavingGoalById,
} = require("../Controllers/goalController");

const router = express.Router();

router.get("/goals/:id", authMiddleware, getSavingGoalById);
router.get("/goals", authMiddleware, getAllSavingGoals);
router.post("/create-goal", authMiddleware, addSavingGoal);
router.put("/edit-goal/:id", authMiddleware, editSavingGoal);
router.delete("/delete-goal/:id", authMiddleware, deleteSavingGoal);

module.exports = router;

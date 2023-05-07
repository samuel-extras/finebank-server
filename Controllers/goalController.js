const SavingGoal = require("../Models/goalModel");

// Add a new saving goal
const addSavingGoal = async (req, res) => {
  try {
    // Check if the user already has a saving goal for the current month
    const existingGoal = await SavingGoal.findOne({
      user: req.user._id,
      month: req.body.month,
    });

    // If the user already has a goal for the current month, return an error response
    if (existingGoal) {
      return res
        .status(400)
        .json({ message: "A saving goal for this month already exists." });
    }

    // Create a new saving goal based on the request body and the authenticated user
    const newGoal = new SavingGoal({ ...req.body, user: req.user._id });

    // Save the new saving goal to the database
    const savedGoal = await newGoal.save();

    // Send the saved goal as a JSON response
    res.json(savedGoal);
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// Edit an existing saving goal by ID
const editSavingGoal = async (req, res) => {
  try {
    // Find the saving goal in the database by its ID and the authenticated user
    const goal = await SavingGoal.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    // If the saving goal was not found, return an error response
    if (!goal) {
      return res.status(404).json({ message: "Saving goal not found." });
    }

    // Update the saving goal with the new data from the request body
    if (goal.achievedAmount) goal.achievedAmount = req.body.achievedAmount;
    if (goal.targetAmount) goal.targetAmount = req.body.targetAmount;

    // Save the updated saving goal to the database
    const savedGoal = await goal.save();

    // Send the saved goal as a JSON response
    res.json(savedGoal);
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// Get a single saving goal by ID
const getSavingGoalById = async (req, res) => {
  try {
    // Find the saving goal in the database by its ID and the authenticated user
    const goal = await SavingGoal.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    // If the saving goal was not found, return an error response
    if (!goal) {
      return res.status(404).json({ message: "Saving goal not found." });
    }

    // Send the goal as a JSON response
    res.json(goal);
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// Get all saving goals for the authenticated user
const getAllSavingGoals = async (req, res) => {
  try {
    // Find all saving goals in the database for the authenticated user
    const goals = await SavingGoal.find({ user: req.user._id });

    // Send the goals as a JSON response
    res.json(goals);
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// Delete a single saving goal by ID
const deleteSavingGoal = async (req, res) => {
  try {
    // Find the saving goal by ID
    const savingGoal = await SavingGoal.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    // If the saving goal doesn't exist, return a 404 response
    if (!savingGoal) {
      return res.status(404).json({ message: "Saving goal not found" });
    }

    // Delete the saving goal from the database
    await savingGoal.remove();

    // Return a success message
    return res.json({ message: "Saving goal deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addSavingGoal,
  editSavingGoal,
  deleteSavingGoal,
  getAllSavingGoals,
  getSavingGoalById,
};

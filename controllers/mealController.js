const MealForm = require("../models/mealForm");


// Get all meal entries
exports.getAllMeals = async (req, res) => {
    try {
      const meals = await MealForm.find();
      res.status(200).json({ meals });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
 
  // Update meal entry by id
  exports.updateMeal = async (req, res) => {
    const { id } = req.params;
    const { breakfast, lunch, dinner } = req.body;
  
    try {
      const updatedMeal = await MealForm.findByIdAndUpdate(
        id,
        { breakfast, lunch, dinner, updatedAt: Date.now() },
        { new: true }
      );
      if (!updatedMeal) {
        return res.status(404).json({ message: "Meal entry not found." });
      }
      res.status(200).json({ message: "Meal entry updated successfully!", updatedMeal });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Delete meal entry by id
  exports.deleteMeal = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedMeal = await MealForm.findByIdAndDelete(id);
      if (!deletedMeal) {
        return res.status(404).json({ message: "Meal entry not found." });
      }
      res.status(200).json({ message: "Meal entry deleted successfully!" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
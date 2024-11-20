const MealForm = require("../models/mealForm"); // Assuming you have the MealForm model imported

// Create Meal Entry

exports.createMealForm = async (req, res) => {
  const { empCode, empName, department,date, breakfast, lunch, dinner } = req.body;

  // Convert the date string into a JavaScript Date object (Format: dd-mm-yyyy -> yyyy-mm-dd)
  const dateObj = new Date(date);

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    return res
      .status(400)
      .json({ message: "Invalid date format. Please use dd-mm-yyyy." });
  }

  try {
    // Check if an entry already exists for the same empCode and date
    const existingMeal = await MealForm.findOne({ empCode, date: dateObj });

    if (existingMeal) {
      // If the meal entry already exists for the same employee on the same date, return an error
      return res.status(400).json({
        message: "Meal entry already exists for Employee on this Date.",
      });
    }

    // If no duplicate, create a new MealForm entry
    const newMeal = new MealForm({
      empCode,
      empName,
      department,
      date: dateObj, // Store the date as a Date object
      breakfast,
      lunch,
      dinner,
    });

    await newMeal.save();
    res.status(201).json({
      message: "Meal entry created successfully!",
      mealEntry: newMeal,
    });
  } catch (err) {
    // If an error occurs, return a 500 error with the error message
    res.status(500).json({ message: err.message });
  }
};

// Get all meal entries
exports.getAllMeals = async (req, res) => {
  try {
    const meals = await MealForm.find();
    res.status(200).json({ meals });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


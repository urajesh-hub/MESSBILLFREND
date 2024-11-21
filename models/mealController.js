const mongoose = require('mongoose');

const mealFormSchema = new mongoose.Schema(
  {
    
    empCode: { type: String, required: true },
    empName: { type: String, required: true },
    category:{type: String, required: true},
    date: { type: Date, required: true },
    breakfast: { type: Boolean, default: false },
    lunch: { type: Boolean, default: false },
    dinner: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const MealFormEntry = mongoose.model('MealFormEntry', mealFormSchema);
module.exports = MealFormEntry;

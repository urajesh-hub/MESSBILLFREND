const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

// Routes for MealForm
router.get('/meals', mealController.getAllMeals);
// router.post('/meals', mealController.createMeal);
router.put('/meals/:id', mealController.updateMeal);
router.delete('/meals/:id', mealController.deleteMeal);

module.exports = router;

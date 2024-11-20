const express = require('express');
const router = express.Router();
const mealFormController = require('../controllers/mealFormController');

// POST route to create meal entry
router.post('/', mealFormController.createMealForm);

// // GET route to get meal entry by txn_no
// router.get('/:txn_no', mealFormController.getMealByTxnNo);

// GET route to get all meal entries
router.get('/', mealFormController.getAllMeals);


module.exports = router;

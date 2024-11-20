const express = require('express');
const router = express.Router();
const empMasterAndRateController = require('../controllers/empMasterAndRateController');

// POST route to create employee
router.post('/', empMasterAndRateController.createEmpMasterAndRate);

// GET route to get employee by empCode
router.get('/:empCode', empMasterAndRateController.getEmpByCode);

// GET route to get all employees
router.get('/', empMasterAndRateController.getAllEmps);

// PUT route to update employee by empCode
router.put('/:empCode', empMasterAndRateController.updateEmp);

// DELETE route to delete employee by empCode
router.delete('/:empCode', empMasterAndRateController.deleteEmp);

module.exports = router;

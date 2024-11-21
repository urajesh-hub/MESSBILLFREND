const EmpMasterAndRate = require('../models/empMasterAndRate');

// Create new employee
exports.createEmpMasterAndRate = async (req, res) => {
  const { empCode, empName,category, department, Joindate, breakfastRate, lunchRate, dinnerRate, status } = req.body;

  try {
   

    // Validate required fields
    if (!empCode || !empName || !category || !department || !Joindate || !breakfastRate || !lunchRate || !dinnerRate || !status) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check for duplicate empCode
    const existingEmployee = await EmpMasterAndRate.findOne({ empCode });
    if (existingEmployee) {
      return res.status(409).json({ message: 'empCode already exists. Please use a unique empCode.' });
    }

    // Save new employee (Joindate stored as received)
    const newEmp = new EmpMasterAndRate({
      empCode,
      empName,
      category,
      department,
      Joindate, // Save as-is (string format from frontend)
      breakfastRate,
      lunchRate,
      dinnerRate,
      status,
    });

    await newEmp.save();
    res.status(201).json({ message: 'Employee created successfully!', employee: newEmp });
  } catch (err) {
    console.error('Error in createEmpMasterAndRate:', err);

    // Handle duplicate key error
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Duplicate key error: ' + JSON.stringify(err.keyValue) });
    }

    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

// Get employee by empCode
exports.getEmpByCode = async (req, res) => {
  const { empCode } = req.params;

  try {
    const emp = await EmpMasterAndRate.findOne({ empCode });
    if (!emp) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

     // Format Joindate to yyyy-MM-dd
     emp.Joindate = emp.Joindate
     ? new Date(emp.Joindate).toISOString().split('T')[0]
     : null;
     
    res.status(200).json({ employee: emp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all employees
exports.getAllEmps = async (req, res) => {
  try {
    const employees = await EmpMasterAndRate.find();
    res.status(200).json({ employees });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update employee
exports.updateEmp = async (req, res) => {
  const { empCode } = req.params;
  const { empName, department,category, Joindate, breakfastRate, lunchRate, dinnerRate, status } = req.body;

  try {
    // Update employee (Joindate stored as received)
    const updatedEmp = await EmpMasterAndRate.findOneAndUpdate(
      { empCode },
      { empName, department,category, Joindate, breakfastRate, lunchRate, dinnerRate, status, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedEmp) return res.status(404).json({ message: "Employee not found." });
    res.status(200).json({ message: "Employee updated successfully.", updatedEmployee: updatedEmp });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

// Delete employee by empCode
exports.deleteEmp = async (req, res) => {
  const { empCode } = req.params;

  try {
    const deletedEmp = await EmpMasterAndRate.findOneAndDelete({ empCode });
    if (!deletedEmp) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    res.status(200).json({ message: 'Employee deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

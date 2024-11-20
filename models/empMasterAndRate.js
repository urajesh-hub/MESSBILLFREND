const mongoose = require('mongoose');

const empMasterAndRateSchema = new mongoose.Schema(
  {
    empCode: { type: String, required: true, unique: true },
    empName: { type: String, required: true },
    department: { type: String, required: true },
    Joindate: { type: Date, required: true },
    breakfastRate: { type: Number, required: true },
    lunchRate: { type: Number, required: true },
    dinnerRate: { type: Number, required: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    
  },
  { timestamps: true }
);

const EmpMasterAndRate = mongoose.model('EmpMasterAndRate', empMasterAndRateSchema);
module.exports = EmpMasterAndRate;

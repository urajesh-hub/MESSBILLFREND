// // Option 1: Same MongoDB Connection for Both Models
// // Option 2: Separate MongoDB Connections for Both Models

// // # Option 1: Same MongoDB Connection for Both Models

//         const express = require('express');
//         const mongoose = require('mongoose');
//         const cors = require('cors');
//         const empMasterAndRateRoutes = require('./routes/empMasterAndRateRoutes');
//         const mealFormRoutes = require('./routes/mealFormRoutes');

//         const app = express();
//         const port = 5000;

//         // Middleware
//         app.use(express.json());
//         app.use(cors());

//         Exmaple : 1

//         // MongoDB connection (shared by both models)
//         mongoose
//         .connect('mongodb://localhost:27017/empMasterAndRateDB', { useNewUrlParser: true, useUnifiedTopology: true })
//         .then(() => {
//             console.log('Connected to MongoDB');
//         })
//         .catch((err) => {
//             console.log('Error connecting to MongoDB:', err);
//             process.exit(1); // Exit if DB connection fails
//         });

//         // Use routes for both models
//         app.use('/api/empMasterAndRate', empMasterAndRateRoutes);
//         app.use('/api/mealForm', mealFormRoutes);

//         // Start the server
//         app.listen(port, () => {
//         console.log(`Server running on port ${port}`);
        
//         });

//         // MealForm Model (models/mealForm.js):

//         const mongoose = require('mongoose');

//         const mealFormSchema = new mongoose.Schema({
//         empCode: { type: String, required: true },
//         empName: { type: String, required: true },
//         date: { type: Date, required: true },
//         breakfast: { type: Boolean, default: false },
//         lunch: { type: Boolean, default: false },
//         dinner: { type: Boolean, default: false },
//         createdAt: { type: Date, default: Date.now },
//         updatedAt: { type: Date, default: Date.now },
//         });

//         const MealForm = mongoose.model('MealForm', mealFormSchema);

//         module.exports = MealForm;


//         // EmpMasterAndRate Model (models/empMasterAndRate.js):

//         const mongoose = require('mongoose');

//         const empMasterAndRateSchema = new mongoose.Schema({
//         empCode: { type: String, required: true, unique: true },
//         empName: { type: String, required: true },
//         department: { type: String, required: true },
//         joindate: { type: Date, required: true },
//         breakfastRate: { type: Number, required: true },
//         lunchRate: { type: Number, required: true },
//         dinnerRate: { type: Number, required: true },
//         status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
//         createdAt: { type: Date, default: Date.now },
//         updatedAt: { type: Date, default: Date.now },
//         });

//         const EmpMasterAndRate = mongoose.model('EmpMasterAndRate', empMasterAndRateSchema);

//         module.exports = EmpMasterAndRate;
// -----------------------------------------------------------------------------------------------------------------

// // # Option 2: Separate MongoDB Connections for Both Models
// // (Separate Connections for Both Models):

//             const express = require('express');
//             const mongoose = require('mongoose');
//             const cors = require('cors');
//             const empMasterAndRateRoutes = require('./routes/empMasterAndRateRoutes');
//             const mealFormRoutes = require('./routes/mealFormRoutes');

//             const app = express();
//             const port = 5000;

//             // Middleware
//             app.use(express.json());
//             app.use(cors());

//             // MongoDB connection for EmpMasterAndRate
//             mongoose
//             .connect('mongodb://localhost:27017/empMasterAndRateDB', { useNewUrlParser: true, useUnifiedTopology: true })
//             .then(() => {
//                 console.log('Connected to EmpMasterAndRateDB MongoDB');
//             })
//             .catch((err) => {
//                 console.log('Error connecting to EmpMasterAndRateDB MongoDB:', err);
//                 process.exit(1); // Exit if DB connection fails
//             });

//             // MongoDB connection for MealForm (if using a separate DB)
//             const mealFormDB = mongoose.createConnection('mongodb://localhost:27017/mealFormDB', { useNewUrlParser: true, useUnifiedTopology: true });
//             mealFormDB.once('open', () => {
//             console.log('Connected to MealFormDB MongoDB');
//             });

//             // Use routes for both models
//             app.use('/api/empMasterAndRate', empMasterAndRateRoutes);
//             app.use('/api/mealForm', mealFormRoutes);

//             // Start the server
//             app.listen(port, () => {
//             console.log(`Server running on port ${port}`);
//             });


//         // MealForm Model with Separate DB (models/mealForm.js):

//         const mongoose = require('mongoose');

//         // Use the mealFormDB connection
//         const mealFormDB = mongoose.createConnection('mongodb://localhost:27017/mealFormDB', { useNewUrlParser: true, useUnifiedTopology: true });

//         const mealFormSchema = new mongoose.Schema({
//         empCode: { type: String, required: true },
//         empName: { type: String, required: true },
//         date: { type: Date, required: true },
//         breakfast: { type: Boolean, default: false },
//         lunch: { type: Boolean, default: false },
//         dinner: { type: Boolean, default: false },
//         createdAt: { type: Date, default: Date.now },
//         updatedAt: { type: Date, default: Date.now },
//         });

//         // Use the mealFormDB connection for the MealForm model
//         const MealForm = mealFormDB.model('MealForm', mealFormSchema);

//         module.exports = MealForm;



//         // EmpMasterAndRate Model (models/empMasterAndRate.js):

//         const mongoose = require('mongoose');

//         const mealFormDB = mongoose.createConnection('mongodb://localhost:27017/empMasterAndRateDB', { useNewUrlParser: true, useUnifiedTopology: true });

//         const empMasterAndRateSchema = new mongoose.Schema({
//         empCode: { type: String, required: true, unique: true },
//         empName: { type: String, required: true },
//         department: { type: String, required: true },
//         joindate: { type: Date, required: true },
//         breakfastRate: { type: Number, required: true },
//         lunchRate: { type: Number, required: true },
//         dinnerRate: { type: Number, required: true },
//         status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
//         createdAt: { type: Date, default: Date.now },
//         updatedAt: { type: Date, default: Date.now },
//         });

//         const EmpMasterAndRate = mongoose.model('EmpMasterAndRate', empMasterAndRateSchema);

//         module.exports = EmpMasterAndRate;




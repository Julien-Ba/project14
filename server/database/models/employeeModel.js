const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    startDate: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    department: String,
});

module.exports = mongoose.model('Employee', employeeSchema);

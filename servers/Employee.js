const mongoose = require('mongoose');
const EmploySchema = new mongoose.Schema({
  name: String,
  mail: String,
  phone: String,
  stand: String,
  salary: String,
  imageSource: String,
});
mongoose.model('employee', EmploySchema);

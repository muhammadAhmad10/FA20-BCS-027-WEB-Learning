//define schema for student collection
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profilePic: String,
  location: String,
  city: String,
  country: String,
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;

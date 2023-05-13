//define schema for tutor
const mongoose = require("mongoose");
const tutorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  subject1: String,
  subject2: String,
  bio: String,
  hourlyRate: Number,
  rating: Number,
  reviews: Number,
  profilePic: String,
  location: String,
  city: String,
  country: String,
});

const Student = mongoose.model("Tutor", tutorSchema);
module.exports = Student;

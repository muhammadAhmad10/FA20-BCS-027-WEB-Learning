const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Student = require("../../../models/student");

// Get all students
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// Get a student by id
router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).send("Student not found");
  res.send(student);
});

// Create a new student
router.post("/", async (req, res) => {
  let student = new Student({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    profilePic: req.body.profilePic,
    location: req.body.location,
    city: req.body.city,
    country: req.body.country,
  });
  student = await student.save();
  res.send(student);
});

// Update a student
router.put("/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profilePic: req.body.profilePic,
      location: req.body.location,
      city: req.body.city,
      country: req.body.country,
    },
    { new: true }
  );
  if (!student) return res.status(404).send("Student not found");
  res.send(student);
});

// Delete a student
router.delete("/:id", async (req, res) => {
  const student = await Student.findByIdAndRemove(req.params.id);
  if (!student) return res.status(404).send("Student not found");
  res.send(student);
});

module.exports = router;

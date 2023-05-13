const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Tutor = require("../../../models/tutors");

// Get all tutors
router.get("/", async (req, res) => {
  const tutors = await Tutor.find();
  res.send(tutors);
});

// Get a tutor by id
router.get("/:id", async (req, res) => {
  const tutor = await Tutor.findById(req.params.id);
  if (!tutor) return res.status(404).send("Tutor not found");
  res.send(tutor);
});

// Create a new tutor
router.post("/", async (req, res) => {
  let tutor = new Tutor({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    subject1: req.body.subject1,
    subject2: req.body.subject2,
    bio: req.body.bio,
    hourlyRate: req.body.hourlyRate,
    rating: req.body.rating,
    reviews: req.body.reviews,
    profilePic: req.body.profilePic,
    location: req.body.location,
    city: req.body.city,
    country: req.body.country,
  });
  tutor = await tutor.save();
  res.send(tutor);
});

// Update a tutor
router.put("/:id", async (req, res) => {
  const tutor = await Tutor.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      subject1: req.body.subject1,
      subject2: req.body.subject2,
      bio: req.body.bio,
      hourlyRate: req.body.hourlyRate,
      rating: req.body.rating,
      reviews: req.body.reviews,
      profilePic: req.body.profilePic,
      location: req.body.location,
      city: req.body.city,
      country: req.body.country,
    },
    { new: true }
  );
  if (!tutor) return res.status(404).send("Tutor not found");
  res.send(tutor);
});

// Delete a tutor
router.delete("/:id", async (req, res) => {
  const tutor = await Tutor.findByIdAndRemove(req.params.id);
  if (!tutor) return res.status(404).send("Tutor not found");
  res.send(tutor);
});

module.exports = router;

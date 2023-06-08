const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Tutor = require("../../../models/tutors");

// Get all tutors
router.get("/list", async (req, res) => {
  const tutors = await Tutor.find();
  // console.log(tutors);
  return res.render("HireTutor", { tutors });
});

router.get("/list1", async (req, res) => {
  const tutors = await Tutor.find();
  // console.log(tutors);
  return res.render("ahmad", { tutors });
});

//create tutor
router.get("/addTutor", async (req, res) => {
  res.render("tutor/addTutor");
});
router.post("/addTutor", async (req, res) => {
  const { name, email, subject1, subject2, bio } = req.body;
  const tutor = new Tutor({
    name: name,
    email: email,
    subject1: subject1,
    subject2: subject2,
    bio: bio,
  });
  const user = await tutor.save();
  res.redirect("/api/tutors/list");
});

router.get("/editTutor/:id", async (req, res) => {
  const tutor = await Tutor.findById(req.params.id);
  res.render("tutor/editTutor", { tutor });
});

router.post("/editTutor/:id", async (req, res) => {
  const { name, email, subject1, subject2, bio } = req.body;

  const book = await Tutor.findById(req.params.id);
  if (!book) return res.status(404).send("Book not found");
  (book.name = name),
    (book.email = email),
    (book.subject1 = subject1),
    (book.subject2 = subject2),
    (book.bio = bio),
    await book.save();
  res.redirect("/api/tutors/list");
});

//delete tutor
router.get("/deleteTutor/:id", async (req, res) => {
  const book = await Tutor.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).send("Book not found");
  res.redirect("/api/tutors/list");
});

// // Get a tutor by id
// router.get("/:id", async (req, res) => {
//   const tutor = await Tutor.findById(req.params.id);
//   if (!tutor) return res.status(404).send("Tutor not found");
//   res.send(tutor);
// });

module.exports = router;

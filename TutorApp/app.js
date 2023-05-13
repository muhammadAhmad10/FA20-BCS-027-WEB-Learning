const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Connect to MongoDB
const connectionString = "mongodb://localhost:27017/tutor-finder";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..." + connectionString))
  .catch((err) => console.error("Could not connect to MongoDB..."));

// Middleware
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// API Routes
app.use("/api/tutors", require("./routes/api/tutors/tutorRouter"));
app.use("/api/students", require("./routes/api/students/studentRouter"));

// View Routes
app.get("/", (req, res) => {
  res.render("LandingPage");
});
app.get("/Login", (req, res) => {
  res.render("Login");
});
app.get("/Signup", (req, res) => {
  res.render("Signup");
});
app.get("/Web", (req, res) => {
  res.render("Web");
});
app.get("/App", (req, res) => {
  res.render("App");
});
app.get("/HireTutor", (req, res) => {
  res.render("HireTutor");
});

// Start server
const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

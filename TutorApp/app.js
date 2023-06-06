const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejslayout = require("express-ejs-layouts");

// Middleware
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(ejslayout);

// API Routes
app.use("/api/tutors", require("./routes/api/tutors/tutorRouter"));
app.use("/api/students", require("./routes/api/students/studentRouter"));
app.use("/api/books", require("./routes/api/books/bookRouter"));
app.use("/api/users", require("./routes/api/users/userRouter"));
// app.use("/api/books-operations", require("./routes/api/books-operations"));
// app.use("/", require("./routes/api/tutors/tutorRouter"));
// View Routes

app.get("/", (req, res) => {
  res.render("LandingPage");
});
// app.get("/login", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   console.log("email and password in app.js: ", email, password);
//   res.render("Login");
// });
// app.get("/Signup", (req, res) => {
//   res.render("Signup");
// });
app.get("/Web", (req, res) => {
  res.render("Web");
});
app.get("/App", (req, res) => {
  res.render("App");
});
// app.get("/HireTutor", (req, res) => {
//   res.render("HireTutor");
// });

// Start server
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// Connect to MongoDB
const connectionString =
  "mongodb+srv://ahmad:ahmad@cluster0.nsvp1vi.mongodb.net/TutorApp";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB..." + connectionString);
  })
  .catch((err) => console.error("Could not connect to MongoDB..."));

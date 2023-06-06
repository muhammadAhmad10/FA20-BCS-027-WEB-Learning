const express = require("express");
const router = express.Router();
const User = require("../../../models/user");

// Get all users
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
  //get users on "/api/users/users" route
});

//Get add user page
router.get("/register", (req, res) => {
  res.render("auth/register");
  // "http://localhost:3000/api/users/register" route to register page
});

//Post a user submitted from add user page
router.post("/register", async (req, res) => {
  const user = req.body;
  const newUser = new User({
    name: user.name,
    email: user.email,
    password: user.password,
    userType: user.userType,
  });
  const savedUser = await newUser.save();
  console.log(savedUser);
  res.render("App");
});

//Get login page
router.get("/login", (req, res) => {
  res.render("auth/login");
  // "http://localhost:3000/api/users/login" route to login page
});

//handle the login using data send from login page
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const user = await User.findOne({ email });
  console.log(user);
  if (!user) return res.status(404).send("User not found");
  if (!user.password) return res.status(404).send("User not found");
  if (user.password !== password) return res.status(404).send("Wrong Password");
  res.render("App");
});

// router.get("/login", (req, res) => {
//   console.log("getting login info");
//   const email = req.body.email;
//   const password = req.body.password;
//   console.log("email and password in app.js: ", email, password);
//   // res.render("Login");
// });

module.exports = router;

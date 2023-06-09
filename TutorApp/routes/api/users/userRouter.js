const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../../models/user");
const Book = require("../../../models/book");

// Get all users
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
  //get users on "http://localhost:3000/api/users/users" route
});

//Get add user page
router.get("/register", (req, res) => {
  res.render("auth/register");
});

//Post a user submitted from add user page
router.post("/register", async (req, res) => {
  // await User.deleteMany({});
  const user = req.body;
  const newUser = new User({
    name: user.name,
    email: user.email,
    password: user.password,
    userType: user.userType,
  });
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  const savedUser = await newUser.save();
  console.log(savedUser);
  res.redirect("/api/users/login");
  // res.render("auth/login");
});

//Get login page
router.get("/login", (req, res) => {
  res.render("auth/login");
});

//handle the login using data send from login page
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log("user", user);

  if (!user) {
    res.redirect("auth/login");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    console.log(req.session);
    req.session.user = user;
    req.session.isLoggedIn = true;
    const userType = user.userType;
    // const books = await Book.find();

    res.redirect(`/api/books/books`);

    // res.render("book-store/bookStore", { books, userType });
    // if (userType == "tutor") {
    //   const books = await Book.find();
    //   res.render("book-store/bookStore", { books, userType });
    // } else if (userType == "user") {
    //   const books = await Book.find();
    //   res.render("book-store/bookStore", { books, userType });
    // }
  } else {
    // req.flash("danger", "Invalid Password");
    return res.redirect("auth/login");
  }
});

//handle logout
router.get("/logout", async (req, res) => {
  req.session.user = null;
  req.session.isLoggedIn = true;
  req.session.destroy();
  console.log("session clear");
  return res.redirect("auth/login");
});

module.exports = router;

const express = require("express");
const router = express.Router();

const Book = require("../../../models/book");

//Handling book store operations
// router.get("/api/add", (req, res) => {
//   //   const books = await Book.find();
//   res.render("book-store/add-book");
// });
// router.get("/books", async (req, res) => {
//   const books = await Book.find();
//   res.render("book-store/bookStore", { books });
// });

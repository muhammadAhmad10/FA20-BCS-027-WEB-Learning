const express = require("express");
const router = express.Router();

const Book = require("../../../models/book");

//Handling book store operations
//Get add book page
router.get("/add", (req, res) => {
  res.render("book-store/add-book");
});

//Post a book
router.post("/add", async (req, res) => {
  const { name, author, price } = req.body;
  console.log(name, author, price);

  const book = new Book({
    name: name,
    author: author,
    price: price,
  });
  console.log(book);

  const savedBook = await book.save();
  // res.redirect("books");
});

// router.post("/add", async (req, res) => {
//   const b = req.body;
//   console.log(b);
//   const book = new Book({
//     title: req.body.title,
//     auther: req.body.auther,
//     price: req.body.price,
//   });
//   console.log(book);
//   const savedBook = await book.save();
//   res.redirect("books");
// });

//Get all books from database on booKStore page
router.get("/books", async (req, res) => {
  const books = await Book.find();
  res.render("book-store/bookStore", { books });
});

// Get all books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

//Get single book
router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.send(book);
  if (!book) return res.status(404).send("Book not found");
});

//Edit a book
router.put("/:id", async (req, res) => {
  const book = await findByIdAndUpdate(req.params.id, Book);
  if (!book) return res.status(404).send("Book not found");
  res.send(book);
});

//Delete a book
router.delete("/:id", async (req, res) => {
  const book = await findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).send("Book not found");
  res.send(book);
});

module.exports = router;

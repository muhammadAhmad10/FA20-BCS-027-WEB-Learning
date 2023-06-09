const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  image: String,
  link: String,
});

const Book = mongoose.model("books", bookSchema);
module.exports = Book;

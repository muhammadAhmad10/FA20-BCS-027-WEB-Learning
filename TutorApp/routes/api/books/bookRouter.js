const express = require("express");
const router = express.Router();
const multer = require("multer");
const admin = require("firebase-admin");
const serviceAccount = require("../../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "muhammad-ahmad-39722.appspot.com",
});

const bucket = admin.storage().bucket();
const upload = multer({ storage: multer.memoryStorage() });

const Book = require("../../../models/book");

//Handling book store operations
//Get add book page
router.get("/add", (req, res) => {
  res.render("book-store/add-book");
});

router.post("/add", upload.single("image"), async (req, res) => {
  const { name, author, price } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  const filename = Date.now() + "_" + file.originalname;
  const filepath = `books/${filename}`;

  const bucketFile = bucket.file(filepath);

  const stream = bucketFile.createWriteStream({
    resumable: false,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: Date.now(),
      },
    },
  });

  stream.on("finish", async () => {
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURIComponent(filepath)}?alt=media&token=${
      bucketFile.metadata.metadata.firebaseStorageDownloadTokens
    }`;

    const book = new Book({
      name: name,
      author: author,
      price: price,
      image: imageUrl,
    });

    try {
      const savedBook = await book.save();
      res.redirect("books"); // or any other desired route
    } catch (error) {
      console.error("Error saving book:", error);
      res.status(500).send("Error saving book");
    }
  });

  stream.end(file.buffer);
});

//Get all books from database on booKStore page
router.get("/books", async (req, res) => {
  const books = await Book.find();
  res.render("book-store/bookStore", { books });
});

// // Get all books
// router.get("/bookCollection", async (req, res) => {
//   const books = await Book.find();
//   res.send(books);
//   //http://localhost:3000/api/books/bookCollection
// });

//Get single book
router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.send(book);
  if (!book) return res.status(404).send("Book not found");
});

//Edit a book
//get the book to edit
router.get("/edit/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send("Book not found");
  res.render("book-store/edit-book", { book });
});

//post the book after modification
router.post("/edit/:id", async (req, res) => {
  const { name, author, price } = req.body;
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send("Book not found");
  book.name = name;
  book.author = author;
  book.price = price;
  await book.save();
  res.redirect("/api/books/books");
});

// Delete a book
router.get("/delete/:id", async (req, res) => {
  console.log("going to delete book");
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).send("Book not found");
  console.log(book);
  res.redirect("/api/books/books");
});

//Add book to cart
router.get("/cart/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send("Book not found");
  res.render("book-store/cart", { book });
});

module.exports = router;

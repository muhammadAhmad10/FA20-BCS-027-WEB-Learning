const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Middleware
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//route
app.use("/api/products", require("./routes/api/products/productRouter"));

app.get("/", (req, res) => {
  res.render("home");
});

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

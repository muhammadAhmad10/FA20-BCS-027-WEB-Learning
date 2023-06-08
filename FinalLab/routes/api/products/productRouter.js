const express = require("express");
const router = express.Router();
const Product = require("../../../model/product");

//Handling product store operations
//Getting all the products
router.get("/list", async (req, res) => {
  const products = await Product.find();
  //   console.log(products);
  res.render("productList", { products });
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.send(product);
});
router.get("/", async (req, res) => {
  const products = await Product.find();
  //   console.log(products);
  res.send(products);
});

//Posting a product
// router.get("/", async (req, res) => {
//   res.render("addProduct");
// });

router.post("/", async (req, res) => {
  const { title, color, price } = req.body;
  const product = new Product({
    title: title,
    color: color,
    price: price,
  });
  const savedProduct = await product.save();
  //   res.redirect("/api/products");
  if (!product) return res.status(400).send("No file uploaded");
});

//deleting
router.get("/:id", async (req, res) => {
  const user = await Product.findByIdAndDelete(req.params.id);
  //   res.redirect("/api/products");
});

//editing a product
// router.get("/:id", async (req, res) => {
//   res.render("editProduct");
// });

router.post("/:id", async (req, res) => {
  const { title, color, price } = req.body;
  const product = await Product.findById(req.params.id);
  (product.title = title),
    (product.color = color),
    (product.price = price),
    await product.save();
  //   res.redirect("/api/products");
  if (!product) return res.status(400).send("No file uploaded");
});

module.exports = router;

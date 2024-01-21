const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  newProduct,
} = require("../controllers/products.controller");

router.get("/", getProducts);
router.get("/:productId", getProductById);
router.post("/create-product", newProduct);

module.exports = router;

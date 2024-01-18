const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
} = require("../controllers/products.controller");

router.get("/", getProducts);
router.get("/:productId", getProductById);

module.exports = router;

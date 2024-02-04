const express = require("express");
const router = express.Router();
const {
  createCheckoutSession,
  verifyStripeSession,
  getOrderDetails,
} = require("../controllers/checkout.controller");

router.post("/", createCheckoutSession);
router.post("/verify", verifyStripeSession);
router.get("/orderdetails/:orderId", getOrderDetails);

module.exports = router;

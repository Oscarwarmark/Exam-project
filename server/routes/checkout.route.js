const express = require("express");
const router = express.Router();
const {
  createCheckoutSession,
  verifyStripeSession,
} = require("../controllers/checkout.controller");
// router.use(express.json());

router.post("/", createCheckoutSession);
router.post("/verify", verifyStripeSession);

module.exports = router;

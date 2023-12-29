const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../controllers/checkout.controller");
// router.use(express.json());

router.post("/", createCheckoutSession);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  createCustomer,
  logInCustomer,
  logOutCustomer,
} = require("../controllers/customer.controller");

router.post("/", createCustomer);
router.post("/login", logInCustomer);
router.post("/logout", logOutCustomer);
module.exports = router;

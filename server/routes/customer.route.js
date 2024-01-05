const express = require("express");
const router = express.Router();

const {
  createCustomer,
  logInCustomer,
  logOutCustomer,
  authorize,
} = require("../controllers/customer.controller");

router.post("/", createCustomer);
router.post("/login", logInCustomer);
router.post("/logout", logOutCustomer);
router.get("/authorize", authorize);
module.exports = router;

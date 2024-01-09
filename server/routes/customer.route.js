const express = require("express");
const router = express.Router();

const {
  createCustomer,
  logInCustomer,
  logOutCustomer,
  authorize,
  signInWithGoogle,
} = require("../controllers/customer.controller");

router.post("/", createCustomer);
router.post("/login", logInCustomer);
router.post("/logout", logOutCustomer);
router.post("/google", signInWithGoogle);
router.get("/authorize", authorize);
module.exports = router;

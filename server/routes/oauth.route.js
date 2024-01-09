const express = require("express");
const router = express.Router();

const { googleAuth } = require("../oauth");

router.get("/", googleAuth);
module.exports = router;

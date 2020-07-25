const express = require("express");
const router = express.Router();
const { register, signIn } = require("../controller/auth");

router.post("/register", register);

router.post("/login", signIn);

module.exports = router;

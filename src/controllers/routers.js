const express = require("express");
const services = require("../services/form.js");
const router = express.Router();

router.use(express.json());

// router.get("/login",)
// router.post("/register",)

module.exports = router;
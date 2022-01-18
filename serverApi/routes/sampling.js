"use srrict";
const express = require("express");
const router = express.Router({ mergeParams: true, caseSensitive: false});
const { createWaterSample, getSamples } = require("../controllers/sampling");

router.get("/sampling", getSamples);
router.post("/sampling", createWaterSample);

module.exports = router;

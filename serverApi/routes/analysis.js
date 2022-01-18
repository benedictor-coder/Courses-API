"use strict";
const express = require("express");
const router = express.Router({ mergeParams: true, caseSensitive: false });
const { createAnalysis, getAnalyses } = require("../controllers/analysis");

router.get("/analysis", getAnalyses);
router.post("/analysis", createAnalysis);

module.exports = router;

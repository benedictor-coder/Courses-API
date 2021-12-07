"use srrict";
const express = require("express");
const { check } = require("express-validator");
const router = express.Router({ mergeParams: true, caseSensitive: false });
const { getAllMeetings, createMeeting } = require("../controllers/meetings");
router.get('/meetings', getAllMeetings)
router.post("/meetings", createMeeting);

module.exports = router;

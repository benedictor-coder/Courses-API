"use srrict";
const express = require("express");
const { check } = require("express-validator");
const router = express.Router({ mergeParams: true, caseSensitive: false });
const {
  getAllMeetings,
  createMeeting,
  getMeetingById,
  updateMeetingById,
  deleteMeetingById,
} = require("../controllers/meetings");
router.get("/meetings", getAllMeetings);
router.post("/meetings", createMeeting);
router.get("/meetings/:id", getMeetingById);
router.patch("meeting/:id", updateMeetingById);
router.delete("/meeting/:id", deleteMeetingById);

module.exports = router;

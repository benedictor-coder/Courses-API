"use strict";
const { Timestamp } = require("bson");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Meetings = new Schema({
  start_date: {
    type: Date,
    required: [true, "Please choose a starting date for the meeting."],
  },
  end_date: {
    type: Date,
    required: [true, "Please choose an ending date for the meeting."],
  },
  meeting_title: {
    type: String,
    required: [true, "Enter the title for the meeting."],
  },
  meeting_venue: {
    type: String,
    required: [true, "Venue for meetings cannot be empty."],
  },
  starting_time: {
    type: String,
    required: [true, "Enter a startig time for the meeting."],
  },
  ending_time: {
    type: String,
    required: [true, "Enter an ending time for the meeting"],
  },
  meeting_agenda: {
    type: String,
    required: [true, "Set na agenda  for the meeting"],
  },
  key_speaker: {
    type: String,
    required: [true, "Enter main speaker/quest for the meeting."],
  },
  expected_attendance: {
    type: Number,
    required: [true, "Input the expected number of attendance for the meeting"],
  },
  meeting_moderator: {
    type: String,
    required: [true, "A moderator is required for every meeting"],
  },
  meeting_break: {
    type: Number,
    required: [true, "A meeting break is needed for the meeting"],
  },
});

module.exports = mongoose.model("Meetings", Meetings);

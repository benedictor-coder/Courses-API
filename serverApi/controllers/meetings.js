"use strict";
const { v4: uuidv4 } = require("uuid");
const Meeting = require("../models/Meetings");

const getAllMeetings = async (req, res, next) => {
  let meetings = await Meeting.find();
  try {
    res.status(200).json({
      count: meetings.length,
      message: "Request successful",
      success: true,
      data: meetings,
    });
  } catch (error) {
    console.log(err, "Could not fetch data from the server");
  }
};

const createMeeting = async (req, res, next) => {
  try {
    const meetingData = req.body;
    const meetingId = uuidv4();
    const meetingWithId = new Meeting({ id: meetingId, ...meetingData });
    const newMeeting = await Meeting.create(meetingWithId);
    res.status(200).json({
      success: true,
      message: `Successfully created a meeting with ID: ${meetingWithId.id}`,
      data: newMeeting,
    });
  } catch (error) {
    return next(error, "There was an error creating the meeting.");
  }
};

const getMeetingById = async (req, res, next) => {
  const { id: meetingId } = req.params;

  try {
    const meeting = await Meeting.findOne({ _id: meetingId });

    res.status(200).json({
      message: "Meeting found",
      success: true,
      meeting: meeting,
    });
  } catch (error) {
    console.log("Could not get meeting\n", error);
    res.status(404).json({
      message: "Meeting not found",
      success: false,
      meeting: {},
    });
  }
};

const updateMeetingById = async (req, res, next) => {
  const { _id: meetingId } = req.params;

  try {
    let meeting_to_update = await Meeting.findById(req.params.id);
    meeting_to_update = await Meeting.findOneAndUpdate(
      {
        _id: meetingId,
      },
      {
        $set: {
          meeting_title: req.body.meeting_title,
          meeting_venue: req.body.meeting_venue,
          key_speaker: req.body.key_speaker,
          meeting_agenda: req.body.meeting_agenda,
          meeting_moderator: req.body.meeting_moderator,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    meeting_to_update.save();

    res.status(200).json({
      message: "Meeting has been updated.",
      success: true,
      meeting: meeting_to_update,
    });
  } catch (error) {
    console.log("Failed to update\n.", error);
    res.staus(404).json({
      message: "Meeting update failed.",
      success: false,
      meeting: {},
    });
  }
};

const deleteMeetingById = async (req, res, next) => {
  const { id: meetingId } = req.params;

  try {
    const meeting_to_delete = await Meeting.findByIdAndDelete({
      _id: meetingId,
    });

    if (!meeting_to_delete) {
      return next("There no meeting with the Id provided.", 404);
    }

    res.status(200).json({
      message: "Meeting deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log("Could not delete.\n", error);
    res.status(404).json({
      meessage: "Meeting not found",
      success: false,
    });
  }
};

module.exports = {
  getAllMeetings,
  createMeeting,
  getMeetingById,
  updateMeetingById,
  deleteMeetingById,
};

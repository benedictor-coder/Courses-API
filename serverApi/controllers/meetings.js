"use strict";
const { v4: uuidv4 } = require("uuid");
const Meeting = require("../models/Meetings");

const getAllMeetings = async (req, res, next) => {
  let meetings = await Meeting.find();
  try {
    meetings.length > 1
      ? res.send(meetings)
      : res.status(200).json({
          message: "Request successful",
          success: true,
          data: meetings,
          count: meetings.length,
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

module.exports = {
  getAllMeetings,
  createMeeting,
};

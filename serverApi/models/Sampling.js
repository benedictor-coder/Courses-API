"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Sampling = new Schema({
  site_code: {
    type: String,
    required: [true, "There must be a site code."],
  },
  type_source: {
    type: String,
    required: [true, "Water source type must be provided."],
  },
  sample_date: {
    type: Date,
    default: Date.now(),
  },
  water_clarity: {
    type: String,
    required: [true, "Provide clarity of water."],
  },
  facility: {
    type: String,
    required: [true, "Enter facility for sampling."],
  },
  sender_no: {
    type: String,
    required: [true, "Provide the sender number."],
  },
  water_temperature: {
    type: String,
    required: [true, "Provide water temperature."],
  },
  the_ph: {
    type: String,
    required: [true, "Provide water ph."],
  },
  sample_no: {
    type: String,
    required: [true, "Provide sample number."],
  },
});

module.exports = mongoose.model("Sampling", Sampling);

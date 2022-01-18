"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Analysis = new Schema({
  hardness: {
    type: String,
    required: [true, "Provide water hardness."],
  },
  submitted_by: {
    type: String,
    required: [
      true,
      "Provide the name of the person that submitted the sample.",
    ],
  },
  date_received: {
    type: Date,
    default: Date.now(),
    required: [true, "Provide date of analysis."],
  },
  chloride: {
    type: String,
    required: [true, "Provide chloride levels for the source."],
  },
  fluoride: {
    type: String,
    required: [true, "Provide fluoride levels for the source."],
  },
  iron: {
    type: String,
    required: [true, "Provide iron levels for the source."],
  },
});

module.exports = mongoose.model("Analysis", Analysis);

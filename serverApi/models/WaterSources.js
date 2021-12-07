const mongoose = require("mongoose");
// mongoose.set("bufferCommands", true);

const Schema = mongoose.Schema;

const WaterSourceSchema = new Schema({
  source: {
    type: String,
    required: [true, "Please Provide Course Name"],
  },
  region: {
    type: String,
    required: [true, "Please Provide duration of the course"],
  },
  cost: {
    type: Number,
    required: [true, "Please Provide tuition fees of the course"],
  },
  approval: {
    type: String,
    required: [true, "Provide the approval for the course"],
  },
  county: {
    type: String,
    required: [true, "The course must have a school to belong"],
  },
  sub_county: {
    type: String,
    required: [true, "Provide the department for the course"],
  },
  created: {
    type: Date,
    default: Date.now().toPrecision(),
  },
  ward: {
    type: String,
    required: [true, "Chose an intake"],
  },
  location: {
    type: String,
    required: [true, "Select an campus"],
  },
});

module.exports = mongoose.model("WaterSources", WaterSourceSchema);

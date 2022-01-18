const mongoose = require("mongoose");
// mongoose.set("bufferCommands", true);

const Schema = mongoose.Schema;

const WaterSourceSchema = new Schema({
  source: {
    type: String,
    required: [true, "Please Provide Course Name"],
  },
  source_type: {
    type: String,
    required: [true, "Provide water type of source for the water"],
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
    default: new Date(),
  },
  ward: {
    type: String,
    required: [true, "Chose an intake"],
  },
  location: {
    type: String,
    required: [true, "Select an campus"],
  },
  water_level: {
    type: String,
    required: [true, "Provide the level of the wate source."],
  },
  ph: {
    type: String,
    required: [true, "Provide pH level of the water"],
  },
});

module.exports = mongoose.model("WaterSources", WaterSourceSchema);

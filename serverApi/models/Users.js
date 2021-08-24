const mongoose = require("mongoose");
// mongoose.set("bufferCommands", true);

const Schema = mongoose.Schema;

const CoursesSchema = new Schema({
  course: {
    type: String,
    required: [true, "Please Provide Course Name"],
  },
  duration: {
    type: String,
    required: [true, "Please Provide duration of the course"],
  },
  tuition: {
    type: Number,
    required: [true, "Please Provide tuition fees of the course"],
  },
  approval: {
    type: String,
    required: [true, "Provide the approval for the course"],
  },
  school: {
    type: String,
    required: [true, "The course must have a school to belong"],
  },
  department: {
    type: String,
    required: [true, "Provide the department for the course"],
  },
  created: {
    type: Date,
    default: Date.now().toPrecision(),
  },
  intake: {
    type: String,
    required: [true, "Chose an intake"],
  },
  campus: {
    type: String,
    required: [true, "Select an campus"],
  },
});

module.exports = mongoose.model("Courses", CoursesSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectsSchema = new Schema({
  project_name: {
    type: String,
    required: [true, "Fill project name."],
  },
  project_number: {
    type: String,
    required: [true, "Put project number"],
  },
  name_of_contractor: {
    type: String,
    required: [true, "Please fill the name of the contractor"],
  },
  approved_by: {
    type: String,
    required: [true, "Enter approving institution for the project"],
  },
  budget: {
    type: Number,
    required: [true, "Put estimated projet cost/budget"],
  },
  commence_date: {
    type: Date,
    required: [true, "Enter starting date for the project"],
  },
  completion_date: {
    type: Date,
    required: [true, "Enter completion date for the project"],
  },
  contracting_company: {
    type: String,
    required: [true, "Fill the name of the contracting company"],
  },
  location: {
    type: String,
    required: [true, "Fill the location where the project is due"],
  },
});

module.exports = mongoose.model("Projects", ProjectsSchema);

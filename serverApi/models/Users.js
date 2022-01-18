const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Users = new Schema({
  firstname: {
    type: String,
    required: [true, "Enter your first nane."],
  },
  lastname: {
    type: String,
    required: [true, "Enter your last name."],
  },
  username: {
    type: String,
    required: [true, "Enter your user name."],
  },
  password: {
    type: String,
    required: [true, "Enter correct password."],
  },
  role: {
    type: String,
    required: [true, "Choose role from the dropdown."],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Users", Users);

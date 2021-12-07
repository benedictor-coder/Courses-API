const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Users = new Schema({
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
});

module.exports = mongoose.model("Users", Users);

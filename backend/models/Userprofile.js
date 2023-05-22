const mongoose = require("mongoose");
const internal = require("stream");

const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  userimage: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Userprofile = mongoose.model("Userprofile", UserProfileSchema);

module.exports = Userprofile;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username can not be empty"],
  },
  password: {
    type: String,
    required: [true, "Password can not be empty"],
  },
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  avtar: { type: String, require: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobile: { type: Number, required: true },
  no_of_wins: { type: Number },
  no_of_looses: { type: Number },
  scores: { type: Number },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;

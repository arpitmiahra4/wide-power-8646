const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  avatar: { type: String, require: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobile: { type: Number, required: true },
  no_of_wins: { type: Number, default : 0 },
  no_of_looses: { type: Number, default : 0 },
  scores: { type: Number, default : 0 },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;

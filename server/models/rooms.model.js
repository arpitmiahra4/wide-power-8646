const mongoose = require("mongoose");

const roomsSchema = mongoose.Schema({
  roomid: { type: String, required: true },
  room_capacity: { type: Number, require: true,default:4 },
  room_availability: { type: Boolean, default: true },
  players: [
    {
      user_id: { type: String, required: true },
    }
  ],
  winer: {
    user_id: String,
    wining_score: Number,
  },
  game_over: { type: Boolean, default: false },
  created_at: { type: Date, required: true },
});

const RoomsModel = mongoose.model("room", roomsSchema);

module.exports = RoomsModel;

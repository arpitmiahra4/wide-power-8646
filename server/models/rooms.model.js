const mongoose = require("mongoose");

const roomsSchema = mongoose.Schema({
  roomid: { type: String, required: true },
 
  room_availability: { type: Boolean, default: true },
  players: [
    {
      user_id: { type: String, required: true },
      username:{ type: String, required: true },
      score:{ type: Number,default: 0}
    }
  ],
  level1:{
    word_id:String,
    question:String,
    word:String,
    hint:String,
    clue1:String,
    clue2:String
  },
  level2:{
    word_id:String,
    question:String,
    word:String,
    hint:String,
    clue1:String,
    clue2:String
  },
  level3:{
    word_id:String,
    question:String,
    word:String,
    hint:String,
    clue1:String,
    clue2:String
  },
  level4:{
    word_id:String,
    question:String,
    word:String,
    hint:String,
    clue1:String,
    clue2:String
  },

  winner: {
    user_id: String,
    winning_score: Number,
  },
  game_over: { type: Boolean, default: false },
  created_at: { type: Date, required: true },
});

const RoomsModel = mongoose.model("room", roomsSchema);

module.exports = RoomsModel;

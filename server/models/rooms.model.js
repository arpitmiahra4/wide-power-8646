const mongoose = require("mongoose");

const roomsSchema = mongoose.Schema({
  roomId: { type: String, required: true },
  room_availability: { type: Boolean, default: true },
  players: [
    {
      user_id: { type: String,required : true},
      username:{ type: String, required : true},
      user_avatar : {type : String, required : true},
      score:{ type: Number,default: 0},
      time :{type:Number,default:0}
    }
  ],
  level1:{
    question:{type : String,required :true},
    word:{type : String, required : true},
    hint:{type : String, required : true},
    clue1:{type : String, required : true},
    clue2:{type : String, required : true},
    messages : {type : Array, default : []}
  },
  level2:{
    question:{type : String,required :true},
    word:{type : String, required : true},
    hint:{type : String, required : true},
    clue1:{type : String, required : true},
    clue2:{type : String, required : true},
    messages : {type : Array, default : []}
  },
  level3:{
    question:{type : String,required :true},
    word:{type : String, required : true},
    hint:{type : String, required : true},
    clue1:{type : String, required : true},
    clue2:{type : String, required : true},
    messages : {type : Array, default : []}
  },
  level4:{
    question:{type : String,required :true},
    word:{type : String, required : true},
    hint:{type : String, required : true},
    clue1:{type : String, required : true},
    clue2:{type : String, required : true},
    messages : {type : Array, default : []}
  },

  winner: {
    user_id: {type : String,default : ""},
    score: {type : String, default : ""}
  },
  game_over: { type: Boolean, default: false },
  created_at: { type: Date, required: true },
},{
  versionKey : false
});

const RoomsModel = mongoose.model("room", roomsSchema);

module.exports = RoomsModel;

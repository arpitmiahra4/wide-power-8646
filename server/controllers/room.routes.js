const express = require("express");
const crypto = require("crypto");
const RoomsModel = require("../models/rooms.model");
const RoomsMode = require("../models/rooms.model");
require("dotenv").config();

const roomRoute = express.Router();

roomRoute.get("/", async (req, res) => {
  const data = await RoomsModel.find();
  res.send(data);
});

roomRoute.post("/create", async (req, res) => {
  const { userid } = req.body;
  const data = await RoomsModel.find({ room_availability: true });
  if (data.length === 0) {
    let newroom = new RoomsModel({
      roomid: crypto.randomBytes(3).toString("hex"),
      room_capacity: 3,
      room_availability: true,
      players: [
        {
          user_id: userid,
        }
      ],
      winer: {},
      game_over: false,
      created_at: new Date(),
    });
    await newroom.save();
    res.send({ msg: "New Room Created", roomid: newroom.roomid });
  } else {
    let room = data[0];
    let availability;
    if (room.room_capacity == 1) {
      availability = false;
    } else {
      availability = true;
    }

    let newroom = {
      ...room,
      room_capacity: room.room_capacity - 1,
      room_availability: availability,
      players: [...room.players, { user_id: userid }],
    };
    await RoomsModel.findByIdAndUpdate({ _id: room._id }, newroom);
    res.send({ msg: "Room Available to play ", roomid: room._id });
  }
});


roomRoute.patch("/gameover/:roomid",async(req,res)=> {
  const roomid=req.params.roomid;
  const {winer}=req.body;
  try {
     await RoomsMode.findOneAndUpdate({roomid:roomid}, { $set: { winer:winer ,game_over:true} })
    res.send({msg:"Room Updated with winer and Game Over..."})


  } catch (error) {
    console.log(error)
    res.status(500).send({msg:"Somthing Went Wrong"})
  }





})

module.exports = roomRoute;

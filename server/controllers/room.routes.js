const express = require("express");
const crypto = require("crypto");
const RoomsModel = require("../models/rooms.model");

const Level1Model=require("../models/level1.model")
const Level2Model=require("../models/level2.model")
const Level3Model=require("../models/level3.model")
const Level4Model=require("../models/level4.model")


require("dotenv").config();

const roomRoute = express.Router();

roomRoute.get("/", async (req, res) => {
  const data = await RoomsModel.find();
  res.send(data);
});
const makequestion=(word)=>{
let arr=word.trim().split(" ")
return arr
}


roomRoute.post("/create", async (req, res) => {
  const { userid,username } = req.body;
  let l1=await Level1Model.aggregate([{ $sample: { size: 1 } }])
  let l2=await Level2Model.aggregate([{ $sample: { size: 1 } }])
  let l3=await Level3Model.aggregate([{ $sample: { size: 1 } }])
  let l4=await Level4Model.aggregate([{ $sample: { size: 1 } }])
  let l1q=makequestion(l1[0].word)
  let l2q=makequestion(l2[0].word)
  let l3q=makequestion(l3[0].word)
  let l4q=makequestion(l4[0].word)

 let newroom = new RoomsModel({
   roomid: crypto.randomBytes(3).toString("hex"),
   room_availability: true,
   players: [{ user_id:userid,username:username,score:0}],
   winer: {},
   game_over: false,
   created_at: new Date(),
   level1:l1[0],
   level2:l2[0],
   level3:l3[0],
   level4:l4[0]
 });
 await newroom.save();
 res.send({ msg: "New Room Created", roomid: newroom.roomid ,newroom});
});
roomRoute.post("/join/:roomid", async (req, res) => {
  const roomid = req.params.roomid;
  const { userid,username } = req.body;
  try {
    let room = await RoomsModel.find({ roomid: roomid });
    if (room.length === 0) {
      res.status(404).send({ msg: "Room Not Found With Roomid" });
    } else {
      if (room[0].room_availability === false) {
        res
          .status(404)
          .send({
            msg: "Room is Out of Players Please Try to Create New Room ",
          });
      } else {
        let availability=true;
        if(room[0].players.length===4){
          availability=false;
        }
        let newroom = {
          ...room[0],
          room_availability: availability,
          players: [...room.players, { user_id:userid,username:username,score:0}],
        };
        await RoomsModel.findOneAndUpdate({ roomid: room._id },newroom)
        res.send({msg:"Welcome to room",roomid:room._id})
          
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Somthing Went Wrong..." });
  }
});
roomRoute.get("/singleroom/:roomid", async (req, res) => {
  const roomid = req.params.roomid;
  
  try {
    let room=await RoomsModel.find({ roomid: roomid })
    if(room.length===0){
      res.status(404).send({ msg: "Room Not Found With Roomid" });
    }
    else{
      res.send(room)
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Somthing Went Wrong" });
  }
});




module.exports = roomRoute;

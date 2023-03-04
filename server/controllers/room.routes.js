const express = require("express");
const crypto = require("crypto");
const RoomsModel = require("../models/rooms.model");

const Level1Model = require("../models/level1.model");
const Level2Model = require("../models/level2.model");
const Level3Model = require("../models/level3.model");
const Level4Model = require("../models/level4.model");
const { findOneAndUpdate } = require("../models/rooms.model");

require("dotenv").config();

const roomRoute = express.Router();

roomRoute.get("/", async (req, res) => {
  const data = await RoomsModel.find();
  res.send(data);
});
const makequestion = (word) => {
  let arr = word.trim().split("");
  let n = Math.floor(arr.length / 2);
  const arr2 = new Array(n);
  for (let i = 0; i < arr2.length; i++) {
    let x = Math.floor(Math.random() * arr.length);
    if (arr2.includes(x)) {
      i--;
      continue;
    }
    arr2[i] = x;
  }
  console.log(arr2);
  let bag = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr2.includes(i)) {
      bag += "_";
    } else {
      bag += arr[i];
    }
  }
  return bag;
};

roomRoute.post("/create", async (req, res) => {
  const { userid, username } = req.body;
  let l1 = await Level1Model.aggregate([{ $sample: { size: 1 } }]);
  let l2 = await Level2Model.aggregate([{ $sample: { size: 1 } }]);
  let l3 = await Level3Model.aggregate([{ $sample: { size: 1 } }]);
  let l4 = await Level4Model.aggregate([{ $sample: { size: 1 } }]);
  let l1q = makequestion(l1[0].word);
  let l2q = makequestion(l2[0].word);
  let l3q = makequestion(l3[0].word);
  let l4q = makequestion(l4[0].word);

  let newroom = new RoomsModel({
    roomid: crypto.randomBytes(3).toString("hex"),
    room_availability: true,
    players: [{ user_id: userid, username: username, score: 0 }],
    winer: {},
    game_over: false,
    created_at: new Date(),
    level1: { ...l1[0], question: l1q },
    level2: { ...l2[0], question: l2q },
    level3: { ...l3[0], question: l3q },
    level4: { ...l4[0], question: l4q },
  });
  await newroom.save();
  res.send({ msg: "New Room Created", roomid: newroom.roomid, newroom });
});
roomRoute.patch("/join", async (req, res) => {
  const { userid, username } = req.body;
  try {
    let room = await RoomsModel.find({ room_availability: true });
    if (room.length === 0) {
      res
        .status(404)
        .send({
          msg: "No Room Availabel at this moment Plese Try again letter Or Create New Room",
        });
    } else {
      let availability = true;
      if (room[0].players.length === 3) {
        availability = false;
      }
      let players = [
        ...room[0].players,
        { user_id: userid, username: username, score: 0 },
      ];

      await RoomsModel.findOneAndUpdate(
        { roomid: room[0].roomid },
        { players, room_availability: availability }
      );
      res.send({ msg: "Welcome to room", roomid: room[0].roomid });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Somthing Went Wrong..." });
  }
});

roomRoute.patch("/join/:roomid", async (req, res) => {
  const roomid = req.params.roomid;
  const { userid, username } = req.body;
  try {
    let room = await RoomsModel.find({ roomid: roomid });
    if (room.length === 0) {
      res.status(404).send({ msg: "Room Not Found With Roomid" });
    } else {
      if (room[0].room_availability === false) {
        res.status(404).send({
          msg: "Room is Out of Players Please Try to Create New Room ",
        });
      } else {
        let availability = true;
        if (room[0].players.length === 3) {
          availability = false;
        }
        let players = [
          ...room[0].players,
          { user_id: userid, username: username, score: 0 },
        ];

        await RoomsModel.findOneAndUpdate(
          { roomid: roomid },
          { players, room_availability: availability }
        );
        res.send({ msg: "Welcome to room", roomid: roomid });
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
    let room = await RoomsModel.find({ roomid: roomid });
    if (room.length === 0) {
      res.status(404).send({ msg: "Room Not Found With Roomid" });
    } else {
      res.send(room);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Somthing Went Wrong" });
  }
});

roomRoute.patch("/updatescore/:roomid", async (req, res) => {
  const roomid = req.params.roomid;
  const { player_id, username, score } = req.body;

  try {
    let room = await RoomsModel.find({ roomid: roomid });
    console.log(room);
    if (room.length == 0) {
      res.status(404).send({ msg: "Room Not Found With Roomid" });
    } else {
      let players = room[0].players;

      for (let i = 0; i < players.length; i++) {
        if (players[i].user_id === player_id) {
          players[i].score += +score;
        }
      }
      await RoomsModel.findOneAndUpdate({ roomid: roomid }, { players });
      res.send({ msg: "Score Updated Sucsessfully.." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Somthing Went Wrong" });
  }
});

roomRoute.patch("/gameover/:roomid", async (req, res) => {
  const roomid = req.params.roomid;
  try {
    const match = await RoomsModel.findOne({roomid});
    let players = match.players;
    console.log(players);
    players.sort((a,b)=>b.score-a.score);
    console.log(players);
    const winner = players[0];
    await RoomsModel.findOneAndUpdate({roomid},{winner : {user_id : winner.user_id, winning_score : winner.score}});
    res.send({ msg: "Room Updated with winer and Game Over...", leaderboard : players });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Somthing Went Wrong" });
  }
});

roomRoute.patch("/gamestart/:roomid", async (req, res) => {
  const roomid = req.params.roomid;
  try {
    await RoomsModel.findOneAndUpdate(
      { roomid: roomid },
      { $set: { room_availability:false }}
    );
    res.send({ msg: "Please Start The Game..." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Somthing Went Wrong" });
  }
});
module.exports = roomRoute;

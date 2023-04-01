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
const makequestion = async (word) => {
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
  try{
    const { user_id, username, user_avatar } = req.body;
    let l1 = await Level1Model.find();
    let l2 = await Level2Model.find();
    let l3 = await Level3Model.find();
    let l4 = await Level4Model.find();

    let word1 = l1[Math.floor(Math.random()*l1.length)]
    let word2 = l2[Math.floor(Math.random()*l2.length)]
    let word3 = l3[Math.floor(Math.random()*l3.length)]
    let word4 = l4[Math.floor(Math.random()*l4.length)]

    let question1 = await makequestion(word1.word);
    let question2 = await makequestion(word2.word);
    let question3 = await makequestion(word3.word);
    let question4 = await makequestion(word4.word);
    
    let player={
      user_id,
      username,
      user_avatar
    }
    let check = true;
    let roomId = "";
    while(check==true){
      roomId = crypto.randomBytes(3).toString("hex");
      const match = await RoomsModel.find({roomId});  //checks for existing room ID
      if(match.length==0)
        check = false;
    }
    
    let room = new RoomsModel({
      roomId,
      room_availability: true,
      players: [player],
      winner: {},
      game_over: false,
      created_at: new Date(),
      level1: word1,
      level2: word2,
      level3: word3,
      level4: word4
    });
    room.level1.question = question1;
    room.level2.question = question2;
    room.level3.question = question3;
    room.level4.question = question4;
    await room.save();
    res.send({ msg: "New Room Created", roomId : room.roomId});
  }
  catch(err){
    res.send({status : 'error', message : err.message});
  }

});
roomRoute.patch("/join", async (req, res) => {
  const { user_id, username, user_avatar } = req.body;
  try {
    let room = await RoomsModel.find({ room_availability: true });
    if (room.length === 0) {
      let l1 = await Level1Model.find();
      let l2 = await Level2Model.find();
      let l3 = await Level3Model.find();
      let l4 = await Level4Model.find();

      let word1 = l1[Math.floor(Math.random()*l1.length)]
      let word2 = l2[Math.floor(Math.random()*l2.length)]
      let word3 = l3[Math.floor(Math.random()*l3.length)]
      let word4 = l4[Math.floor(Math.random()*l4.length)]

      let question1 = await makequestion(word1.word);
      let question2 = await makequestion(word2.word);
      let question3 = await makequestion(word3.word);
      let question4 = await makequestion(word4.word);
      
      let player={
        user_id,
        username,
        user_avatar
      }

      let check = true;
      let roomId = "";
      while(check===true){
        roomId = crypto.randomBytes(3).toString("hex");
        const match = await RoomsModel.find({roomId});  //checks for existing room ID
        if(match.length==0)
          check = false;
      }

      let room = new RoomsModel({
        roomId,
        room_availability: true,
        players: [player],
        winner: {},
        game_over: false,
        created_at: new Date(),
        level1: word1,
        level2: word2,
        level3: word3,
        level4: word4
      });
      room.level1.question = question1;
      room.level2.question = question2;
      room.level3.question = question3;
      room.level4.question = question4;
      await room.save();
      res.send({ msg: "New Room Created", roomId : room.roomId});
    } 
    else 
    {
      let availability = true;
      if (room[0].players.length === 3) {
        availability = false;
      }
      let players = [
        ...room[0].players,
        { user_id, username, user_avatar },
      ];

      await RoomsModel.findOneAndUpdate(
        { roomId: room[0].roomId },
        { players, room_availability: availability }
      );
      res.send({ msg: "Welcome to room", roomId: room[0].roomId });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

roomRoute.patch("/join/:roomId", async (req, res) => {
  const roomId = req.params.roomId;
  const { user_id, username, user_avatar } = req.body;
  try {
    let room = await RoomsModel.find({ roomId });
    if (room.length === 0) {
      res.status(404).send({message : 'Room Not Found!', status : 'error'});
    } else {
      if (room[0].room_availability === false) {
        res.status(404).send({
          status : 'error',
          message : 'Room already full!'
        });
      } else {
        let availability = true;
        if (room[0].players.length === 3) {
          availability = false;
        }
        let players = [
          ...room[0].players,
          { user_id ,username , user_avatar},
        ];

        await RoomsModel.findOneAndUpdate(
          { roomId },
          { players, room_availability: availability }
        );
        res.send({ msg: "Welcome to room", roomId });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message});
  }
});

roomRoute.get("/singleroom/:roomId", async (req, res) => {
  const roomId = req.params.roomId;

  try {
    let room = await RoomsModel.find({ roomId });
    if (room.length === 0) {
      res.status(404).send({ message: "No such room available!" });
    } else {
      res.send(room);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message : error.message, status  : 'error' });
  }
});

roomRoute.patch("/submitanswer/:roomId", async (req, res) => {
  const roomId = req.params.roomId;
  const { user_id, score, answer, level } = req.body;

  try {
    let room = await RoomsModel.find({ roomId });
    let players = room[0]["players"];
    let levelArr = room[0][level];
    let messages = room[0][level]["messages"];
    if(room[0][level]["word"].toLowerCase()===answer.toLowerCase()){
      for (let i = 0; i < players.length; i++) {
        if (players[i].user_id === user_id) {
          players[i].score += +(score);
        }
      }
      messages = [...messages, {color :  'green', message : `Player ${user_id} has made a correct guess!`}]
    }
    else{
      messages = [...messages, {color : 'red', messages : `Player ${user_id} has made an incorrect guess!`}] 
    }
    await RoomsModel.findOneAndUpdate({ roomId }, { players, [level] : {...levelArr, messages}});
    res.send({ message : "Score Updated Successfully",players,messages}); 
  }
  catch(err) {
    res.status(500).send({ message: err.message });
  }
});

roomRoute.patch("/gameover/:roomId", async (req, res) => {
  const roomId = req.params.roomId;
  try {
    const match = await RoomsModel.findOne({roomId});
    let players = match.players;
    players.sort((a,b)=>{
      if(b.score>a.score)
        return 1;
      else if(b.score==a.score && b.time<a.time)
          return 1;
      else 
          return -1;
    });
    const winner = players[0];
    await RoomsModel.findOneAndUpdate({roomId},{winner : {user_id : winner.user_id, score : winner.score}, game_over : true});
    res.send({ players });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

roomRoute.patch("/gamestart/:roomId", async (req, res) => {
  const roomId = req.params.roomId;
  try {
    await RoomsModel.findOneAndUpdate(
      { roomId },
      { room_availability : false }
    );
    res.send({message : "Game has Started"});
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
module.exports = roomRoute;

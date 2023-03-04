const express = require("express"); //importing the express from package.
const bcrypt = require("bcrypt"); // importing the bcrypt from package.
const jwt = require("jsonwebtoken"); // importing jwt from jsonwebtoken

require('dotenv').config(); // importing the dotenv from package.


const UserModel = require("../models/user.model"); // importing UserModel from models folder.


const key = process.env.KEY; // importing the key value from .env
const salt = process.env.SALT; // imporing the salt value from .env
const avtararr=[
  "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-fashion-boy-avatar-png-image_6514592.png",
  "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-old-man-cartoon-png-image_6514608.png",
  "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-blonde-avatar-png-image_6514610.png",
  "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-3d-boy-head-portrait-png-image_6514617.png",
  "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-purple-hair-girl-avatar-png-image_6514621.png",
  "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-girl-with-headphones-png-image_6514627.png",
  "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-rock-girl-avatar-png-image_6514639.png",
  "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-business-man-avatar-png-image_6514640.png",
  "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-sports-boy-png-image_6514641.png",
  "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-girl-with-golden-curly-hair-png-image_6514652.png",
  "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-art-boy-avatar-png-image_6514653.png"
];

const userRouter = express.Router(); // creating the saperate router for the user routes.

// for getting userData
userRouter.get('/', async (req, res) => {
    try {
      const user = await UserModel.find({ username: req.query.q });
      res.status(200).send({ message: 'User Data Found!', user });
    } catch (err) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });

// this is the post API for the signup of new user.
userRouter.post("/signup", async (req, res) => {
    console.log("in the signup");
    let { username, email, mobile, password, no_of_wins, no_of_looses, scores } = req.body;
    let user_avtar=avtararr[Math.floor(Math.random() * avtararr.length)];
    try {
        bcrypt.hash(password, +salt, async (err, hash) => {
            try {
                if (err) {
                    res.status(400).send("error in the bcrypt try part and error is :- ", err);

                } else {
                    let user = new UserModel({ username, email, mobile, no_of_wins, no_of_looses, scores, password: hash ,avtar:user_avtar});
                    await user.save();
                    res.status(200).send({ message: "signup successfully.." });
                }
            } catch (error) {
              console.log(error)
                res.status(400).send({ message: "error in the bcrypt catch part" });
            }
        });
    } catch (error) {
        res.status(400).send({ message: "failed in sign up." })
    }
});

// this is post API for the login of the user.
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
  
    if (!user) res.status(404).send({ message: 'No such user found!' });
    const hash = user.password;
    bcrypt.compare(password, hash, async function (err, result) {
      if (result) {
        const token = jwt.sign(
          { email: user.email, userId: user._id },
          process.env.KEY
        );
        return res
          .status(200)
          .send({ message: 'Login Successfull', token, user });
      } else {
        res
          .status(401)
          .send({ message: 'Unauthorised Access, Please try again.' });
      }
    });

});









// exporting the userRouter.
module.exports = userRouter;







// {
//     "username":"rajparmar",
//     "email" : "rajparmar123@gmail.com",
//     "mobile" : 1234567890,
//     "password" : "rajparmar123",
//     "no_of_wins" : 0,
//     "no_of_looses" : 0,
//     "scores" : 0
//   }
const express = require("express"); //importing the express from package.
const bcrypt = require("bcrypt"); // importing the bcrypt from package.
const jwt = require("jsonwebtoken"); // importing jwt from jsonwebtoken

require('dotenv').config(); // importing the dotenv from package.


const UserModel = require("../models/user.model"); // importing UserModel from models folder.


const key = process.env.KEY; // importing the key value from .env
const salt = process.env.SALT; // imporing the salt value from .env


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
    try {
        bcrypt.hash(password, +salt, async (err, hash) => {
            try {
                if (err) {
                    res.status(400).send("error in the bcrypt try part and error is :- ", err);

                } else {
                    let user = new UserModel({ username, email, mobile, no_of_wins, no_of_looses, scores, password: hash });
                    await user.save();
                    res.status(200).send({ message: "signup successfully.." });
                }
            } catch (error) {
                res.status(400).send({ message: "error in the bcrypt catch part" });
            }
        });
    } catch (error) {
        res.status(400).send({ message: "failed in sign up." })
    }
});

// this is post API for the login of the user.
userRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.find({ username });
        const token = jwt.sign({ username: username }, key);
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    res.status(400).send("error in the bcrypt try part and error is :- ", err);
                } else if (result) {
                    res.status(200).send({ message: "You have successfully logged in...", token: token });
                } else {
                    res.status(400).send({ message: "wrong credentials, please try again with right one..." });
                }
            });
        } else {
            res.status(400).send({ message: "wrong credentials, please try again with right one..." });
        }
    } catch (error) {
        res.status(400).send("error in the bcrypt catch part and error is :- ", error);
    }

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
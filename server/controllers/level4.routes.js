const express = require("express"); //importing the express from package.

require('dotenv').config(); // importing the dotenv from package.


const level4Model = require("../models/level4.model"); // importing level4Model from models folder.


const level4Router = express.Router(); // creating the saperate router for the user routes.



// this is the post API for adding the word in DB.
level4Router.post("/add", async (req, res) => {
    let {word , hint , clue1 , clue2} = req.body;
    word = word.toUpperCase();
    try {
        let newWord = new level4Model({word , hint , clue1 , clue2});
        await newWord.save();
        res.status(200).send({ message: "sucessfully added the word..." });
    } catch (error) {
        res.status(400).send({ message: "failed to adding data.." });
    }
});

// this is delete API for deleting the word object from the DB.
level4Router.delete("/delete/:id", async (req, res) => {
    let id = req.params.id;
    try {
        await level4Model.findByIdAndDelete({ _id: id });
        res.status(200).send({ message: "Deleted successfully..." });
    } catch (error) {
        res.status(400).send({ message: "failed in Deleting..." });

    }

});

//this is Patch API for updating the word object.
level4Router.patch("/update/:id "  , async (req ,res) => {
    let id = req.params.id;
    try {
        await level4Model.findByIdAndUpdate({_id : id} , req.body);
        res.status(200).send({message : "updated the data successfully..."});
    } catch (error) {
        res.status(400).send({message : "filed in updating the data..."});
    }
});



// exporting the level4Router.
module.exports = level4Router;
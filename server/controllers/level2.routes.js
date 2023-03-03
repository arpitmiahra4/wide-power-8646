const express = require("express"); //importing the express from package.

require('dotenv').config(); // importing the dotenv from package.


const Level2Model = require("../models/level2.model"); // importing level2Model from models folder.


const level2Router = express.Router(); // creating the saperate router for the user routes.



// this is the post API for adding the word in DB.
level2Router.post("/add", async (req, res) => {
    try {
        let newWord = new Level2Model(req.body);
        await newWord.save();
        res.status(200).send({ message: "sucessfully added the word..." });
    } catch (error) {
        res.status(400).send({ message: "failed to adding data.." });
    }
});

// this is delete API for deleting the word object from the DB.
level2Router.delete("/delete/:id", async (req, res) => {
    let id = req.params.id;
    try {
        await Level2Model.findByIdAndDelete({ _id: id });
        res.status(200).send({ message: "Deleted successfully..." });
    } catch (error) {
        res.status(400).send({ message: "failed in Deleting..." });

    }

});

//this is Patch API for updating the word object.
level2Router.patch("/update/:id "  , async (req ,res) => {
    let id = req.params.id;
    try {
        await Level2Model.findByIdAndUpdate({_id : id} , req.body);
        res.status(200).send({message : "updated the data successfully..."});
    } catch (error) {
        res.status(400).send({message : "filed in updating the data..."});
    }
});



// exporting the userRouter.
module.exports = level2Router;
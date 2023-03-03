const mongoose = require('mongoose');

const level4Schema = mongoose.Schema({
    word : {type : String , require : true},
    hint : {type : String , require : true},
    clue1 : {type : String , require : true},
    clue2 : {type : String , require : true},
});

const Level4Model = mongoose.model('level4', level4Schema);

module.exports = Level4Model;
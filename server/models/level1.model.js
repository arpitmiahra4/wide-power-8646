const mongoose = require('mongoose');

const level1Schema = mongoose.Schema({
    word : {type : String , require : true},
    hint : {type : String , require : true},
    clue1 : {type : String , require : true},
    clue2 : {type : String , require : true},
});

const Level1Model = mongoose.model('level1', level1Schema);

module.exports = Level1Model;
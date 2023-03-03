const mongoose = require('mongoose');

const level3Schema = mongoose.Schema({
    word : {type : String , require : true},
    hint : {type : String , require : true},
    clue1 : {type : String , require : true},
    clue2 : {type : String , require : true},
});

const Level3Model = mongoose.model('level3', level3Schema);

module.exports = Level3Model;
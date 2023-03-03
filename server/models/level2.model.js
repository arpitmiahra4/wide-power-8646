const mongoose = require('mongoose');

const level2Schema = mongoose.Schema({
    word : {type : String , require : true},
    hint : {type : String , require : true},
    clue1 : {type : String , require : true},
    clue2 : {type : String , require : true},
});

const Level2Model = mongoose.model('level2', level2Schema);

module.exports = Level2Model;
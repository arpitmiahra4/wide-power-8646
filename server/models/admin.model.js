const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    username: { type: String, required: true },
    isAdmin:{type:Boolean,default:true,require:true},
    avtar:{type:String,require:true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile :{ type: Number, required: true },
    no_of_wins:{ type: Number, required: true },
    no_of_looses:{ type: Number, required: true },
    scores:{ type: Number, required: true }
})

const AdminModel = mongoose.model('admin', adminSchema);

module.exports = AdminModel;
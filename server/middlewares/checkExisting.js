const UserModel = require("../models/user.model")

const checkExisting = async (req,res,next)=>{
    try{
        const {email, username}= req.body;
        const match = await UserModel.find({email})
        if(match.length>0)
        {
            res.status(400).send({msg : 'Email already exist'});
        }
        else
        {
            next();
        }
    }
    catch(err){
        res.send({msg : err.message});
    }
}
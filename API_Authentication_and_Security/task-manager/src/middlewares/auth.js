const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const auth = async function (req,res,next){
    try{
        const token = req.header('Authorization');//hear header is a function
        const decode = jwt.verify(token,"userToken")
        const user = await userModel.findOne({ _id:decode._id,'tokens.token':token});
        if(!user){
            throw new Error()
        }
        req.user=user;
        next();


    }catch(err){
       res.status(400).send("Unauthentication err");
    }
    
    
    
}

module.exports = auth;
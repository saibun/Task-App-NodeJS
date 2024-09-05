const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const auth = async function (req,res,next){
    try{
        let token = req.header('Authorization');//hear header is a function
        token = token.split(" ")[1];//In Postman at Authorizaton Bearer token option present that concat "Bearer" with token string to remove "Bearer" this step taken
        const decode = jwt.verify(token,"userToken");
        const user = await userModel.findOne({ _id:decode._id,'tokens.token':token});
        if(!user){
            throw new Error("Invalid user")
        }
        req.token =token;
        req.user=user;
        next();


    }catch(err){
       res.status(400).send("Unauthentication err");
    }
    
    
    
}

module.exports = auth;
const mongoose = require("mongoose");
const validator = require("validator");

//create user model 
const userModel = mongoose.model('User',{
    name: {
        type:"string",
        required:true,
        trim:true,
        lowercase:true,
    },
    email: {
        type:"String",
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if( !validator.isEmail(value)){
                throw new Error("unsuitable email address");
            }

        }
        
    },
    age:{
        type:"number",
        default:18,
        validate(value){
            if(value<18){
                throw new Error("Minors not allowed")
            }
            
        },
        
    },
    password:{
        type:"string",
        minLength:4,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("password can't be password");
            }
        }
    }
});

module.exports = userModel;
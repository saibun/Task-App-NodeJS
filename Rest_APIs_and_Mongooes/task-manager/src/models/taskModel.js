const mongoose = require("mongoose");

//create task model
const taskModel = mongoose.model('task',{
    desc:{
        type:"string",
        default:"",
        trim:true,



    },
    completed:{
        type:"boolean",
        default:false,
    }
})

module.exports = taskModel
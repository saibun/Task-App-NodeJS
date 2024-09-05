const mongoose = require("mongoose");

//create task model
const taskModel = mongoose.model('Task',{
    desc:{
        type:"string",
        default:"",
        trim:true,



    },
    completed:{
        type:"boolean",
        default:false,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

module.exports = taskModel
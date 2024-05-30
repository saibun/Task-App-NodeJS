const mongoose = require("mongoose");
const connectionURL = "mongodb://127.0.0.1:27017/api-task"
const validator = require("validator");
//mongoose connection with server
mongoose.connect(connectionURL);

//create model
// const userModel = mongoose.model('User',{
//     name: {
//         type:"string",
//         required:true,
//         trim:true,
//         lowercase:true,
//     },
//     email: {
//         type:"String",
//         required:true,
//         trim:true,
//         lowercase:true,
//         validate(value){
//             if( !validator.isEmail(value)){
//                 throw new Error("unsuitable email address");
//             }

//         }
        
//     },
//     age:{
//         type:"number",
//         default:18,
//         validate(value){
//             if(value<18){
//                 throw new Error("Minors not allowed")
//             }
            
//         },
        
//     },
//     password:{
//         type:"string",
//         minLength:4,
//         trim:true,
//         validate(value){
//             if(value.toLowerCase().includes("password")){
//                 throw new Error("password can't be password");
//             }
//         }
//     }
// });

//create an instance of that model
// const person = new userModel({
//     name:"Sayantan Banerjee",
//     email:"sayantan@gmail.com",
//     password:"sayantanAbc"
// })

//save the document
//  person.save().then((data)=>console.log(data)).catch((err)=>console.log(err.message))


//-----------------------------------------------------------------
//Task Model creation.

//create task model
// const task_model = mongoose.model('userTask',{
//     desc:{
//         type:"string",
//         required: true,//Data sanitization by doing mongoose validation
//         minLength:2,
//         trim:true,
//     },
//     completed:{
//         type:"boolean",
//         default:false,
//     }
// })

// //create an instance of model
// const task = new task_model({
    
// })

// task.save().then((data)=>console.log(data)).catch((err)=>console.log(err));
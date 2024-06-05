const express = require("express");
const app = express();
const port = 3000;
require("./db/mongoose");
const userModel = require("./models/userModel");

//import taskmodel
const taskModel = require("./models/taskModel");

//parse JSON into javascript obj
app.use(express.json());

//create method to add users
app.post('/users',(req,res)=>{

    //create new instance of model
    const user = new userModel(req.body);
    
    user.save().then((data)=>{
        res.status(201).send(data);
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

//get all users details
app.get('/users',(req,res)=>{
    userModel.find().then((data)=>{
        res.status(200).send(data);
    }).catch((err)=>{
        res.status(500).send(err.message);
    })
})

//get a specific user by user id
app.get("/users/:id",(req,res)=>{
    const user_given_id = req.params.id;
    console.log(user_given_id);
    userModel.findById(user_given_id).then((data)=>{
        if(!data){
            return res.status(404).send("No data found")
        }
        res.status(200).send(data);
    }).catch((err)=>{
        res.status(400).send(err.message);
    })
})

//------------------------------------- task related codes----------------------------
//create a task for users
app.post('/task',(req,res)=>{
    const task = new taskModel(req.body);
    task.save().then((data)=>{
        res.status(201).send(data)
    }).catch((err)=>{
        res.status(400).send(err.message);
    })
})
app.listen(port,()=>{
    console.log("Listing at ", port);
})

//get all created task
app.get('/task',(req,res)=>{
    taskModel.find().then((data)=>{
        res.status(200).send(data);
    }).catch((err)=>{
        res.status(500).send(err.message)
    })
})

//get a particular task by taskid
app.get('/task/:id',(req,res)=>{
    const taskId = req.params.id;
    taskModel.findById(taskId).then((data)=>{
        if(!data){
           return res.status(400).send("Not Found");
        }
        res.status(200).send(data);
    }).catch((err)=>{
        res.status(500).send(err.message)
    })
})
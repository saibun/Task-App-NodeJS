const express = require("express");
const app = express();
const port = 3000;
require("./db/mongoose");
const userModel = require("./models/userModel");

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
app.listen(port,()=>{
    console.log("Listing at ", port);
})
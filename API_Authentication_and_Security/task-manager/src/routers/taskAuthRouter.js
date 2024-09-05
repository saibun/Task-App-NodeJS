const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth");
require("../db/mongoose");
const taskModel = require("../models/taskModel");

//create a task for a particular active user
router.post('/task', auth,async (req, res) => {
    try {
        const task = new taskModel({...req.body,author:req.user._id});
        const data = await task.save();
        res.status(201).send(data);
    } catch (err) {
        res.status(400).send(err);
    }


})

//get a particular task by taskid and created by particular user who login .
router.get('/task/:id',auth, async (req, res) => {
    const taskId = req.params.id;
    try {
       const data = await taskModel.findOne({_id:taskId,author:req.user._id})
        if (!data) {
            return res.status(400).send("Not Found");
        }
        res.status(200).send(data);

    } catch (err) {
        res.status(500).send(err.message)
    }
})

//get all task of an authentic user
router.get("/task",auth, async(req,res)=>{
    try{
        
        //const task = await taskModel.find({author:req.user._id});
        const user = await req.user.populate('task');
        if(!user){
            res.status(404);


        }
        res.status(200).send(user.task);
        

    }catch(err){
        res.status(500).send(err);
    }
    

})

//update a particlar task of a particular user
router.patch('/task/:id', auth,async(req,res)=>{
    const update_req = Object.keys(req.body);
    const update_pr = ['desc','completed'];
    const isValid = update_req.every((value)=> update_pr.includes(value)) ;
    if(!isValid){
        return res.status(400).send("Mismatch properties");
    }
    try{
        const task = await taskModel.findOne({_id:req.params.id,author:req.user._id});
        if(!task){
            return res.status(400).send("Unable to update");
        }
        update_req.forEach((data)=>{
            task[data] = req.body[data];
        })
        await task.save();
        
        res.status(200).send(task);
    }catch(err){
        res.status(500).send(err.message);

    }

})

router.delete("/task/:id", auth, async(req,res)=>{
    const task_id = req.params.id;
    try{
        const task_delete_data = await taskModel.findOneAndDelete({_id:task_id, author: req.user._id});
        if(!task_delete_data){
           return res.status(204).send()
        }
        res.status(202).send();

    }catch(err){
        res.status(500).send(err)
    }
    
})

module.exports=router;
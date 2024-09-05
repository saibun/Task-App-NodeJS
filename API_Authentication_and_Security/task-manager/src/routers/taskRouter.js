const express = require("express");
const router = new express.Router();
require("../db/mongoose");
//import taskmodel
const taskModel = require("../models/taskModel");

//create a task for users
router.post('/task', async (req, res) => {
    // const task = new taskModel(req.body);
    // task.save().then((data) => {
    //     res.status(201).send(data)
    // }).catch((err) => {
    //     res.status(400).send(err.message);
    // })
    try {
        const task = new taskModel(req.body);
        const data = await task.save();
        res.status(201).send(data);
    } catch (err) {
        res.status(400).send(err);
    }


})

//get all created task
router.get('/task', async (req, res) => {
    // taskModel.find().then((data) => {
    //     res.status(200).send(data);
    // }).catch((err) => {
    //     res.status(500).send(err.message)
    // })

    try {
        const data = await taskModel.find();
        res.status(200).send(data);

    } catch (err) {
        res.status(500).send(err.message);
    }
})

//get a particular task by taskid
router.get('/task/:id', async (req, res) => {
    const taskId = req.params.id;
    // taskModel.findById(taskId).then((data) => {
    //     if (!data) {
    //         return res.status(400).send("Not Found");
    //     }
    //     res.status(200).send(data);
    // }).catch((err) => {
    //     res.status(500).send(err.message)
    // })

    try {
        const data = await taskModel.findById(taskId);
        if (!data) {
            return res.status(400).send("Not Found");
        }
        res.status(200).send(data);

    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.patch('/task/:id', async(req,res)=>{
    const id = req.params.id;
    const update_req = Object.keys(req.body);
    const update_pr = ['desc','completed'];
    const isValid = update_req.every((value)=> update_pr.includes(value)) ;
    if(!isValid){
        return res.status(400).send("Mismatch properties");
    }
    try{
        const task = await taskModel.findById(id);
        update_req.forEach((data)=>{
            task[data] = req.body[data];
        })
        await task.save();
        if(!task){
            return res.status(400).send("Unable to update")

        }
        res.status(200).send(task);



    }catch(err){
        res.status(500).send(err.message);

    }

})

//delete a task
router.delete("/task/:id", async(req,res)=>{
    const task_id = req.params.id;
    try{
        const task_delete_data = await taskModel.findByIdAndDelete(task_id);
        if(!task_delete_data){
           return res.status(204).send()
        }
        res.status(200).send(task_delete_data);

    }catch(err){
        res.status(500).send(err)
    }
    
})

module.exports = router

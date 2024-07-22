const express = require("express");
const app = express();
const port = 3000;
require("./db/mongoose");
const userModel = require("./models/userModel");

//import taskmodel
const taskModel = require("./models/taskModel");

const userRoute = require("./routers/userRouter");

//parse JSON into javascript obj
app.use(express.json());

//register routers
app.use(userRoute);

//create method to add users
app.post('/users', async (req, res) => {

    //create new instance of model
    //const user = new userModel(req.body);

    // user.save().then((data)=>{
    //     res.status(201).send(data);
    // }).catch((err)=>{
    //     res.status(400).send(err);
    // })

    //write the same code using async await
    try {
        const user = new userModel(req.body);
        const data = await user.save();
        res.status(201).send(data);

    } catch (err) {
        res.status(400).send(err);

    }
})

//get all users details
app.get('/users', async (req, res) => {
    // userModel.find().then((data)=>{
    //     res.status(200).send(data);
    // }).catch((err)=>{
    //     res.status(500).send(err.message);
    // })

    //finding all users using async await :: same working as upper code
    try {
        const data = await userModel.find();
        res.status(200).send(data);

    } catch (err) {
        res.status(500).send(err.message);

    }

})

//get a specific user by user id
app.get("/users/:id", async (req, res) => {
    const user_given_id = req.params.id;
    // userModel.findById(user_given_id).then((data) => {
    //     if (!data) {
    //         return res.status(404).send("No data found")
    //     }
    //     res.status(200).send(data);
    // }).catch((err) => {
    //     res.status(400).send(err.message);
    // })

    //With async await and try-catch
    try {
        const data = await userModel.findById(user_given_id);
        if (!data) {
            return res.status(404).send("No data found")
        }
        res.status(200).send(data);

    } catch (err) {
        res.status(400).send(err.message);


    }
})

//update a user
app.patch('/users/:id', async (req, res) => {
    const allowUpdates = ["name","email","age","password"];
    const updateRequest = Object.keys(req.body);
    const isValidUpdate = updateRequest.every((value)=> allowUpdates.includes(value));
    if(!isValidUpdate){
        return  res.status(400).send({
            error:"Invalid Properties !"
        });

    }

    try {
        const user_id = req.params.id;
        const update_data = req.body;
        
        const data = await userModel.findByIdAndUpdate(user_id, update_data,{new:true, runValidators:true})
        if(!data){
           return  res.status(404).send("NOT FOUND");
        }
        res.status(200).send(data)

    }catch(err){
        res.status(400).send(err.message);
    }

});

//delete a user
app.delete("/users/:id", async(req,res)=>{
    console.log("id ", user_id);
    try{
        const user_delete_data = await userModel.findByIdAndDelete(user_id);
        if(!user_delete_data){
           return res.status(204)
        }
        res.status(200).send(user_delete_data);

    }catch(err){
        res.status(500).send(err)
    }
    
})

//------------------------------------- task related codes----------------------------
//create a task for users
app.post('/task', async (req, res) => {
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
        res.status(400).send(err.message);
    }


})

//get all created task
app.get('/task', async (req, res) => {
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
app.get('/task/:id', async (req, res) => {
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

app.patch('/task/:id', async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const update_req = Object.keys(req.body);
    console.log("properties", update_req);
    const update_pr = ['desc','completed'];
    const isValid = update_req.every((value)=> update_pr.includes(value)) ;
    if(!isValid){
        return res.status(400).send("Mismatch properties");
    }
    try{
        const data = await taskModel.findByIdAndUpdate(id,req.body,{ new: true, runValidators: true});
        console.log(data);
        res.status(200).send(data);



    }catch(err){
        res.status(500).send(err);

    }

})

//delete a task
app.delete("/task/:id", async(req,res)=>{
    const task_id = req.params.id;
    try{
        const task_delete_data = await taskModel.findByIdAndDelete(task_id);
        if(!task_delete_data){
           return res.status(204).send("Deleted")
        }
        res.status(200).send(task_delete_data);

    }catch(err){
        res.status(500).send(err)
    }
    
})

app.listen(port, () => {
    console.log("Listing at ", port);
})


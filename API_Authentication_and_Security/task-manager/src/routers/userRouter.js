const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth");
require("../db/mongoose");
const userModel = require("../models/userModel");

//create method to add users
router.post('/users', async (req, res) => {

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
        const token = await user.getAuthToken(user._id);
        res.status(201).send({data,token});

    } catch (err) {
        res.status(400).send(err);

    }
})

//get all users details
router.get('/users', async (req, res) => {
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
//get a authenticated user by help of middleware and token (generate by jwt.)
router.get("/users/me",auth, (req,res)=>{
    res.status(200).send(req.user);
})

//get a specific user by user id
router.get("/users/:id", async (req, res) => {
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
router.patch('/users/:id', async (req, res) => {
    const allowUpdates = ["name", "email", "age", "password"];
    const updateRequest = Object.keys(req.body);
    const isValidUpdate = updateRequest.every((value) => allowUpdates.includes(value));
    if (!isValidUpdate) {
        return res.status(400).send({
            error: "Invalid Properties !"
        });

    }

    try {
        const given_user = await userModel.findById(req.params.id)

        //For make middlewares working change update strategy form findbyidandupdate to first serach by id and then iterate to do the update.
        updateRequest.forEach((data) => {
            given_user[data] = req.body[data];

        })
        await given_user.save();


        if (!given_user) {
            return res.status(404).send("NOT FOUND");
        }
        res.status(200).send(given_user)

    } catch (err) {
        res.status(400).send(err.message);
    }

});

//delete a user
router.delete("/users/:id", async (req, res) => {
    try {
        const user_delete_data = await userModel.findByIdAndDelete(req.params.id);
        if (!user_delete_data) {
            return res.status(204).send()
        }
        res.status(200).send(user_delete_data);

    } catch (err) {
        res.status(500).send(err)
    }

})

//Login a user
router.post("/users/login", async (req, res) => {
    try {
        const user = await userModel.findCredentials(req.body.email, req.body.password);
        const token = await user.getAuthToken(user._id);

        if (!user) {
            res.status(400).send("Not Found");
        }
        res.status(200).send({
            user,
            token
        });

    } catch (err) {
        res.status(500).send(err.message);

    }

})

module.exports = router;
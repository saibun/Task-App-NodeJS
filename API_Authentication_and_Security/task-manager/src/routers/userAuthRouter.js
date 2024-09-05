const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth");
require("../db/mongoose");
const userModel = require("../models/userModel");

//get a authenticated user by help of middleware and token (generate by jwt.)
router.get("/auth",auth, (req,res)=>{
    res.status(200).send(req.user);
})

//Log out
router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((value)=>{
            return req.token!= value.token;
        })
        await req.user.save();
        res.status(200).send("Loged out")

    }catch(err){
        res.status(400).send(err.message);

    }
    

})

//Logged out All sesons
router.post('/users/logoutAll', auth,async(req,res)=>{
    try{
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send();

    }catch(err){
        res.status(400).send(err.message)
    }
    
})

router.delete("/users",auth,async(req,res)=>{
    try{
        const user = await req.user.deleteOne();
        if(!user){
            res.status(204).send()
        }
        res.status(200).send()

    }catch(err){
        res.status(400).send(err);
    }
    
})

router.patch('/users',auth, async (req, res) => {
    const allowUpdates = ["name", "email", "age", "password"];
    const updateRequest = Object.keys(req.body);
    const isValidUpdate = updateRequest.every((value) => allowUpdates.includes(value));
    if (!isValidUpdate) {
        return res.status(400).send({
            error: "Invalid Properties !"
        });

    }

    try {
        const given_user = req.user;
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

module.exports = router;
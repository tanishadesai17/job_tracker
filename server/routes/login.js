const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// REGISTER
router.post("/register", async (req,res)=>{

    try{
        const {username,password} = req.body;
        const userExists = await User.findOne({username}); 

        if(userExists){
            return res.status(400).json({message:"User exists" });}

        const user = new User({username, password});
        await user.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"2d"});
        res.status(201).json({message:"User created",token,userId:user._id,username:user.username});

    }catch(error){

        res.status(500).json({message:"Error creating user"});
        console.log(error)
    }

});


// LOGIN
router.post("/login", async (req,res)=>{

    try{

        const {username,password} = req.body;
        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({message:"Invalid credentials"});}

        const match = await user.comparePassword(password);

        if(!match){
            return res.status(400).json({message:"Invalid credentials"});}

        const token = jwt.sign(
            {id:user._id}, process.env.JWT_SECRET, {expiresIn:"2d"});

        res.json({token,userId:user._id,username:user.username});

    }catch(error){
        console.log(error); 
        res.status(500).json({message:"Login failed"});

    }

});

module.exports = router;
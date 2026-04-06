const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req,res,next)=>{
    try{
        const header = req.header("Authorization");
        if(!header){
            return res.status(401).json({message:"No token"});
        }

        const token = header.replace("Bearer ","");
        const tokenkey = jwt.verify(token, process.env.JWT_SECRET
        );

        const user = await User.findById(tokenkey.id).select("-password");

        if(!user){
            return res.status(401).json({message:"User not found"});
        }
        req.user = user;
        next();

    }catch(error){

        res.status(401).json({message:"Not authorized"});
    }
};

module.exports = auth;
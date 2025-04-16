const User=require("../models/user")
const {setuser,getuser}=require("../service/auth")
const { v4: uuidv4 } = require('uuid');

exports.signup=async (req,res)=>{
    const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  console.log(__dirname,"user signed up")
  res.redirect("/");
}

exports.login=async (req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email,password})
    console.log(user)
    if(!user){
        res.send("email or password invalid")
    }
    // const sessionid=uuidv4()
    const token=setuser(user)
    res.cookie("uid",token)
    res.redirect("/")
    
}
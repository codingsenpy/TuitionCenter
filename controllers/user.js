const User=require("../models/user")

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
    else{
        res.redirect("/")
    }
}
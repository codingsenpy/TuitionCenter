const path=require("path")

exports.home=(req,res)=>{
    console.log("main js running")
    res.sendFile(path.join(__dirname,'../','views','login.html'))
}
exports.homeregister=(req,res)=>{
    res.sendFile(path.join(__dirname,'../','views','register.html'))
}

exports.login=(req,res)=>{
    console.log("Received Data:", req.body);
    res.send(`Received: Name - ${req.body.fname}, Email - ${req.body.femail} ${req.body.fpass}`);
}

exports.register=(req,res)=>{
    
    console.log("Received Data:", req.body);
    res.send(`Received: Name - ${req.body.fname}, Email - ${req.body.femail} ${req.body.fpass}`);

}
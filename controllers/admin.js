const centers=require("../models/centers")

exports.dashbord=async (req,res)=>{
    console.log("In the admin dashbord")
    console.log(req.url)
    let data=req.body
    const center=new centers(data)
    await center.save();
    console.log("maybe data created")
    res.send("dashbord")
}

exports.newteacher=async(req,res)=>{
    const centerId = req.params.centerID
    console.log(centerId)
    const data=req.body
    await centers.updateOne(
        { centerID: centerId }, // Find the center by centerID
        { $set: { teacher: data } } // Assign the teacher
    );
    res.send("done")
}
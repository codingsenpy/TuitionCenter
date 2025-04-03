const students=require("../models/student")
const centers=require("../models/centers")

exports.teacherdashbord=async (req,res)=>{
    console.log("req.originalUrl:", req.originalUrl);
    // data=req.body
    // const stds=new students(data)
    // await stds.save()
    res.send("Welcome teacher")
}

exports.addstd=async (req,res)=>{
    const centerId = req.params.centerID
    console.log(typeof(centerId))
    const data=req.body

    if (data.attendance) {
        data.attendance = data.attendance.map(entry => ({
            date: new Date(entry.date), // Convert to Date
            status: entry.status
        }));
    }

    await centers.updateOne(
        { centerID: centerId }, 
        { $push: { students: data } }
        );
 }
const path=require("path")
// const moment = require('moment');

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

 exports.showstudents=async (req, res) => {
    try {
        const center = await centers.findOne({ centerID: req.params.id }, 'students');
        if (!center) return res.status(404).send("Center not found");
        res.json(center.students);
      } catch (err) {
        res.status(500).send('Server Error');
      }
};

exports.attendance=async (req,res)=>{
    res.sendFile(path.join(__dirname,'../','views','loc.html'))
}

exports.attedanceOfAllStudents=async (req,res)=>{

}

exports.location=async (req,res)=>{
    req.body.center="C124"
    const { latitude, longitude, center } = req.body;
    console.log('Received location:', latitude, longitude, center);
    if(!latitude) res.send("Unable to fetch Location")
    const centerlocation = await centers.findOne({ centerID: center }, { location: 1, _id: 0 });
    console.log(centerlocation)
    if(`${latitude} ${longitude}`==centerlocation.location){
        console.log("attendance succesfull")
        res.send("Attendance success")
    }
    else{
        console.log("Fail")
    }
}
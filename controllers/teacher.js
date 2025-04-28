const path=require("path")
// const moment = require('moment');
const users=require("../models/user")
const Students=require("../models/student")
const centers=require("../models/centers")

exports.teacherdashbord=async (req,res)=>{
    console.log("req.originalUrl:", req.originalUrl);
    // data=req.body
    // const stds=new students(data)
    // await stds.save()
    res.send("Welcome teacher")
}

exports.addstd = async (req, res) => {
    try {
      const centerId = req.params.centerID;
      const { studentsarr, tutormail } = req.body;
      
      if (!centerId || !Array.isArray(studentsarr) || studentsarr.length === 0) {
        return res.status(400).send("Missing required student data or centerID");
      }
  
      const existing = await users.findOne({ email: tutormail });
      const centerexisting=await centers.findOne({centerID:centerId})
  
      if (!existing||!centerexisting) {
        return res.status(404).send("Tutor or center not found");
      }
      const preparedStudents = studentsarr.map(student => {
        if (!student.name || !student.studentId) {
          throw new Error("Each student must have name and studentId");
        }
        return {
          name: student.name,
          studentId: student.studentId,
          attendance: [],
          centerID: centerexisting._id,
          tutorID: existing._id,
        };
      });
      const insertedStudents = await Students.insertMany(preparedStudents);
      const studentIds = insertedStudents.map(s => s._id);
      const result = await centers.updateOne(
        { centerID: centerId },
        { $push: { students: { $each: studentIds } } }
      );
  
      if (result.modifiedCount === 0) {
        return res.status(404).send("Center not found or no update made");
      }
  
      res.send("Students added successfully");
    } catch (err) {
      console.error("Error adding students:", err);
      res.status(500).send("Internal server error");
    }
  };

  exports.removestd = async (req, res) => {
    try {
        const centerId = req.params.centerID;
        const { studentIds } = req.body; // Array of studentId (strings)

        if (!centerId || !Array.isArray(studentIds) || studentIds.length === 0) {
            return res.status(400).send("Missing or invalid centerID or studentIds");
        }
        const studentsToRemove = await students.find({ studentId: { $in: studentIds } });

        if (studentsToRemove.length === 0) {
            return res.status(404).send("No matching students found");
        }
        const studentObjectIds = studentsToRemove.map(s => s._id);

        const result = await centers.updateOne(
            { centerID: centerId },
            { $pull: { Students: { $in: studentObjectIds } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).send("No students removed from center");
        }
        await Students.deleteMany({ studentId: { $in: studentIds } });

        res.send("Students removed successfully");
    } catch (err) {
        console.error("Error removing students:", err);
        res.status(500).send("Internal server error");
    }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Students.find();
    res.status(200).json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).send("Internal server error");
  }
};

 exports.showstudents=async (req, res) => {
  try {
    const centerId = req.params.centerID;

    if (!centerId) {
      return res.status(400).send("Missing centerID");
    }

    const center = await centers.findOne({ centerID: centerId }).populate('students');
console.log(center)
    if (!center) {
      return res.status(404).send("Center not found");
    }

    res.status(200).json(center.students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).send("Internal server error");
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const { presentStudentIds } = req.body;

    if (!Array.isArray(presentStudentIds)) {
      return res.status(400).send("Invalid presentStudentIds");
    }

    // Fetch all students who are not present in the presentStudentIds
    const allStudents = await Students.find({});

    const updates = allStudents.map(async (student) => {
      const attendanceStatus = presentStudentIds.includes(student.studentId)
        ? "Present"
        : "Absent";

      student.attendance.push({
        status: attendanceStatus,
        date: new Date(),
      });

      await student.save();
    });

    await Promise.all(updates);

    res.send("Attendance marked successfully");
  } catch (err) {
    console.error("Error marking attendance:", err);
    res.status(500).send("Internal server error");
  }
};

exports.attendance=async (req,res)=>{
    res.sendFile(path.join(__dirname,'../','views','loc.html'))
}

exports.attedanceOfAllStudents=async (req,res)=>{

}

exports.location=async (req,res)=>{
    const { latitude, longitude, center } = req.body;
    console.log('Received location:', latitude, longitude, center);
    if(!latitude) res.send("Unable to fetch Location")
    const centerlocation = await centers.findOne({ centerID: center }, { location: 1, _id: 0 });
    // centerlocation.location=`${latitude} ${longitude}`
    const newLat = parseFloat(parseFloat(latitude).toFixed(3));
    const newLon = parseFloat(parseFloat(longitude).toFixed(3))
    try{
        const {location}=centerlocation
        console.log(centerlocation, newLat, newLon, typeof location)
        console.log(Object.keys(centerlocation))
        console.log(JSON.stringify(centerlocation))
    if(`${newLat} ${newLon}`==centerlocation.location){
        console.log("attendance succesfull")
        res.send("Attendance success")
    }
    else{
        res.send("attendance fail")
        console.log("Fail")
    }
    }
    catch(err){
        res.send(err.message)
        console.log(err.message)
    }
}
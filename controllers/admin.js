const centers=require("../models/centers")
const User=require("../models/user")
const Students=require("../models/student")
const teacher=require("./teacher")
const {setuser,getuser}=require("../service/auth")
const { v4: uuidv4 } = require('uuid')

exports.dashbord=async (req,res)=>{
    // console.log("In the admin dashbord")
    // console.log(req.url)
    // let data=req.body
    // const center=new centers(data)
    // await center.save();
    // console.log("data created")
    // res.send("dashbord")
    res.send("ADMIN DASHBORD")
}

exports.addCenter = async (req, res) => {
    try {
        const { name,centerID,location,city,number, contactperson,  tutors, students } = req.body;

        if (!centerID ||!name) {
            return res.status(400).send("Center Id or name missingMissing required fields");
        }

        const existing = await centers.findOne({ centerID });
        if (existing) {
            return res.status(409).send("Center with this ID already exists");
        }

        const newCenter = new centers({
            name,
            centerID,
            location,
            number,
            contactperson,
            city,
            location,
            tutors: tutors || [],
            students: students || []
        });

        await newCenter.save();
        res.status(201).send("Center added successfully");
    } catch (err) {
        console.error("Error adding center:", err);
        res.status(500).send("Internal server error");
    }
};

exports.newteacher = async (req, res) => {
    const centerID = req.params.centerID;
    let { name, email, password,number,specialisation,qualification,experience,resume } = req.body;
    const role = 1; // 1 means Tutor
    password=password||"teacher123"
    
    try {
        if (!name || !email) {
            return res.status(400).send("Missing required fields");
        }
        const existing=await User.findOne({email})
        if(!existing){
            const newTutor = new User({
            name,
            email,
            password,
            role,
            number,
            specialisation,
            qualification,
            experience,
            resume
        });
        const savedTutor = await newTutor.save();
        
        if(centerID!="0"){
            const result = await centers.updateOne(
            { centerID: centerID },
            { $push: { tutors: savedTutor._id } }
        );
        if (result.modifiedCount === 0) {
            return res.status(404).send("Center not found or no update made");
        }
        }
        
        }
        else{
          const tutorincenterexist= await centers.findOne({tutors:existing._id})
        if(tutorincenterexist){
          return res.send("tutor already exists")
        }
            const result = await centers.updateOne(
            { centerID: centerID },
            { $push: { tutors: existing._id } }
        );
        if (result.modifiedCount === 0) {
            return res.status(404).send("Center not found or no update made");
        }
        }
        
        res.send("Teacher added successfully");
    } catch (err) {
        console.error("Error adding teacher:", err);
        res.status(500).send("Internal server error");
    }
}

exports.removeTutorsFromCenter = async (req, res) => {
    try {
      const centerId = req.params.centerID;
      const { tutorEmails } = req.body; // array of tutor emails
  
      if (!centerId || !Array.isArray(tutorEmails) || tutorEmails.length === 0) {
        return res.status(400).send("Missing or invalid centerID or tutorEmails");
      }
      const tutors = await User.find({ email: { $in: tutorEmails }, role: 1 }); // role 1 = tutor
    const tutorIds = tutors.map(tutor => tutor._id);
      const result = await centers.updateOne(
        { centerID: centerId },
        { $pull: { tutors: { $in: tutorIds } } }
      );
  
      if (result.modifiedCount === 0) {
        return res.status(404).send("No tutors removed from center");
      }
  
      res.send("Tutors removed from center successfully");
    } catch (err) {
      console.error("Error removing tutors from center:", err);
      res.status(500).send("Internal server error");
    }
  };
  


exports.removeCenter = async (req, res) => {
    const { centerID } = req.params;
        const result = await centers.deleteOne({ centerID });

        if (result.deletedCount === 0) {
            return res.status(404).send("Center not found");
        }

        res.send("Center removed successfully");
    } 
 
exports.removeTeacher = async (req, res) => {
      try {
        const centerID = req.params.cId;
        const { email } = req.body;
       console.log(email,centerID)
            if (!centerID || !email) {
                return res.status(400).send("Missing centerID or teacher email");
            }
            const existing = await User.findOne(
                { email },
            );
            const emptytutor=await User.findOne({email: "Null"})
            if(!existing){
                return res.status(404).send("Teacher not found")
            }

            const result = await centers.updateOne(
                        { centerID: centerID },
                        { $pull: { tutors:  existing._id  } }
                    );
            // const result = await centers.updateOne(
            //     { centerID :centerID},
            //     { $pull: { tutors: existing._id } }
            // );
            const students = await Students.find({ tutorID: existing._id });
            const studentIds = students.map(s => s.studentId);
            await Students.updateMany(
                  { studentId: { $in: studentIds }, tutorID: existing._id },
                  { $set: { tutorID: emptytutor._id } }
                );
            const result2= await User.deleteOne({ email});

            if (result.modifiedCount == 0 && result2.deletedCount==0 &&
              studentUpdate.modifiedCount == 0) {
                return res.status(404).send("Teacher not found or already removed");
            }
    
            res.send("Teacher removed successfully");
        } catch (err) {
            console.error("Error removing teacher:", err);
            res.status(500).send("Internal server error");
        }
    };
    
    

    exports.seecenters=async (req, res) => {
        console.log("see centers")
        try {
          const Centers = await centers.find(); // fetch all centers with full data
          res.json(Centers);
        } catch (err) {
          res.status(500).send("Server Error");
        }
      }

      exports.removestd = async (req, res) => {
        try {
            const centerId = req.params.centerID;
            const { studentIds } = req.body; // array of studentId
    
            if (!centerId || !Array.isArray(studentIds) || studentIds.length === 0) {
                return res.status(400).send("Missing or invalid centerID or studentIds");
            }
    
            const result = await centers.updateOne(
                { centerID: centerId },
                { $pull: { students: { studentId: { $in: studentIds } } } }
            );
    
            if (result.modifiedCount === 0) {
                return res.status(404).send("No students removed");
            }
    
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

exports.getAllTutors = async (req, res) => {
  try {
    const tutors = await User.find({role:1});
    res.status(200).json(tutors);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).send("Internal server error");
  }
};

 exports.showtutors=async (req, res) => {
  try {
    const centerId = req.params.centerID;

    if (!centerId) {
      return res.status(400).send("Missing centerID");
    }

    const center = await centers.findOne({ centerID: centerId }).populate('tutors');
console.log(center)
    if (!center) {
      return res.status(404).send("Center not found");
    }

    res.status(200).json(center.tutors);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).send("Internal server error");
  }
};

exports.getStudentsByTutor = async (req, res) => {
  try {
    const tutorEmail = req.params.tutorMail;
    console.log(tutorEmail)
    const tutor = await User.findOne({ email: tutorEmail, role: 1 });
    if (!tutor) return res.status(404).send("Tutor not found");

    const students = await Students.find({ tutorID: tutor._id });
    res.json(students);
  } catch (err) {
    console.error("Error fetching students by tutor:", err);
    res.status(500).send("Server error");
  }
};
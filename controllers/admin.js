const centers=require("../models/centers")
const User=require("../models/user")
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
        const { centerID, contactnumber, contactperson, location,city, tutors, students } = req.body;

        if (!centerID || !contactnumber || !location) {
            return res.status(400).send("Missing required fields");
        }

        const existing = await centers.findOne({ centerID });
        if (existing) {
            return res.status(409).send("Center with this ID already exists");
        }

        const newCenter = new centers({
            centerID,
            contactnumber,
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
        const centerId = req.params.centerID;
        const data = req.body;
        console.log(data)
        let {name,email,password}=data
        const role=2
        if(!password){
            password="teacher123"
        }
        console.log(name,email,password)
    try {
        if (!centerId || !data) {
            return res.status(400).send("Missing centerID or teacher data");
        }

        const result = await centers.updateOne(
            { centerID: centerId },
            { $push: { tutors: data } } // Push teacher data into tutors array
        );

        if (result.modifiedCount === 0) {
            return res.status(404).send("Center not found or no update made");
        }

        res.send("Teacher added successfully");
    } catch (err) {
        console.error("Error adding teacher:", err);
        res.status(500).send("Internal server error");
    }
    try {
      await User.create({
        name,
        email,
        password,
        role
      });
      console.log(__dirname,"user signed up")
    } catch (err) {
      console.log(err, "err in signup");
      if (err.errorResponse.errmsg.includes("duplicate key")) {
        res.status(400).json({ message: "Email Already Exists!", success: false });
      } else {
        res.status(500).json({ message: "Internal Server Error!", success: false });
      }
    }
    }


exports.removeCenter = async (req, res) => {
    const { centerID } = req.params;
    console.log("trying to remove center")
        const result = await Center.deleteOne({ centerID });

        if (result.deletedCount === 0) {
            return res.status(404).send("Center not found");
        }

        res.send("Center removed successfully");
    } 

    exports.removeTeacher = async (req, res) => {
        const centerID = req.params.cId;
    
        if (!centerID) {
            return res.status(400).send("Center ID missing");
        }
    
        const center = await centers.findOne({ centerID });
    
        if (!center) {
            return res.status(404).send("Center not found");
        }
    
        center.tutors = [];
        await center.save();
    
        res.send("Teacher removed successfully");
    };
    

    exports.seecenters=async (req, res) => {
        try {
          const centers = await Centers.find(); // fetch all centers with full data
          res.json(centers);
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
    
      
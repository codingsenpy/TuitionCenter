const centers=require("../models/centers")

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
    const { centerID, location, teacher, students } = req.body;

        const newCenter = new Center({
            centerID,
            location,
            teacher,
            students
        });

        await newCenter.save();
        res.send("Center added successfully");
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

exports.removeCenter = async (req, res) => {
    const { centerID } = req.params;

        const result = await Center.deleteOne({ centerID });

        if (result.deletedCount === 0) {
            return res.status(404).send("Center not found");
        }

        res.send("Center removed successfully");
    } 

exports.removeTeacher = async (req, res) => {
    const { centerID } = req.params.cId;
        if (!center) {
            return res.status(404).send("Center not found");
         }
          center.teacher = null;
    
        await center.save();
        res.send("Teacher removed successfully");
    } 

    exports.seecenters=async (req, res) => {
        try {
          const centers = await Centers.find(); // fetch all centers with full data
          res.json(centers);
        } catch (err) {
          res.status(500).send("Server Error");
        }
      }
      
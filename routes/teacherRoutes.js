const express=require("express")
const path=require("path")
const teacher=require("../controllers/teacher")

const router=express.Router()

//add students to center
router.post("/addStudents/:centerID",teacher.addstd)
//remove student
router.delete("/removeStd/:centerID",teacher.removestd)
//students of the center
router.get("/students/:centerID",teacher.showstudents)
//teacher dashboard
// router.use("/students",teacher.teacherdashbord)
//mark todays attendance for students
router.put("/markattendance/:centerID",teacher.markAttendance)
//attendance page
router.use("/attendance",teacher.attendance)
//TODO
router.put("/reassignTutor/:centerID",teacher.swapStudentTutor)
//temperory route to fetch attendance, GEOLOCATION  
router.use("/location",teacher.location)

// router.post("/markAttedance",isLoggedIn,teacher.MarkAttendance)


module.exports=router
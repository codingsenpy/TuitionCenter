const express=require("express")
const path=require("path")
const admin=require("../controllers/admin")
const upload=require("../utils/utils")


const router=express.Router()

//add tutor to a center
// upload.single("resume")
router.post("/addtutor/:centerID",admin.newteacher)
//add new center
router.post("/addCenter",upload.array("images",5),admin.addCenter)
//remove center
router.delete("/removeCenter/:centerID",admin.removeCenter)
//remove tutor from center
router.delete("/removeTutor/:cId",admin.removeTeacher)
router.put("/removetutorsfrom/:centerID",admin.removeTutorsFromCenter)
//see all centers
router.get("/Centers",admin.seecenters)
router.get("/alltutors",admin.getAllTutors)
router.get("/tutors/:centerID",admin.showtutors)
router.get("/allstudents",admin.getAllStudents)
router.get("/students/:centerID",admin.showstudents)
//remove students
router.delete("/:centerID/removeSt",admin.removestd)
router.get("/studentsof/:tutorMail",admin.getStudentsByTutor)
//dashboard
router.use("/",admin.dashbord)


module.exports=router
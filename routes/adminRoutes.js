const express=require("express")
const path=require("path")
const admin=require("../controllers/admin")


const router=express.Router()

//add tutor to a center
router.use("/:centerID/addtutor",admin.newteacher)
//add new center
router.post("/addCenter",admin.addCenter)
//remove center
router.delete("/removeCenter/:centerID",admin.removeCenter)
//remove tutor from center
router.delete("/removeTutor/:cId",admin.removeTeacher)
//see all centers
router.get("/Centers",admin.seecenters)
//remove students
router.delete("/:centerID/removeSt",admin.removestd)
//dashboard
router.use("/",admin.dashbord)


module.exports=router
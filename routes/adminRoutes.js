const express=require("express")
const path=require("path")
const admin=require("../controllers/admin")


const router=express.Router()

router.use("/:centerID/addtutor",admin.newteacher)
router.use("/dashbord",admin.dashbord)
router.use("/addCenter",admin.addCenter)
router.use("/removeCenter:id",admin.removeCenter)
router.use("/removeTutor/:cId",admin.removeTeacher)
router.get("/Centers",admin.seecenters)


module.exports=router
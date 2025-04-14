const express=require("express")
const path=require("path")
const teacher=require("../controllers/teacher")

const router=express.Router()


router.use("/:centerID/addStudents",teacher.addstd)
router.get("/students/C/:id",teacher.showstudents)
router.use("/students",teacher.teacherdashbord)


module.exports=router
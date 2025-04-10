const express=require("express")
const path=require("path")
const teacher=require("../controllers/teacher")

router.use("/:centerID/addStudents",teacher.addstd)
router.use("/students",teacher.teacherdashbord)


module.exports=router
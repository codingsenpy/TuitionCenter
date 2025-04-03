const express=require("express")
const path=require("path")
const homepage=require("../controllers/home")
const admin=require("../controllers/admin")
const teacher=require("../controllers/teacher")

const router=express.Router()

router.use("/:centerID/addtutor",admin.newteacher)
router.use("/dashbord",admin.dashbord)
router.use("/:centerID/add",teacher.addstd)
router.use("/students",teacher.teacherdashbord)
router.get("",homepage.home)
router.get("/register",homepage.homeregister)
router.post("/login",homepage.login)
router.post("/register",homepage.register)

module.exports=router
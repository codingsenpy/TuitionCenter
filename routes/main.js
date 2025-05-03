const express=require("express")
const path=require("path")
const homepage=require("../controllers/home")
const user=require("../controllers/user")

const router=express.Router()

router.get("",homepage.home)
router.post("/signup",user.signup)
router.get("/signupform",homepage.homeregister)
router.get("/loginform",homepage.login)
router.post("/login",user.login)


module.exports=router
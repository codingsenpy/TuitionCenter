const express=require("express")
const path=require("path")
const homepage=require("../controllers/home")

const router=express.Router()

router.get("",homepage.home)
router.get("/register",homepage.homeregister)
router.post("/login",homepage.login)
router.post("/register",homepage.register)


module.exports=router
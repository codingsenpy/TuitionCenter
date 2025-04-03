const mongoose=require("mongoose")
const schema=mongoose.Schema

const teacherSchema=new schema({
    name: String,
    teacherId: String
})

module.exports=teacherSchema
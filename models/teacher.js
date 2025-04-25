const mongoose=require("mongoose")
const studentSchema=require("./student")
const schema=mongoose.Schema

const teacherSchema=new schema({
    name : {type : String, required: true},
    number : {type : Number, required: true},
    email : {type : String,required: true},
    specialisation: {type:String, required:true},
    qualification:{type:String},
    centerID:{type:String},
    experience:{type:String},
    resume:{type:String}
    // students:[studentSchema]
})

module.exports=teacherSchema
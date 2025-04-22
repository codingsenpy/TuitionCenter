const mongoose=require("mongoose")
const centerSchema=require("./center")
const studentSchema=require("./student")

const schema = mongoose.Schema

const user_schema = new schema(
    {
        name : {type : String, required: true},
        phno : {type : Number, required: true},
        email : {type : String,required: true},
        specialisation: {type:String, required:true},
        qualification:{type:Object},
        students:[studentSchema]
        
    }
)

module.exports = mongoose.model("user",user_schema)
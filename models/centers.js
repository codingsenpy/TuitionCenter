const mongoose=require("mongoose")
const tutorSchema=require("./teacher")
const studentSchema = require("./student")
const schema=mongoose.Schema

const centerSchema=new schema(
    {
        centerID: { type: String, required: true },
        location:{type:String, required:true},
        contactperson: { type: String, required: true },
        contactnumber: { type: Number, required: true },
        tutors:[tutorSchema],
        students:[studentSchema]
    }
)
const Centers = mongoose.model("centers", centerSchema);

module.exports = Centers;
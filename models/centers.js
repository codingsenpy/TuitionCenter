const mongoose=require("mongoose")
const tutorSchema=require("./teacher")
const studentSchema = require("./student")
// const imageSchema=require("./images")
const schema=mongoose.Schema

const centerSchema=new schema(
    {
        centerID: { type: String, required: true, unique:true },
        location:{type:String, required:true},
        city:{type:String},
        contactperson: { type: String},
        contactnumber: { type: Number, required: true },
        tutors:[tutorSchema],
        students:[studentSchema],
        // images:[imageSchema]
    }
)
const Centers = mongoose.model("centers", centerSchema);

module.exports = Centers;
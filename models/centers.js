const mongoose=require("mongoose")
const teacherSchema=require("./teacher")
const studentSchema=require("./student")
const schema=mongoose.Schema

const centerSchema=new schema(
    {
        centerID: { type: String, required: true },
        location:{type:String, required:true},
        teacher:teacherSchema,
        students: [studentSchema]
    }
)

const Centers = mongoose.model("Centers", centerSchema);

module.exports = Centers;
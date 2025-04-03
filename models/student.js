const mongoose=require("mongoose")
const schema=mongoose.Schema

const studentSchema=new schema(
    {
    name: String,
    studentId: String,
    attendance: [
        {
            date: Date,
            status: { type: String, enum: ["Present", "Absent"] }
        }
    ]
})

module.exports=studentSchema
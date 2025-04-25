const mongoose = require("mongoose")
const tutorSchema = require("./teacher")
const studentSchema = require("./student")
const schema = mongoose.Schema

const centerSchema = new schema(
    {
        name: { type: String, required: true },
        code: { type: String, required: true, unique: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        contactperson: { type: String },
        number: { type: Number, required: true },
        images: { type: [String], required: true },
        tutors: [tutorSchema],
        students: [studentSchema]
    }
)
const Centers = mongoose.model("centers", centerSchema);

module.exports = Centers;
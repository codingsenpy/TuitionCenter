const express=require("express")
const path=require("path")
const app=express()
const fs=require("fs")
const cors=require("cors")
const { restricttologin, checkAuth,adminonly , teacheronly} = require('./middleware/auth');
const mainroutes=require('./routes/main')

const adminRoutes= require('./routes/adminRoutes')
const teacherRoutes= require('./routes/teacherRoutes')
const mongoose=require("mongoose")
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());
app.use(cors())
// const mongoconnect=require("./utils/database")
app.use(express.urlencoded({ extended: true }));
//middleware for transfering html form data
app.use(express.json()); 
//for passing html form data as post
app.use(express.static(path.join(__dirname, 'public')));

const uploadDir=path.join(__dirname,"uploads")

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}


app.use('/admin',restricttologin,adminonly,adminRoutes)
app.use('/adminnoauth',adminRoutes)
app.use('/teacher',restricttologin,teacheronly,teacherRoutes)
app.use('/teachernoauth',teacherRoutes)
app.use('/',mainroutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server running on port 3000');
});
mongoose.connect("mongodb+srv://zain:mongopass@tuitioncenter.7z2uct8.mongodb.net/?retryWrites=true&w=majority&appName=TuitionCenter")
.then(() => console.log("DB Connected to Server!"))
.catch((err) => console.log(err));
// mongoconnect(()=>{}) 
    

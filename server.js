const express=require("express")
const path=require("path")
const app=express()
const { restricttologin, checkAuth } = require('./middleware/auth');
const mainroutes=require('./routes/main')
const formroutes=require('./routes/form')
const adminRoutes= require('./routes/adminRoutes')
const teacherRoutes= require('./routes/teacherRoutes')
const mongoose=require("mongoose")
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// const mongoconnect=require("./utils/database")
app.use(express.urlencoded({ extended: true }));
//middleware for transfering html form data
app.use(express.json()); 

app.use('/admin',restricttologin,adminRoutes)
app.use('/teacher',restricttologin,teacherRoutes)
app.use('/',mainroutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

mongoose.connect("mongodb://localhost:27017").then(() => console.log("DB Connected to Server!"))
.catch((err) => console.log(err));
// mongoconnect(()=>{})
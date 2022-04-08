const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();

const mongoose = require('mongoose')
mongoose.connect(process.env.mongoDbUri)
    .then(console.log('server running'))
    .catch(error=> console.log(error));

const multer = require('multer')

//json
app.use(express.json())

//images
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "images")
    },filename:(req,file,cb)=>{
        cb(null, req.body.name)
    }
})

const upload = multer({storage:storage})
app.post('/api/upload', upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded")
})

//routes
const authRoute = require('./routes/auth')
const userRoute = require('./routes/Users')
const categoryRoute = require('./routes/Categorys')
const postRoute = require('./routes/Posts')
app.use('/api', authRoute)
app.use('/api', userRoute)
app.use('/api', categoryRoute)
app.use('/api/post/', postRoute)

//server
app.listen(process.env.PORT, ()=>{
    console.log(`server runnning at port ${process.env.PORT}`)
})
import express from 'express'
import mongoose from 'mongoose'
import { registerValidator, loginValidation, postCreateValidation } from './validations/validations.js'
import {handleValidationErrors, check_auth} from './utils/index.js'
import multer from 'multer'


import {PostController,UserController} from './controllers/index.js'

mongoose
    .connect("mongodb+srv://admin:nono@montaro.whusxcz.mongodb.net/blog")
    .then(()=>console.log("Mongose has connected!"))
    .catch((err) => console.log(err))

const app = express();

const storage = multer.diskStorage({
    destination: (_,__,cb) => {
        cb(null,'uploads')
    },
    filename:(_,file,cb) => {
        cb(null,file.originalname);
    },
});

const upload = multer({ storage });


app.use(express.json())
app.use('/uploads',express.static('uploads'))

app.post('/auth/login',loginValidation, handleValidationErrors, UserController.login)
app.get('/auth/me',check_auth, UserController.getMe)
app.post('/auth/register', registerValidator, handleValidationErrors,UserController.register)

app.post('/upload',check_auth ,upload.single('image'),(req,res) => {
    res.json({ 
        url:`/uploads/${req.file.originalname}`,
    })
})

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.delete('/posts/:id',check_auth, PostController.remove)
app.post('/posts',check_auth,postCreateValidation ,handleValidationErrors,PostController.create)
app.patch('/posts/:id',check_auth,postCreateValidation ,handleValidationErrors, PostController.update)


app.listen(4444,(err)=>{
    if(err)
        return console.log(err)
    console.log("It's all good man(Sol goodman)");
})

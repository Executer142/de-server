import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from '../models/User.js'

export const register = async (req,res) => {
    try {
    
   
       const password = req.body.password;
       const algorithm = await bcrypt.genSalt(10)
       const hash = await bcrypt.hash(password,algorithm);
               
       const doc = new UserModel({
           email:req.body.email,
           fullname:req.body.fullName,
           lastname:req.body.lastName,
           passwordHash:hash
       })
   
       const user = await doc.save()
   
       const token = jwt.sign({   
           _id:user._id,
       },
       "DeathNote",
       {
           expiresIn:"30d",
       })
   
       const { passwordHash, ...userData } = user._doc;
   
       res.json({
           ...userData,
           token
       })
   
    } catch(err) {
       res.json(err);
    }
}

export const login = async (req,res)=>{
    try{
        const user = await UserModel.findOne({ email: req.body.email })
        if(!user)
            return res.status(404).json({message:"no found"})

        const isValidPass = await bcrypt.compare(req.body.password,user._doc.passwordHash);
        if(!isValidPass) {
            return res.status(404).json({
                message:"Не верный логин или пароль"
            })
        }
        
    const token = jwt.sign({   
        _id:user._id,
        },
        "DeathNote",
        {
            expiresIn:"30d",
    })

    const { passwordHash, ...userData } = user._doc;

    res.json({
        ...userData,
        token
    })
        
    }catch(err){
        console.log(err)
        res.json({
            success:false,
            message:"Не удалось авторизоваться"
        })
    }
}

export const getMe = async (req,res) => {
    try {
        const user = await UserModel.findById(req.userId)
        if(!user)
            return res.status(404).json({
                message:" user has no found"
            })
        
        const {passwordHash, ...userData} = user._doc
        res.json(userData)
    } catch(err) {
        console.log(err)
        res.status(404).json({
            message:"You got an error"
        })
    }
}
import { User } from "../Models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


//User Register

export const register = async (req,res)=>{
    const {name,email,password}=req.body;
    try {

        let user = await User.findOne({email})
        if(user) return res.json({message:"User Already Exist",success:false});

        const hashPass =await bcrypt.hash(password,10)

         user = await User.create({name,email,password:hashPass });
        res.json({message:"User Register Successfully!",user,success:true})
        
    } catch (error) {
        res.json({message:error.message})
        
    }
}

//USer Login
export const login = async(req,res)=>{
    const {email,password} = req.body
    try {
        let user = await User.findOne({email});
        if(!user) return res.json({message:"User Not Find",success:false})
            const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword) return res.json({message:"Invalid Credentials",success:false});


        const token = jwt.sign({userId:user._id},"!@#$%^&*()",{
            expiresIn:'365d'
        })

        res.json({message:`Welcome ${user.name}`,token,success:true});
        
    } catch (error) {
        res.json({message:error.message})
        
    }
}

//Get ALL users
export const users = async(req,res)=>{
    try {
        let users = await User.find().sort({createdAT:-1});
        res.json(users)
        
    } catch (error) {
        res.json(error.message)
        
    }
}

//User get Profile

export const profile = async(req,res)=>{
    res.json({user:req.user})
}

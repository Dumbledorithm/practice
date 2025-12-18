import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
console.log("auth.controller loaded");

export const register = async(req,res) => {
    try{

    const userExists = await User.findOne({email:req.body.email});
    if(userExists){
        return res.status(400).json({success:false,error:"User already exists"});
    }

    const user = await User.create(req.body);

    const token = jwt.sign(
        {id:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    )

    return res.status(201).json({
        success:true,
        data:{
            token,
            id:user._id,
            name:user.name,
            role:user.role,
            email:user.email
        }
    })

    }catch(error){
        console.log("registration failed:",error.message);
        return res.status(500).json({success:false,error:"Registration failed"});
    }

}

export const login = async(req,res) => {
    try{

        const {email,password} = req.body;

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({
                success:false,
                error:"Invalid email or password"
            });
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(400).json({
                success:false,
                error:"Invalid email or password"
            });
        }

        const token = jwt.sign(
            {id:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:'1d'});

        return res.status(201).json({
            success:true,
            data:{
                token,
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            }
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            error:"Login failed",
            message:error.message,
        });
    }
}
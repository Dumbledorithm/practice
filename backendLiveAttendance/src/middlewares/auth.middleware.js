import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

export const auth = async(req,res,next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({
                success:false,
                error:"No token provided"
            });
        }

        const token = authHeader.split("")[1];

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select('-password');

        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            error:"invalid token"
        })
    }
}
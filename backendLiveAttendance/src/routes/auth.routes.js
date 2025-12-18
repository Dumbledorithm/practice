import {Router} from 'express';
import {register,login} from '../controllers/auth.controller.js';
import {validateRegister} from '../middlewares/validate.middleware.js';
import {auth} from '../middlewares/auth.middleware.js';

const router = Router();

router.post("/register",validateRegister,register);
router.post("/login",login);
router.get('/me',auth,(req,res)=>{
    return res.status(201).json({
        message:"Profile page",
        user:req.user,
    })
})

export default router;
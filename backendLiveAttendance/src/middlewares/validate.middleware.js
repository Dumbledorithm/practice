import {z} from 'zod';

const registerSchema = z.object({
    name : z.string().min(1),
    email: z.email(),
    password: z.string().min(6),
    role: z.enum(["STUDENT", "TEACHER"]),
    studentId: z.string().optional(),
    facultyId: z.string().optional(),
    course: z.string().optional(),
})

export const validateRegister = (req,res,next) => {
    try{
        registerSchema.parse(req.body);

        if(req.body.role === 'STUDENT' && !req.body.studentId){
            return res.status(400).json({success:false, error:"Student Id required"});
        }

        if(req.body.role === 'TEACHER' && !req.body.facultyId){
            return res.status(400).json({success:false, error:"Faculty Id required"});
        }

        next()
    }catch(error){
        console.log("Registration failed:",error.message);
        return res.status(400).json({
            success:false,
            error:error.errors?.[0]?.message || "Invalid input",
            details:error.message
        });
    }
};
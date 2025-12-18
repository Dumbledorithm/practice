import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },

        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
        },

        password:{
            type:String,
            select:false,
            required:true,
        },

        role:{
            type:String,
            enum:['STUDENT','TEACHER'],
            required:true,
        },

        studentId:{
            type:String
        },

        facultyId:{
            type:String

        },

        cousre:{
            type:String
        }



    },
    {timestamps:true}
);

UserSchema.pre("save",async function(){
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password,10);
});

UserSchema.methods.comparePassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password);
};

const User = mongoose.model("User",UserSchema);

export default User;
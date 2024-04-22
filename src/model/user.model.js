import mongoose, {Schema , model} from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()
const userSchema= new Schema(
   {
      username:{
         type:String,
         required:true,
         unique:true,
         lowercase:true
      },
      email:{
         type:String,
         required:true,
         unique:true,
         lowercase:true,
         trim:true
      },
      fullname:{
         type:String,
         required:true,
         lowercase:true,
      },
      avatar:{
         type:String ,//cloudnary url
         required:true,
      },
      coverimage:{
         type:String ,//cloudnary url
      },
      watchHistory:[
           {
            type:Schema.type.objectID,
            ref:"video"
           }
      ],
      password:{
         type:String,
         required:[true,"password is mandotory"]

      },
      referenceToken:{
         type:String
      }

   },
   {
         timestamps:true
   }
)
userSchema.pre("save",async function(next){
   if(this.isModified("password")){
      next();
   }
   else{
      try{
         this.password=bcrypt.hash(this.password,10)
         next();
      }
      catch(error){
         next(error);
      }
      
   }
})

userSchema.method.isPasswordCorrect= async function(passward){
   return await bcrypt.compare(passward,this.passward);
}


userSchema.method.generateAccessToken=  function(){
   jwt.sign(
      {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
      },
      process.env.ACTION_TOKEN_SECRET 
   )
}
userSchema.method.generateRefrenceToken= async function(){
   return jwt.sign(
      {
        _id:this._id,
      },
      process.env.REFRENCE_TOKEN_SCRIPT,
      {
         expiresIn:process.env.REFRENCE_TOKEN_EXPIRE
      }
   )
}


export const UserModel=model("UserModel",userSchema);
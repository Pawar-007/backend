import mongoose, {Schema , model} from "mongoose";
import  jwt  from "jsonwebtoken";
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
            type:Schema.Types.ObjectId,
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
   if(!this.isModified("password")){
      next();
   }
   else{
      try{
         this.password=await bcrypt.hash(this.password,10)
         next();
      }
      catch(error){
         next(error);
      }
      
   }
})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password);
}


userSchema.methods.generateAccessToken=  function(){
   jwt.sign(
      {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
      },
      process.env.ACTION_TOKEN_SECRET ,
      {
         expiresIn:process.env.ACTION_TOKEN_EXPIRE
      }
   )
}
userSchema.methods.generateRefrenceToken= async function(){
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
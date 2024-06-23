import { asynchandlar} from '../utils/asynchandler.js'
import { ApiError } from '../utils/ApiError.js';
import { UserModel } from '../model/user.model.js';
import {uploadOnCloudnary} from '../utils/cloudnary.js'
import ApiResponse from '../utils/ApiResponse.js'
const regesterUser=asynchandlar(async  (req,res,next)=>{
        //GET user data from frontend
        //valadition -not empty
        //check if user name is already exist
        //check for image ,check for  avatar
        //upload them to cloudnary ,avatar check
        //create user object - create entry in db
        //remove password and refrence token field
        //check for user creation
        //return res
     
       
      const {fullname,username,password,email} = req.body;
     
      
      if (
         [fullname, email, username, password].some((field) => field?.trim() === "")
     ) {
         throw new ApiError(400, "All fields are required")
     }

      // if (fullname === ""){
      //     throw new ApiError(400,"send full name");
      // }
     
      const exist= await UserModel.findOne({
         $or:[{username},{email}]
      })
      console.log("exist  ",exist);
      if(exist){
         throw new ApiError(409,"you are already exist");
         console.log(exist);
      }

      const avatarLocalPath= req.files?.avatar[0]?.path;
      //const coverImageLocalPath=req.files?coverImage[0]?.path: undefined ;

      // let avatarLocalPath;
      // if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length >0)
      // {
      //    avatarLocalPath=req.files?.avatar[0]?.path;
      // }
      console.log("avatar return ",avatarLocalPath);
      let coverImageLocalPath;
      if(req.files && Array.isArray(req.files.coverImage)
        && req.files.coverImage.length > 0){
      coverImageLocalPath=req.files.coverImage[0].path;
   }




      if(!avatarLocalPath){
         throw new ApiError(401,"avatar file is required")
      }
        
      let avatar = await uploadOnCloudnary(avatarLocalPath);
      const coverImg= await uploadOnCloudnary(coverImageLocalPath);
            
       console.log("avatar retun through cloudnary"+avatar)     
      if(!avatar){
         throw new ApiError(400,"avatar file is through cloudnary");
      }
      
      const user=await UserModel.create({
         fullname,
         avatar:avatar.url ,
         coverImage:coverImg?.url || "",
         email,
         password,
         username:username.toLowerCase()
      })
      
      const createUser =await UserModel.findById(user._id).select(
         "-password -referenceToken"
      )
      
      if(!createUser){
         throw new ApiError(200,"something went wrong");
      }
      res.status(201).json(
         new ApiResponse(200,createUser,"user register successfully"
            )
      )
   
       
      res.status(200).json({
         "username":username,
         "email":email,
         "password":password,
         "fullname":fullname,
         "avatar":avatar || null,
         "coverimage":coverImage || ""
      })
      })
     

export {regesterUser};

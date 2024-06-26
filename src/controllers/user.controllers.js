import { asynchandlar} from '../utils/asynchandler.js'
import { ApiError } from '../utils/ApiError.js';
import { UserModel } from '../model/user.model.js';
import {uploadOnCloudnary} from '../utils/cloudnary.js'
import ApiResponse from '../utils/ApiResponse.js'

const generateAccessAndRefereshToken=async(userId)=>{
      const user=await UserModel.findOne(userId);
      const accessToken=await user.generateAccessToken();
      const refereshToken=await user.generateRefrenceToken();

      user.refereshToken=refereshToken;
      await  user.save({ValidateBeforeSave:false})

      return {refereshToken,accessToken}

}
const regesterUser=asynchandlar(async  (req,res)=>{
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
     
// login user 
const userLogin = asynchandlar(async (req,res,next)=>{
           //req.body
           //check username and email 
           //password check
           //access the refresh token 
           //send cookies

      const {email,username,password} = req.body;
      
     if(!username || !email){

      throw new ApiError(400,"username or email require")
       }

      const user = await UserModel.findOne({
         $or:[{username},{email}]
      })
      if(!user){
        throw new ApiError(404,"user is not present in database");
         }

      const isPasswordCorrect = await user.isPasswordCorrect(password);
      
      if(!isPasswordCorrect){
          throw new ApiError(404,"password is wrong");
      }

      const {accessToken,refereshToken}=await 
         generateAccessAndRefereshToken(user._id);

      const logInUser = await UserModel.findById(user._id).
               select("-password -refereshToken")
           
      const options={
         httpOnly:true,
         secure : true
      }

      return res
      .status(200)
      .cookie("accessToken" , accessToken , options)
      .cookie("refereshToken",refereshToken , options)
      .json(
           new ApiResponse(
            200,
            {
               user: logInUser,accessToken,refereshToken
            },
            
            "use login succesfully"
          )
      )
})

const logOutUser=asynchandlar(async(req,res)=>{
   User.findbyIdAndUpdate(
      req.user.id,
      {
         $set:{
            referenceToken:undefined
         }
      },
      {
         new:true
      }
   )
    
   const options={
      httpOnly:true,
      secure : true
   }

   return res
   .status(200)
   .clearCookie("accessToken",options)
   .clearCookie("refereshToken",options)
   .json(new ApiResponse(200,"user logged out"))

})

const users = asynchandlar(async (req, res, next) => {
    try {
        const users = await UserModel.find(); // Exclude sensitive fields

        return res.status(200).json(
            new ApiResponse(
                200,
                users,
                "Successfully retrieved all users"
            )
        );
    } catch (error) {
      next(new ApiError(500, error.message || "Failed to retrieve users"));
    }
});

const deleteEntry = async(req,res)=>{
   try {
      await UserModel.deleteMany(); // This deletes all documents in the UserModel collection

      return res.status(200).json(
          new ApiResponse(
              200,
              null,
              "Successfully deleted all users"
          )
      );
  } catch (error) {
      next(new ApiError(500, error.message || "Failed to delete users"));
  }
 }
export {regesterUser,userLogin,logOutUser,users};
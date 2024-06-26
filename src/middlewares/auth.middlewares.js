import { ApiError } from "../utils/ApiError.js";
import { asynchandlar } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken"
import { UserModel } from "../model/user.model.js";
export const verifyJwt=asynchandlar(async(req,res,next)=>{
            try {
               const token = await req.cookies?.accessToken ||
                        req.header("Authorization")?.replace("Bearer","");
               
   
               if(!token){
                  throw new ApiError(401,"unauthorized request");
               }
   
            const decodeToken = await jwt.verify(token,process.env
              .ACTION_TOKEN_SECRET )
            
            const user=await UserModel.findById(decodeToken._id)
            .select("-password refereshToken");
   
            if(!user){
               throw new ApiError(401,"invalid access token")
            }
            
            req.user=user;
            next();
            } catch (error) {
               throw new ApiError(404,error?.message || "invalid access token");
            }
                       


      })


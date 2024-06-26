import { v2 as cloudinary } from "cloudinary";
import fs, { unlink } from 'fs'

cloudinary.config({ 
   cloud_name: process.env.CLOUDNARY_CLOUD_NAME , 
   api_key: process.env.CLOUDNARY_API_KEY, 
   api_secret: process.env.CLOUDNARY_API_SECRET 
 });


 const uploadOnCloudnary=async (localFilePath)=>{
  try{
    if(!localFilePath) return null
     //upload the file on cloudnary
    const responce= await cloudinary.uploader.upload(localFilePath,{
      resource_type:"auto"
    })
    console.log("file is uploded at cloudnary");

  

    return responce;
  }
  catch(error){
      fs.unlinkSync(localFilePath)//remove the
      //locally saved temporary file as the uplode operation got failed
      console.error("Upload failed:", error);
      return null;
  }
    
 }

 export {uploadOnCloudnary};
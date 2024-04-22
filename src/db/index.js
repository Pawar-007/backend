import mongoose from "mongoose";
import { DB_Name } from "../constants.js";
import dotenv from 'dotenv'
dotenv.config()
//DB is in another continent
const ConnectDB=async ()=>{
   try {
   
      const connectionInitial= await mongoose.connect(`${process.env.DATABASE_URL}/
      ${DB_Name}`);

      console.log(`mongoose connected || DB HOST : ${connectionInitial.connection.host}`);
   } catch (error) {
      console.error("mongoDB connection FAILD ",error);
      process.exit();
   }
}

export default ConnectDB;  
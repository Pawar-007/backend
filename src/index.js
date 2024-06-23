import dotenv from "dotenv";
import ConnectDB from "./db/index.js";
import {app} from './app.js'

dotenv.config({
   path: "./env"
});

ConnectDB().then(()=>{
   app.on('error',()=>{
      console.log('error')
      throw error
   })
   app.listen(process.env.PORT || 4000 ,()=>{
      console.log(`servers is running at port ${process.env.PORT}`)
   })
}).catch((error)=>{
   console.log(`Error in dataconnection ${error}`)
});


/*
import  express  from "express";
const app=express();
;(async ()=>{
   try{
      await mongoose.connect(`${process.env.database_url}/${DB_Name}`)
      app.on("error",(error)=>{
           console.log("error");
           throw error;
      })
      app.listen(process.env.PORT,()=>{
         console.log(`app listen at port ${process.env.PORT}`)
      })
   }
   catch(error){
      console.error("error");
      throw err
   }
})()*/                     
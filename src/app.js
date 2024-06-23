import express from 'express'
import cookieParser from 'cookie-parser';
import cros from 'cors'
const app=express();

app.use(cros(
   {
      origin:process.env.CROS_ORIGIN,
      Credential:true
   }
))
app.use(express.json({limit:"20kb"}))
app.use(express.static("public"))
app.use(express.urlencoded({limit:"16kb",extended:true}))
app.use(cookieParser())


//import routes
import userRouter from './routes/user.router.js';

//routes declaration

app.use("/api/v1/users",userRouter)

export {app};



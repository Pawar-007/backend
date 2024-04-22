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
app.use(express.urlencoded({}))
app.use(cookieParser())
export {app};
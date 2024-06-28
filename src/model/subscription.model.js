import  { Schema,model } from "mongoose";
import { UserModel } from "./user.model";

const subscription= new Schema({
   subscriber:{
      type: Schema.types.objectId, //onse who subscribing
      ref:"UserModel",
      require:true,
   },
   channel:{
      type :Schema.types.objectId, //one who suscriber is suscribing
      ref:"UserModel",
      require:true
   },
   
},{
   timestamps:true
})

export const subScriber=new model("subScriber",subscription);

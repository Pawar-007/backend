import mongoose ,{Schema, model} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema= new Schema(
   {
      videofile:{
         type:String,
         required:true
      },
      thumbnail:{
         type:String,
         required:true
      },
      title:{
         type:String,
         required:true
      },
      description:{
         type:String,
         required:true
      },
      duration:{
         type:Number,//cloudnary url
         required:true
      },
      views:{
         type:Number,
         default:0
      },
      ispublished:{
         type:String,
         require:true,
      },
      owner:{
         type:Schema.type.objectId,
         ref:"user"
      }

   },
   {
      timestamps:true,
   }
)

videoSchema.plugin(mongooseAggregatePaginate);
export const videomodel = model("VideoModel",videoSchema);
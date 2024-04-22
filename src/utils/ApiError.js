export class ApiError extends Error{
   constructor(
      statuscode,
      message="something went wrong",
      error=[],
      statck=""
   ){
       super(message);
       this.statusCode=statuscode;
       this.data=null;
       this.stack=statck;
       this.errors=error;

       if(statck){
         this.stack=statck;
       }
       else{
         Error.captureStackTrace(this,this.constructor)
       }
   }
}
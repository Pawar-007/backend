export class ApiError extends Error{
   constructor(
      statuscode,
      message="something went wrong",
      error=[],
      stack=""
   ){
       super(message);
       this.statusCode=statuscode;
       this.data=null;
       this.stack=stack;
       this.errors=error;

       if(stack){
         this.stack=stack;
       }
       else{
         Error.captureStackTrace(this,this.constructor)
       }
   }
}
class ApiResponse {
   constructor(statuscode,message="something went wrong"){
      this.statuscode=statuscode,
      this.message=message,
      this.seccess=statuscode<400
   }
}

export default ApiResponse;
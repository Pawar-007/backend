 export  const asynchandlar= (requesthandlar)=>{
      return (req,res,next)=>{
            return new Promise((request,response)=>{
                 const result=requesthandlar(req,res,next);
                 return result;
             })
            .catch((error)=>{
               console.log("this is error",error);
               
            })
      }
   }

// const asynchandlar= ()=>{}
// const asynchandlar= (res) => () => {};
// const asynchandlar = (res) => { () => {} }

/*const asynchandlars= (fun)=>async(req,res,next)=>{
   try{
       await fun(req,res,next);
   }catch(error){
         res.status(err.code || 404).json({
            success:false
         })
   }
}*/

// function requesthandlar(req,res,next){
//    res.send("response accepted")
// }

// function asynchandlar(requesthandlar){
//    return (req,res,next)=>{
//       Promise.resolve(requesthandlar(req,res,next))
//       .catch((error)=>{
//           console.log(error);
//       })
//    }
// }e
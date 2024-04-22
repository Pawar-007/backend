   const asynchandlar= (requesthandlar)=>{
      (req,res,next)=>{
            Promise(requesthandlar(req,res,next))
            .catch((error)=>{
               console.log(error)
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
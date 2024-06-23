const result=(add)=>{
   return (req,res,next)=>{
      Promise(add(req,res)).
      catch((err)=>{
         next(err)
      })
   }
}


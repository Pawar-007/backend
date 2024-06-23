const newApi=async(req,res)=>{
   const newsdatas=[];
   try{
     const data=await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${process.env.NEWS_API_KEY}`)
     const newsdata=await data.json()
     newsdatas.push(newsdata)
     res.status(200).json(newsdatas);
     
   }
   catch(error){
      console.log("news error",error);
      res.status(500).json({ error: "Internal Server Error" }); 
   }
}

export {newApi}
const addpromo=async(req,res)=>{
  const { promo,totalprice} = req.body
  if(promo=="WELCOME50"){
   let promoprice= (totalprice/100)*50
  let  netprice = totalprice-promoprice
  
  res.json({
    success:true,
    netprice
  })


  }
  else{
    return res.json({
        success:false
    })
  }



}

module.exports= addpromo
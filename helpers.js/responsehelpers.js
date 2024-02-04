class responsehelper {

static errorresponse(err,res){
  res.status(400).json({
    success:false,
    error:err,
    message:"hello"
  })


}

static successresponse(data,res){
  res.status(200).json({
    success:true,
    data
  })
}




}
module.exports=responsehelper
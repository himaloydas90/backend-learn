const bankmidelwere = (req,res,next)=>{
    const password = 123456;
    const {pass} = req.body;
   
    if (password===pass){
        next()
    }else{
        return res.send("password is not correct")
    }

}

module.exports = bankmidelwere 
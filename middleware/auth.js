exports.isAth =  (req,res,next)=>{
    if(req.session.UserId)
     {
          next() 
        
     }

    else {
        
        res.redirect("login")
    }
}
exports.isAdmin =  (req,res,next)=>{
    if(req.session.isAdmin)
     {
          next() 
        
     }

    else {
        res.redirect('/')
    }
}

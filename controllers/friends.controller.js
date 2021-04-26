const userModel = require("../models/users.model")


exports.add = (req,res,next)=>{
 userModel.sendRequiest(req.body).then(()=>{
    res.redirect("/profile/" + req.body.friendId) 
    console.log(err)
 }
  
     
 ).catch(err=>{
    res.redirect("/") 
    console.log(err)
 })   
}
exports.cancel = (req,res,next)=>{
    userModel.cancalRequiest(req.body).then(()=>{
        res.redirect("/profile/" + req.body.friendId) 
        console.log(err)
     }
      
         
     ).catch(err=>{
        res.redirect("/") 
        console.log(err)
     }) 
   
     
    }
    exports.reject = (req,res,next)=>{
      userModel.rejectFreind(req.body).then(()=>{
         res.redirect("/profile/" + req.body.friendId) 
         console.log(err)
      }
       
          
      ).catch(err=>{
         res.redirect("/") 
         console.log(err)
      })      
   
    }
exports.accept = (req,res,next)=>{

   userModel.acceptRequiest(req.body).then(()=>{
      res.redirect("/profile/" + req.body.friendId) 
      console.log(err)
   })
   
}

exports.delete = (req,res,next)=>{
   
   userModel.deleteFriend(req.body).then(()=>{
      res.redirect("/profile/" + req.body.friendId) 
      console.log(err)
   })
}
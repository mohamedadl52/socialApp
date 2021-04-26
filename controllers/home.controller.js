const User = require('../models/users.model')
const vaildtionResulte =require('express-validator').validationResult

exports.gethome = (req,res,next)=>{

  
     res.render('index' , {
          isUser : req.session.UserId  
        })
  
    

  


}

// get page login and rejister
exports.getlogin = (req, res, next)=>{

  
   res.render('login' , {
     errors : req.flash("errlogin")[0] ,
     isUser : req.session.UserId  ,
    vaildatorErr : req.flash("vaildatorErr")
   })
}
exports.getrejister = (req, res, next)=>{
   res.render('rejister' , {
    errors : req.flash("errlogin")[0] ,
    vaildatorErr : req.flash("vaildatorErr") ,
    isUser : req.session.UserId  
   })
}




// post page login and rejister



exports.postlogin = (req, res, next)=>{

  if(vaildtionResulte(req).isEmpty()){

       User.login( req.body.email , req.body.password ).then((resulte)=>{
    req.session.UserId = String(resulte.id)
    req.session.name = resulte.username ,
    req.session.image = resulte.image  
    res.redirect("/")
    next()
    }).catch((err)=>{
      
    req.flash('errlogin' , err)

    console.log(err)

    res.redirect("/login")
    })
  } else {
    
    req.flash("vaildatorErr" , vaildtionResulte(req).array() )
    res.redirect('/login')

  }

  

  }


exports.postrejister = (req, res, next)=>{

  if(vaildtionResulte(req).isEmpty()){
    User.rejisteruser(req.body.username , req.body.email , req.body.password ).then(()=>{
      res.redirect("/login")   
    }).catch((err)=>{
      console.log(err)
      
      req.flash('errlogin' , err)
      res.redirect('/rejister')
    }) 

  }
  else {
    req.flash("vaildatorErr" , vaildtionResulte(req).array() )
    res.redirect('/rejister')

  }
 
}






exports.logout = (req , res , next)=>{

req.session.destroy(()=>{


  res.redirect('/login')


})

}





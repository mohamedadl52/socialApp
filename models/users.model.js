const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    email : String , 
    username : String , 
    password : String ,
    image : {type : String , default : "imageUser-default.jpg"} ,
    isOnline : {type : Boolean , default : false} ,
    friends : {
        type : [{name : String , image : String , id : String}] ,
        default : []
    } ,
    friendsRequests : {
        type : [{name : String ,  id : String}] ,
        default : []
    } ,
    sentRequests : {
        type : [{name : String ,  id : String}] ,
        default : []
    }

})

const User = mongoose.model("user" , userSchema)



exports.rejisteruser = (username, email , password )=>{
    return new Promise((resolve , reject)=>{
         
        mongoose.connect('mongodb://localhost/chat-app', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
            
           return User.findOne({
               email : email
           }).then((user)=>{
                 if(user) {   
            mongoose.disconnect()
            reject("email is used")
                 }

                 else {
                     return bcrypt.hash(password , 10)
                 }
           }).then((hachpasssword)=>{
               let user = new User({
                   username : username ,
                   email : email ,           
                   password : hachpasssword 
               })
               return user.save()
           }).then (()=>{

            mongoose.disconnect()
               resolve()
               
           }).catch((err)=>{
               
            mongoose.disconnect()
               reject(err)
           })



         })
      
     })
}

exports.login = (email , password)=>{


   return new Promise((resolve , reject)=>{
mongoose.connect('mongodb://localhost/chat-app', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{ 
      User.find({
        email : email
    }).then((user)=>{
        

        if (user.length <= 0) {
        mongoose.disconnect()   
        reject("email is not found")
                
             }


        else {
                 bcrypt.compare( password , user[0].password ).then((same)=>{
                         if(!same){
                            mongoose.disconnect()
                            reject("passowrd is wrong")
                        }
                        else {
                        mongoose.disconnect()
                        resolve(user[0])
                            }
                    })

             }


        }).catch((err)=>{
            mongoose.disconnect()
           
            console.log(err)
        })
  }) 
})
         
    


}


exports.getUserData = (id)=>{
  return new Promise((resolve , reject)=>{
      
      mongoose.connect('mongodb://localhost/chat-app', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    return User.findById(id)
    
}).then(data=>{
    resolve(data)
    mongoose.disconnect()
}).catch(err=>{
    reject(err)
    mongoose.disconnect()
    console.log(err)
})

})
}



// friends operations

exports.sendRequiest = async (data)=>{
    try {
     await mongoose.connect('mongodb://localhost/chat-app', {useNewUrlParser: true, useUnifiedTopology: true}) ;
     await User.updateOne({_id : data.friendId} , {$push : {friendsRequests   : {id : data.myID , name : data.myname}}} ) ;
     await User.updateOne({_id : data.myID} , {$push : {sentRequests   : {id : data.friendId , name : data.friendName}}} ) ;
   
     mongoose.disconnect()
     return
 } catch(err) {
        mongoose.disconnect()
         throw new Error(err)
    }
 
 }

exports.cancalRequiest = async (data)=>{
    try {
     await mongoose.connect('mongodb://localhost/chat-app', {useNewUrlParser: true, useUnifiedTopology: true}) ;
     await User.updateOne({_id : data.friendId} , {$pull : {friendsRequests   : {id : data.myID , name : data.myname}}} ) ;
     await User.updateOne({_id : data.myID} , {$pull : {sentRequests   : {id : data.friendId , name : data.friendName}}} ) ;
   
     mongoose.disconnect()
     return
 } catch(err) {
        mongoose.disconnect()
         throw new Error(err)
    }
 
 }


 exports.rejectFreind = async (data)=>{
    try {
     await mongoose.connect('mongodb://localhost/chat-app', {useNewUrlParser: true, useUnifiedTopology: true}) ;
     await User.updateOne({_id : data.friendId} , {$pull : {sentRequests   : {id : data.myID , name : data.myname}}} ) ;
     await User.updateOne({_id : data.myID} , {$pull : {friendsRequests   : {id : data.friendId , name : data.friendName}}} ) ;
   
     mongoose.disconnect()
     return
 } catch(err) {
        mongoose.disconnect()
         throw new Error(err)
    }
 
 }


exports.acceptRequiest = async (data)=>{
    try {
        await mongoose.connect('mongodb://localhost/chat-app', {useNewUrlParser: true, useUnifiedTopology: true}) ;
        await User.updateOne({_id : data.friendId} , {$push : {friends   : {id : data.myID , name : data.myname}}} ) ;
        await User.updateOne({_id : data.myID} , {$push : {friends   : {id : data.friendId , name : data.friendName}}} ) ;
        await User.updateOne({_id : data.friendId} , {$pull : {  sentRequests : {id : data.myID , name : data.myname}}} ) ;
        await User.updateOne({_id : data.myID} , {$pull : {  friendsRequests : {id : data.friendId , name : data.friendName}}} ) ;
   
     mongoose.disconnect()
     return
 } catch(err) {
     mongoose.disconnect()
     throw new Error(err)
    }
 
 }
 
 
exports.deleteFriend = async (data)=>{
    try {
        await mongoose.connect('mongodb://localhost/chat-app', {useNewUrlParser: true, useUnifiedTopology: true}) ;
        
        await User.updateOne({_id : data.friendId} , {$pull : {  friends : {id : data.myID , name : data.myname}}} ) ;
        await User.updateOne({_id : data.myID} , {$pull : {  friends : {id : data.friendId , name : data.friendName}}} ) ;
   
     mongoose.disconnect()
     return
 } catch(err) {
     mongoose.disconnect()
     throw new Error(err)
    }
 
 }
 

 exports.getFreindRequiest = async (id)=>{
  try{
    await mongoose.connect('mongodb://localhost/chat-app', {useNewUrlParser: true, useUnifiedTopology: true}) ;
     const data = await User.findById(id , {friendsRequests : true})
    
     return data.friendsRequests
  } catch(err){

     mongoose.disconnect()
     throw new Error(err)
  }
 }
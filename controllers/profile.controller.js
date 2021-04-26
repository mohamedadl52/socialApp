const userShcema = require("../models/users.model")



exports.getprofile = (req,res,next)=>{
    let id = req.params.id 
    if(!id) return res.redirect('/profile/' + req.session.UserId)
     userShcema.getUserData(id).then(data=>{
               res.render("profile" , {
                   userImage : data.image ,
                   myID : req.session.UserId ,
                   myname : req.session.name ,
                   friendRequiest : req.freindRequiest ,
                   myImage: req.session.image ,
                   isUser : req.session.UserId ,
                   userName : data.username ,
                   friendId : data._id , 
                   isOwner : id === req.session.UserId ,
                   isFriends : data.friends.find(friend=> friend.id === req.session.UserId),
                   isRequestsSent : data.friendsRequests.find(friend=> friend.id === req.session.UserId),
                   isRequestsRecieved : data.sentRequests.find(friend=> friend.id === req.session.UserId)
               })
     }).catch(err=>{
         console.log(err)
     })
}
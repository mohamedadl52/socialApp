const express = require("express")
const mongoose  = require('mongoose')
const app = express()
const bodyBarser = require('body-parser')
const path = require("path")
const sesstion = require('express-session') 
const SessitonStore = require('connect-mongodb-session')(sesstion)
const flash = require('connect-flash')
const SoketIO = require('socket.io')
const server = require('http').createServer(app)
const io = SoketIO(server)

io.on("connection" , (sokect)=>{
require("./sockets/init.socket")(sokect)
})
app.use(express.static(path.join(__dirname , "assets")))
app.use(express.static(path.join(__dirname , "images")))

app.use(bodyBarser.urlencoded({
    extended : false
}))

const Usermodel  = require('./models/users.model')






    
app.use(flash())
const Store = new SessitonStore({
  uri : 'mongodb://localhost/chat-app' ,
  collection : 'sessions'
})

app.use(sesstion({
    resave : false ,
    secret : 'mohamed adel mohamed civil34' ,
    saveUninitialized : false ,
    store : Store
    
}))


app.set("view engine" , "ejs")
app.set('views' , 'views')

app.use((req,res,next)=>{
    if(req.session.UserId){
Usermodel.getFreindRequiest(req.session.UserId).then(request=>{
    req.freindRequiest = request
    next()
} ).catch(err => res.redirect('/'))
    }
    else {
   next()
    }
})

app.use("/" , require('./routes/home.route'))
app.use("/profile" , require('./routes/profile.route'))
app.use("/friend" , require('./routes/friend.route'))

const myPort = process.env.PORT || 8080
server.listen(myPort , (err)=>{
    console.log("server is connected to port 8080")
})
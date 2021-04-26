module.exports = socket =>{
    socket.on("joinNotificationRoom" , id => {
        socket.join(id)
        console.log("joind" , id)
    })
}
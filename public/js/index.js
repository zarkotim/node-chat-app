   var socket= io();
    socket.on("connect", function(){
        console.log("connected")
       
    });
       socket.on("disconnect", function(){
        console.log("disconnected from browser")
    });
    
    socket.on("newMessage", function(message) {
        console.log("New Message", message)
    });
   var socket= io();
    socket.on("connect", function(){
        console.log("connected")
        socket.emit("createMessage", {
            from: "Zarko",
            text: "Como estas tio ?worksss"
        })
        
    });
       socket.on("disconnect", function(){
        console.log("disconnected from browser")
    });
    
    socket.on("newEmail", function(email) {
        console.log("New Email::::", email)
    });
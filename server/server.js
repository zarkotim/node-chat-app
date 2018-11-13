const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const app = express();
var server = http.createServer(app)
var io = socketIO(server);


io.on("connection", (socket)=>{
    console.log("New user connected! App.js")
    
    socket.emit("newEmail", {
        from: "zarko@cgmail.com",
        text: "Hey whats up",
        createdAt: "who knows..."
    });
    
    socket.on("createMessage", (message)=>{
        console.log(message)
    })
    
    
    
    
    socket.on("disconnect", ()=>{
        console.log("Disconnected from appr")
    })
})


const publicPath = path.join(__dirname , "../public")
const port = process.env.port || 3000;
app.use(express.static(publicPath))

server.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server Has Started on the port ",port);
});


console.log(__dirname , "../public");
console.log(publicPath);
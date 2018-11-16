const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const app = express();
var server = http.createServer(app)
var io = socketIO(server);

const {generateMessage}= require("./utils/message")
io.on("connection", (socket)=>{
    console.log("New user connected! App.js")
    // socket.emit from Admin text WElcome to the chat app;
    socket.emit("newMessage", generateMessage("Admin", "Welcome to the CHAT APP!!!"));
    
    //socket.broadcoast.emit from admin text New user joined;
   socket.broadcast.emit("newMessage", generateMessage("Admin", "New USER joined!"))
    
    socket.on("createMessage", (message)=>{
      
     console.log(message)
      
    //  io.emit("newMessage", {
     
    //       from: message.from,
      
    //      text: message.text,
     
    //       createdAt: new Date().getTime()
     
    //   })
   // socket.broadcoast.emit("newMessage", {
     //   from: message.from,
     //   text: message.text,
     //   createdAt: new Date().getTime()
   // })
   
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
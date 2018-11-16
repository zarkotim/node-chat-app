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
    
    socket.on("createMessage", (message, callback)=>{
      
     console.log(message)
      
      io.emit("newMessage", generateMessage(message.from, message.text))
      callback("This is from server");

   
     })
    
    socket.on("createLocationMessage", (coords)=>{
      io.emit("newMessage", generateMessage("Admin", coords.latitude +" "+ coords.longitude))
    })
    
    
    socket.on("disconnect", ()=>{
        console.log("Disconnected from appr")
    })
})


const publicPath = path.join(__dirname , "../public")
const port = process.env.port || 3000;
app.use(express.static(publicPath))

server.listen(3000, process.env.IP, function(){
   console.log("Server Has Started on the port ",port);
});


console.log(__dirname , "../public");
console.log(publicPath);
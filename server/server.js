const path = require("path");
const express = require("express");

const app = express();


const publicPath = path.join(__dirname , "../public")
const port = process.env.port || 3000;
app.use(express.static(publicPath))

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server Has Started on the port ",port);
});


console.log(__dirname , "../public");
console.log(publicPath);
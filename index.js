const express = require('express');
const http = require('http');
const { disconnect } = require('process');
const {Server} = require("socket.io")
const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"))


io.on("connection", (socket)=>{
    io.emit("connected-user-id",  socket.id)
    console.log("user loggedin.");
    socket.on("disconnect", ()=>{
        io.emit("disconnected-user-id",  socket.id);
        console.log("user logged out");
    })

    socket.on("user-message", (message)=>{
        io.emit("message", message)
    })
})

app.get("/", (req, res)=>{
    return res.sendFile("./public/index.html")
})


server.listen(8000, ()=>{
    console.log("server started on port: 8000")
})


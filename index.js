const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {

   let nickNameSaved = "";

  socket.on("disconnect", () => {
    io.emit("disconnected-user-nick-name", nickNameSaved);

  });

  socket.on("user-message-data", (messageData) => {
    socket.broadcast.emit("message-data", messageData);
  });

  socket.on("connected-user-nick-name", (nickName) => {
    nickNameSaved = nickName;
    io.emit("connected-user-nick-name", nickName);
  });
});

app.get("/", (req, res) => {
  return res.sendFile("./public/index.html");
});

server.listen(8000, () => {
  console.log("server started on port: 8000");
});

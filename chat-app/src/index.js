const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const { generateMessage, generateLocationMessage } = require("./utils/message");
const Filter = require("bad-words");
const app = express();

const server = http.createServer(app);
const io = socketio(server);
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");

const publicdirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicdirectoryPath));

let count = 0;
io.on("connection", (socket) => {
  console.log("New web socket connection");
  //socket.emit('message',generateMessage('Welcome'));
  //socket.broadcast.emit('message',generateMessage('A new user has joined'));//it sends event to all other clients except itself
  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });
    if (error) {
      return callback(error);
    }

    socket.join(user.room);
    //socket.emit , io.emit , socket.broadcast.emit
    //io.to().emit (emits events to everybody in specific room),socket.broadcast.to.emit ->to communicate within room
    socket.emit("message", generateMessage('Admin',"Welcome"));
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage('Admin',`${user.username} has joined`)); // to emit within room except self
    callback();
    io.to(user.room).emit('roomData',{
        room:user.room,
        users:getUsersInRoom(user.room)
    })
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    let filter = new Filter();
    if (filter.isProfane(message)) {
      return callback("Profane words not allowed", undefined);
    }
    io.to(user.room).emit("message", generateMessage(user.username,message)); //sends msg to each connected client
    callback(undefined, "Delivered successfully");
  });

  socket.on("send-location", (position, callback) => {
    const user = getUser(socket.id);
    //console.log("Postion",position)
    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(
        user.username,
        `https://google.com/maps?q=${position.latitude},${position.longitude}`
      )
    );
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage('Admin',`${user.username} has left the chat`)
      );
      io.to(user.room).emit('roomData',{
        room:user.room,
        users:getUsersInRoom(user.room)
    })
    }
  });
  let message = "Hello from server";
  //socket.emit('message',message)
  // socket.emit('countUpdated',count);
  // socket.on('increment',()=>{
  //     count++;
  //     socket.emit('countUpdated',count)//emits event to specific connection
  //     io.emit('countUpdated',count)//emits event to all connections
  // })
});

server.listen(3000, () => {
  console.log("Server is up on port", 3000);
});

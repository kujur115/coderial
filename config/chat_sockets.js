module.exports.chatSockets = (socketServer) => {
  let io = require("socket.io")(socketServer, {
    cors: {
      origin: "http://localhost:8000",
      methods: ["GET", "POST"],
    },
  });
  io.sockets.on("connection", (socket) => {
    console.log("new connection received", socket.id);

    socket.on("disconnect", () => {
      console.log("socket disconnected!");
    });

    socket.on("join_room", (data) => {
      console.log("joining request rec.", data);
      socket.join(data.chatroom);
      io.in(data.chatroom).emit("user_joined", data);
    });

    socket.on("send_message", (data) => {
      io.in(data.chatroom).emit("receive_message", data);
    });
    
  });
};

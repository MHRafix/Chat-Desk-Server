export const socketSetup = (socket: any): void => {
  socket.on("setup", (userData: any) => {
    socket.join(userData?._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room: any) => {
    socket.join(room);
  });

  socket.on("typing", (room: any) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room: any) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved: any) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user: any) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", (userData: any) => {
    socket.leave(userData?._id);
  });
};

interface ISignupApiRes {
  _id?: string;
  user_name: string;
  user_email: string;
  user_role: boolean;
  user_pic: string;
  success: string;
  token: string | undefined;
}

interface ICUser {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user_email: string;
  user_name: string;
  user_pic: string;
  user_role: boolean;
  __v: number;
}

export const socketSetup = (socket: any): void => {
  socket.on("setup", (userData: ISignupApiRes) => {
    socket.join(userData?._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room: string) => {
    socket.join(room);
  });

  socket.on("typing", (room: string) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room: string) =>
    socket.in(room).emit("stop typing")
  );

  socket.on("new message", (newMessageRecieved: any) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user: ICUser) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", (userData: ISignupApiRes) => {
    socket.leave(userData?._id);
  });
};

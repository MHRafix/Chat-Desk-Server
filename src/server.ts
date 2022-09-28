import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { connectDB } from "./config/db";
import { errorHandler, notFound } from "./middleware/errorHandler";
import authRoutes from "./routes/authentication/authRoutes";
import groupChatRoutes from "./routes/chats/groupChat";
import singleChatRoutes from "./routes/chats/singleChat";
import messageRoutes from "./routes/messaging/messageRoute";

// create express app
const app: Express = express();
app.use(express.json()); // to accept json data
dotenv.config(); // support .env file
connectDB(); // db connect
const port = process.env.PORT; // port

// cors origin error handler
app.use(
  cors({
    origin: "https://chat-desk.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// home route
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript ChatDesk Server!");
});

// all route
app.use("/api/v1/authentication/users", authRoutes);
app.use("/api/v1/chats/single_chat", singleChatRoutes);
app.use("/api/v1/chats/group_chat", groupChatRoutes);
app.use("/api/v1/messages/", messageRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at https://chatdesk.onrender.com`
  );
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://chat-desk.vercel.app",
  },
});

// signup api response interface
interface ISignupApiRes {
  _id?: string;
  user_name: string;
  user_email: string;
  user_role: boolean;
  user_pic: string;
  success: string;
  token: string | undefined;
}

io.on("connection", (socket: any) => {
  socket.on("setup", (userData: ISignupApiRes) => {
    socket.join(userData._id);
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
    socket.leave(userData._id);
  });
});

import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { connectDB } from "./config/db";
import { socketSetup } from "./config/socketInit";
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
    //origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// home route
app.get("/", (req: Request, res: Response) => {
  res.send("⚡️ Express + TypeScript ChatDesk Server!");
});

// all route
app.use("/api/v1/authentication/users", authRoutes);
app.use("/api/v1/chats/single_chat", singleChatRoutes);
app.use("/api/v1/chats/group_chat", groupChatRoutes);
app.use("/api/v1/messages/", messageRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

// app listening
const server = app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at https://chatdesk-server.up.railway.app`
  );
});

// socket.io init
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    //origin: "*",
    origin: "https://chat-desk.vercel.app",
  },
});

// socket.io setup
io.on("connection", socketSetup);

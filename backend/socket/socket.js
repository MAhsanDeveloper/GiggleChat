import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/message.model.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://foolish-ailis-gigglechatmafyr-b522f9e2.koyeb.app/",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  socket.on("message-delivered", async ({ messageId, receiverId }) => {
    try {
      await Message.findByIdAndUpdate(messageId, {
        $addToSet: { deliveredTo: receiverId }, // Avoid duplicates
      });

      // Notify sender that it was delivered
      // Find the message to get senderId
      const message = await Message.findById(messageId);
      if (message) {
        const senderSocketId = userSocketMap[message.senderId.toString()];
        if (senderSocketId) {
          io.to(senderSocketId).emit("message-delivered", {
            messageId,
            receiverId,
          });
        }
      }
    } catch (error) {
      console.error("Error updating message-delivered:", error.message);
    }
  });
  socket.on("message-read", async ({ messageId, userId }) => {
    try {
      await Message.findByIdAndUpdate(messageId, {
        $addToSet: { readBy: userId }, // Avoid duplicates
      });

      io.emit("message-read", {
        messageId,
        userId,
      });
    } catch (error) {
      console.error("Error updating message-read:", error.message);
    }
  });
});

export { app, io, server };

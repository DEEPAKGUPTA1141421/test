import express from 'express';
import WebSocket, { WebSocketServer } from 'ws';
import bcrypt from 'bcrypt';
import neo4j from 'neo4j-driver';
import path from 'path';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import shopRoutes from './routes/shopRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import deliveryAgentRoutes from './routes/deliveryAgentRoutes';
import adminRoutes from './routes/adminRoutes';
import chatRoutes from './routes/chatRoutes';
import paymentRoutes from './routes/paymentRoutes';
import errorHandler from './utils/errorHandler';
import connectDb from './config/database';

dotenv.config();

const app = express();

const uri = "neo4j+s://d98b54cd.databases.neo4j.io";
const user = "neo4j";
const password = "ycW2VqPh2HHwTXJP29ZgVBFz4vA-PGa3hHsj-2W93NU";
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(fileUpload());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

cloudinary.v2.config({
  cloud_name: "drt8pxy1q",
  api_key: "578449198298885",
  api_secret: "TDSnd4NoPgZ9NdsUz9LaRg5u8oU",
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Running Successfully",
  });
});

app.use("/uploads", express.static("uploads"));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/shop", shopRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/rider", deliveryAgentRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/chat", chatRoutes);

app.use(errorHandler);
connectDb();

const httpServer = app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});

const allChatParticipation = new Map();
const userToSocket = new Map();
const socketToUser = new Map();

const wss = new WebSocketServer({ server: httpServer });
const Welcome_Type = "Welcome_Type";

wss.on('connection', (currentSocket) => {
  currentSocket.on('error', console.error);
  console.log("User connected");

  currentSocket.on('message', (data, isBinary) => {
    try {
      const parsedData = JSON.parse(data);

      if (parsedData.type === "setUserId") {
        console.log("SET_USER_ID");
        socketToUser.set(currentSocket, parsedData.userId);
        userToSocket.set(parsedData.userId, currentSocket);
      } else if (parsedData.type === "selectChat") {
        console.log("selectChat", parsedData);
        allChatParticipation.set(socketToUser.get(currentSocket), parsedData.userArray);
      } else if (parsedData.type === "sendMessage") {
        console.log(parsedData);
        const userArray = allChatParticipation.get(socketToUser.get(currentSocket));

        userArray.forEach((elem) => {
          const userSocket = userToSocket.get(elem);
          if (userSocket && userSocket !== currentSocket && userSocket.readyState === WebSocket.OPEN) {
            userSocket.send(JSON.stringify(parsedData.message));
          }
        });
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  currentSocket.on('close', () => {
    const userId = socketToUser.get(currentSocket);
    if (userId) {
      socketToUser.delete(currentSocket);
      userToSocket.delete(userId);
      allChatParticipation.delete(userId);
    }
    console.log("User disconnected and cleaned up");
  });

  currentSocket.send(JSON.stringify({ message: 'Hello! Message From Server!!', type: Welcome_Type }));
});

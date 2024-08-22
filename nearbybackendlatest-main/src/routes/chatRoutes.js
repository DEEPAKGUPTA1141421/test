import express from 'express';
import { accesschat, fetchchat, sendmessage, allmessage } from '../controller/chatController.js';
import { isAuthenticated } from '../middleware/authorised.js';

const router = express.Router();

router.get('/accesschat/:receiverId', isAuthenticated, accesschat);
router.get("/fetchchat", isAuthenticated, fetchchat);
router.post('/sendmessage/:chatId', isAuthenticated, sendmessage);
router.get("/allmessage/:chatId", isAuthenticated, allmessage);

export default router;

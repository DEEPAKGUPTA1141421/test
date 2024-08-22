import express from 'express';
import { createOrder, deleteOrder, updateOrderStatus } from '../controller/orderController.js';
import { isAuthenticated } from '../middleware/authorised.js';

const router = express.Router();

router.post("/create", isAuthenticated, createOrder);
// router.put("/update/:id", updateOrderStatus);
router.delete("/delete/:id", deleteOrder);

export default router;

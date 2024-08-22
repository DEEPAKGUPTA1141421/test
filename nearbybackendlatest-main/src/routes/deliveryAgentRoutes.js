import express from 'express';
import {
  deleteorderByRider,
  createRider,
  receiveOrder,
  deliverOrder
} from '../controller/deliveryAgentController.js';

const router = express.Router();

router.post("/create", createRider);
router.delete("/delete/:id", deleteorderByRider);
router.get("/receiveOrder/:id", receiveOrder);
router.get("/deliverOrder/:id", deliverOrder);

export default router;

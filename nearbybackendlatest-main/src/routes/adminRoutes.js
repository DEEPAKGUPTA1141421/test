import express from 'express';
import {
  getAllProductsInProcessing,
  allocateOrders,
  createPayment,
  paySeller,
  payRider,
  getinfopaymentrider,
  getinfopaymentseller
} from '../controller/adminController.js';
import { isAuthenticated } from '../middleware/authorised.js';

const router = express.Router();

router.get("/get", isAuthenticated, getAllProductsInProcessing);
router.get("/getriderpayment", getinfopaymentrider);
router.get("/getsellerpayment", getinfopaymentseller);
router.post("/createpayment", createPayment);
router.post("/allocateOrder/:trackingid", allocateOrders);
router.post("/payseller", paySeller);
router.post("/payrider", payRider);

export default router;

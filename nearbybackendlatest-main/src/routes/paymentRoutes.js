import express from 'express';
import { checkout, paymentVerification, getkey, savePaymentToDb } from '../controller/paymentController.js';

const router = express.Router();

router.post("/checkout", checkout);
router.get("/getkey", getkey);
router.post("/paymentVerification", paymentVerification);
router.post("/savepaymenttodb", savePaymentToDb);

export default router;

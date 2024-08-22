import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
  searchProducts
} from '../controller/productController.js';
import { isAuthenticated } from '../middleware/authorised.js';

const router = express.Router();

router.get("/get/:id", getProduct);
router.get("/search", searchProducts);
router.post("/create/:shopId", isAuthenticated, createProduct);
router.put("/update/:id", isAuthenticated, updateProduct);
router.delete("/delete/:id", isAuthenticated, deleteProduct);

export default router;

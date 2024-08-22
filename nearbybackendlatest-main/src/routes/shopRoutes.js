import express from 'express';
import {
  createShop,
  getshopInfo,
  updateShopInfo,
  getAllProduct,
  createOtp,
  getAllOrderOfShop,
  bestshop,
  getAllShopOfCity,
  getAllProductForUser,
  gettopshop,
} from '../controller/shopController.js';
import { isAuthenticated } from '../middleware/authorised.js';

const router = express.Router();

router.post("/create", isAuthenticated, createShop);
router.get("/get", isAuthenticated, getshopInfo);
router.get('/gettopshop', gettopshop);
router.put("/updateshop/:id", updateShopInfo);
router.get("/getAllProduct", isAuthenticated, getAllProduct);
router.get("/createotp/:id", createOtp);
router.get("/getallorderofshop/:id", getAllOrderOfShop);
router.get("/getAllProductforuser/:id", getAllProductForUser);
router.get("/bestshop", bestshop);
router.get("/getallshopofcity/:city", getAllShopOfCity);

export default router;

import express from 'express';
import {
  signup,
  createActualUser,
  login,
  getUser,
  updateUser,
  deleteUser,
  orders,
  addToCart,
  addToWishlist,
  wishlistToCart,
  addComment,
  createOtp,
  cartItems,
  createuserfornow,
  test,
  loaduser,
  wishlistItems,
  removeItemFromWishlist,
  removeItemFromCart,
  logout,
  clearCart,
  cartToWishlist
} from '../controller/userController.js';
import { isAuthenticated } from '../middleware/authorised.js';

const router = express.Router();

router.get("/test", test);
router.get("/loaduser", isAuthenticated, loaduser);
router.post("/signup", signup);
router.post("/createuser", createuserfornow);
router.post("/activation", createActualUser);
router.post("/login", login);
router.delete("/logout", isAuthenticated, logout);
router.get("/get/:id", getUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/getallorders", isAuthenticated, orders);
router.get("/cartitems", isAuthenticated, cartItems);
router.get("/clearcart", isAuthenticated, clearCart);
router.get("/cart/:id", isAuthenticated, addToCart);
router.delete("/removefromcart/:id", isAuthenticated, removeItemFromCart);
router.get("/wishlist/:id", isAuthenticated, addToWishlist);
router.get("/wishlistToCart/:id", isAuthenticated, wishlistToCart);
router.get("/cartToWishlist/:id", isAuthenticated, cartToWishlist);
router.delete("/removefromwishlist/:id", isAuthenticated, removeItemFromWishlist);
router.post("/addcomment/:id", addComment);
router.get("/wishlistItems/:id", wishlistItems);
router.get("/createotp/:id", createOtp);

export default router;

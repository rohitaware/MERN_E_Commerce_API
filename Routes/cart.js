import express from "express";
import {
  addToCart,
  clearCart,
  decreaseProductQty,
  removeProductFromCart,
  userCart,
} from "../Controllers/cart.js";

import { Authenticated } from "../Middlewares/auth.js"; 

const router = express.Router();

// Add To Cart
router.post("/add",Authenticated,addToCart);

// Get user cart
router.get("/user", Authenticated, userCart);

// Remove product from cart
router.delete("/remove/:productId", Authenticated, removeProductFromCart);

// Clear cart
router.delete("/clear", Authenticated,clearCart);

// Decrease item Qty
router.post("/decrease-qty",Authenticated,decreaseProductQty); // Corrected route

export default router;

import express from "express";
import { verifyToken } from "../middlewares/authToken";
import {
    addToCart,
    clearCart,
    decreaseQuantity,
    getCartByUserId,
    increaseQuantity,
    removeFromCart,
    updateSubTotal,
} from "../controllers/CartController";

const cartRouter = express.Router();

cartRouter.get("/api/cart/:userId", verifyToken, getCartByUserId);
cartRouter.post("/api/cart/add", verifyToken, addToCart);
cartRouter.put("/api/cart/increase/:id", verifyToken, increaseQuantity);
cartRouter.put("/api/cart/decrease/:id", verifyToken, decreaseQuantity);
cartRouter.put("/api/cart/updateSubTotal/:id", verifyToken, updateSubTotal);
cartRouter.delete("/api/cart/remove/:id", verifyToken, removeFromCart);
cartRouter.delete("/api/cart/clear/:userId", verifyToken, clearCart);

export default cartRouter;

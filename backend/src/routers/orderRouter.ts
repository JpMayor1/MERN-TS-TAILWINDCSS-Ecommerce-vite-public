import express from "express";
import {
    createOrder,
    deleteOrder,
    getOrders,
    getUserOrderById,
    getUserOrders,
    updateOrder,
} from "../controllers/orderController";
import { verifyAdminToken, verifyToken } from "../middlewares/authToken";

const orderRouter = express.Router();

orderRouter.get("/api/orders", verifyAdminToken, getOrders);
orderRouter.get("/api/orders/user/:id", verifyToken, getUserOrders);
orderRouter.get("/api/orders/user/order/:id", verifyToken, getUserOrderById);
orderRouter.post("/api/orders/create", verifyToken, createOrder);
orderRouter.put("/api/orders/update/:id", verifyAdminToken, updateOrder);
orderRouter.delete("/api/orders/delete/:id", verifyAdminToken, deleteOrder);

export default orderRouter;

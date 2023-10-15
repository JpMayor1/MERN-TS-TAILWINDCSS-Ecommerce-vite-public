import asynchandler from "express-async-handler";
import { OrderModel } from "../models/orderModel";
import { Request, Response } from "express";

// Get all orders
export const getOrders = asynchandler(async (req: Request, res: Response) => {
    try {
        const orders = await OrderModel.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

// Get orders of the authenticated user
export const getUserOrders = asynchandler(
    async (req: Request, res: Response) => {
        try {
            const userId = req.params.id; // Get the user ID from the authenticated user's token
            const orders = await OrderModel.find({ userId });
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch orders" });
        }
    }
);

// Get orders of the authenticated user by order ID
export const getUserOrderById = asynchandler(
    async (req: Request, res: Response) => {
        try {
            const orderId = req.params.id; // Get the order ID from the request params

            const order = await OrderModel.findById({ _id: orderId });

            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch orders" });
        }
    }
);

export const createOrder = async (req: Request, res: Response) => {
    const {
        paypalOrderId,
        userId,
        username,
        email,
        cpNumber,
        address,
        products,
        total,
        paymentMethod,
        paid,
        note,
    } = req.body;

    try {
        console.log("Received request body:", req.body); // Debugging line

        // Check if products is an array
        if (!Array.isArray(products)) {
            return res.status(400).json({ error: "Invalid products data" });
        }

        // Create the order with the provided data
        const order = await OrderModel.create({
            paypalOrderId: paypalOrderId ? paypalOrderId : "",
            userId,
            username,
            email,
            cpNumber,
            address,
            products,
            total,
            paymentMethod,
            paid,
            status: "pending",
            note: note || "No note",
        });

        res.status(201).json({ message: "Order created", order });
    } catch (error) {
        res.status(500).json({ error: "Failed to create order" });
        console.log(error);
    }
};

// Update order
export const updateOrder = asynchandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const { status, paid } = req.body;
    // Implement updating order status or other properties as needed
    try {
        await OrderModel.findByIdAndUpdate(id, { status, paid }, { new: true });
        res.status(200).json({ message: "Order updated" });
    } catch (error) {
        res.status(500).json({ error: "Error updating order" });
    }
});

// Delete order (not necessary for basic implementation)
export const deleteOrder = asynchandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    // Implement deleting order as needed
    try {
        await OrderModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Order deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting order" });
    }
});

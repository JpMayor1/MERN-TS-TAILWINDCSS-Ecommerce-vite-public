import asynchandler from "express-async-handler";
import { Request, Response } from "express";
import { CartModel } from "../models/cartModel";

// Get Cart By User ID
export const getCartByUserId = asynchandler(
    async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const cart = await CartModel.find({ userId });
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch cart" });
        }
    }
);

// Add to Cart
export const addToCart = asynchandler(async (req: Request, res: Response) => {
    try {
        const { userId, name, image, price } = req.body;

        // Check if the product already exists in the cart for the user
        const existingCartItem = await CartModel.findOne({
            userId: userId,
            name: name,
        });

        if (existingCartItem) {
            // If the product exists, increase its quantity and update subtotal
            existingCartItem.quantity += 1;
            existingCartItem.subTotal = existingCartItem.quantity * price;
            await existingCartItem.save();
            res.status(200).json(existingCartItem);
        } else {
            // If the product doesn't exist, create a new cart item
            const cart = await CartModel.create({
                userId,
                name,
                image,
                price,
                quantity: 1,
                subTotal: price,
            });
            res.status(200).json(cart);
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to add to cart" });
    }
});

// Increase Quantity
export const increaseQuantity = asynchandler(
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const cart = await CartModel.findByIdAndUpdate(
                id,
                { $inc: { quantity: 1 } },
                { new: true }
            );
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: "Failed to increase quantity" });
        }
    }
);

// Decrease Quantity
export const decreaseQuantity = asynchandler(
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const cart = await CartModel.findByIdAndUpdate(
                id,
                { $inc: { quantity: -1 } },
                { new: true }
            );
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: "Failed to decrease quantity" });
        }
    }
);

// Update Total
export const updateSubTotal = asynchandler(
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { subTotal } = req.body;
            const cart = await CartModel.findByIdAndUpdate(
                id,
                { subTotal },
                { new: true }
            );
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: "Failed to update total" });
        }
    }
);

// Remove from Cart
export const removeFromCart = asynchandler(
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const cart = await CartModel.findByIdAndDelete(id);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: "Failed to remove from cart" });
        }
    }
);

//Clear Cart
export const clearCart = asynchandler(async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const cart = await CartModel.deleteMany({ userId });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: "Failed to clear cart" });
    }
});

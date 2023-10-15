import asynchandler from "express-async-handler";
import { ProductModel } from "../models/productModel";
import { Request, Response } from "express";

// Get all products
export const getProducts = asynchandler(async (req: Request, res: Response) => {
    const products = await ProductModel.find();
    res.json(products);
});

// Get product by id
export const getProduct = asynchandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const product = await ProductModel.findOne({ _id: id });
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

// Search products by name
export const searchProducts = asynchandler(
    async (req: Request, res: Response) => {
        const searchTerm = req.query.name;
        try {
            const products = await ProductModel.find({
                name: { $regex: searchTerm, $options: "i" },
            });
            res.json(products);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error searching for product" });
        }
    }
);

// Create product
export const createProduct = asynchandler(
    async (req: Request, res: Response) => {
        const product = await ProductModel.create(req.body);
        res.status(201).json({ message: "Product created", product });
    }
);

// Update product
export const updateProduct = asynchandler(
    async (req: Request, res: Response) => {
        const product = await ProductModel.findById(req.params.id);
        const { name, price, image, countInStock, publicId } = req.body;
        if (product) {
            const newProduct = {
                name,
                price,
                image,
                countInStock,
                publicId,
            };
            const updatedProduct = await ProductModel.findByIdAndUpdate(
                req.params.id,
                newProduct,
                { new: true }
            );
            res.status(200).json({
                message: "Product updated",
                updatedProduct,
            });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    }
);

// Delete product
export const deleteProduct = asynchandler(
    async (req: Request, res: Response) => {
        try {
            await ProductModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Product deleted" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting product", error });
        }
    }
);

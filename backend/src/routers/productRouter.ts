import express from "express";
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    searchProducts,
    updateProduct,
} from "../controllers/productController";
import { verifyAdminToken, verifyToken } from "../middlewares/authToken";

const productRouter = express.Router();

productRouter.get("/api/products", verifyToken, getProducts);
productRouter.get("/api/products/search", verifyToken, searchProducts);
productRouter.get("/api/products/:id", verifyToken, getProduct);
productRouter.post("/api/products/create", verifyAdminToken, createProduct);
productRouter.put("/api/products/update/:id", verifyAdminToken, updateProduct);
productRouter.delete(
    "/api/products/delete/:id",
    verifyAdminToken,
    deleteProduct
);

export default productRouter;

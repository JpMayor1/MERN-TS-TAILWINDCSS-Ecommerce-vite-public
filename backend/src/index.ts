import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter";
import userRouter from "./routers/userRouter";
import orderRouter from "./routers/orderRouter";
import cors from "cors";
import morgan from "morgan";
import imageController from "./routers/ImageRouter";
import cartRouter from "./routers/cartRouter";

// Middlewares
const app = express();
dotenv.config();
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

// Database
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.set("strictQuery", true);
mongoose
    .connect(MONGODB_URL as string)
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log("Error connecting to database", err);
    });

// Routes
app.use(productRouter);
app.use(userRouter);
app.use(orderRouter);
app.use(imageController);
app.use(cartRouter);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server on port", PORT);
});

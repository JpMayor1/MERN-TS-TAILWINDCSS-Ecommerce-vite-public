import express from "express";
import {
    deleteImage,
    uploadImage,
} from "../controllers/ImageController";
import { verifyAdminToken } from "../middlewares/authToken";

const imageRouter = express.Router();

imageRouter.post("/api/upload", verifyAdminToken, uploadImage);
imageRouter.delete("/api/delete/:publicId", verifyAdminToken, deleteImage);

export default imageRouter;

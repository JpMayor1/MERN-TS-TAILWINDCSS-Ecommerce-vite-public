import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (req: Request, res: Response) => {
    try {
        const { image } = req.body;

        // Upload image to Cloudinary using async/await
        const uploadResult = await cloudinary.uploader.upload(image, {
            overwrite: true,
            invalidate: true,
            resource_type: "auto",
        });

        const publicId = uploadResult.public_id;

        // Send the secure URL as a response
        return res
            .status(201)
            .json({ imageUrl: uploadResult.secure_url, publicId });
    } catch (error) {
        console.error("Error uploading image:", error);
        return res.status(500).json({ message: "Error uploading image" });
    }
};

export const deleteImage = async (req: Request, res: Response) => {
    try {
        const { publicId } = req.params;

        // Delete image from Cloudinary using async/await
        const deleteResult = await cloudinary.uploader.destroy(publicId);

        if (deleteResult.result === "ok") {
            return res.status(204).send();
        } else {
            return res.status(500).json({ message: "Error deleting image" });
        }
    } catch (error) {
        console.error("Error deleting image:", error);
        return res.status(500).json({ message: "Error deleting image" });
    }
};

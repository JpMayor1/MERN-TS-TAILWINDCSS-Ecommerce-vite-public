import asynchandler from "express-async-handler";
import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get all users
export const getUsers = asynchandler(async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error getting users" });
    }
});

// Register user
export const registerUser = asynchandler(
    async (req: Request, res: Response) => {
        const { username, email, password, isAdmin, cpNumber, address } = req.body;
        try {
            const userExist = await UserModel.findOne({ email });
            if (userExist) {
                res.status(400).json({ message: "User already exists" });
                return;
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                username,
                email,
                password: hashedPassword,
                isAdmin: isAdmin ? isAdmin : false,
                cpNumber,
                address,
            };

            const user = await UserModel.create(newUser);

            res.status(201).json({ message: "User created", user });
        } catch (error) {
            res.status(500).json({ error: "Error creating user" });
        }
    }
);

// Login user
export const loginUser = asynchandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user?.password as string
        );
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        // Generate token
        const token = jwt.sign(
            { id: user?._id, isAdmin: user?.isAdmin },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );

        const loggedInUser = {
            _id: user?._id,
            username: user?.username,
            email: user?.email,
            isAdmin: user?.isAdmin,
            cpNumber: user?.cpNumber,
            address: user?.address,
        };

        res.json({ message: "Login successful", loggedInUser, token });
    } catch (error) {
        res.status(500).json({ error: "Error logging in user" });
    }
});

// delete user
export const deleteUser = asynchandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await UserModel.findByIdAndDelete(id);
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
    }
});

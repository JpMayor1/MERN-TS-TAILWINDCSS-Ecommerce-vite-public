import express from "express";
import {
    deleteUser,
    getUsers,
    loginUser,
    registerUser,
} from "../controllers/userController";
import { verifyAdminToken } from "../middlewares/authToken";

const userRouter = express.Router();

userRouter.get("/api/users", verifyAdminToken, getUsers);
userRouter.post("/api/user/register", registerUser);
userRouter.post("/api/user/login", loginUser);
userRouter.delete("/api/user/delete/:id", verifyAdminToken, deleteUser);

export default userRouter;

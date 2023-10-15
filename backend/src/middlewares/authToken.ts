import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedData {
    id: string;
    isAdmin: boolean;
}

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const hasToken = req.headers.authorization;
        if (!hasToken || !hasToken.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ message: "No token, authorization denied" });
        }

        const token = hasToken.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET! as string, (err, data) => {
            if (err) {
                return res.status(401).json({ message: "Token is not valid" });
            } else {
                req.user = data as Request["user"];
                next();
            }
        });
    } catch (error) {
        return res.status(500).json({ error: "Error verifying token" });
    }
};

export const verifyAdminToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const hasToken = req.headers.authorization;
        if (!hasToken || !hasToken.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ message: "No token, authorization denied" });
        }

        const token = hasToken.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET! as string, (err, data) => {
            if (err) {
                return res.status(401).json({ message: "Token is not valid" });
            }

            const { isAdmin } = data as DecodedData;

            if (!isAdmin) {
                return res
                    .status(401)
                    .json({ message: "Not authorized as admin" });
            } else {
                req.user = data as Request["user"];
                next();
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Error verifying token" });
    }
};

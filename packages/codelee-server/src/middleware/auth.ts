import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface UserPayload {
      id: string;
      name: string;
      email: string;
    }
    interface Request {
      user?: UserPayload;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "인증이 필요합니다." });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "인증이 필요합니다." });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as { userId: string };

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    }

    // Attach user to request
    req.user = user;

    return next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "인증에 실패했습니다." });
  }
};

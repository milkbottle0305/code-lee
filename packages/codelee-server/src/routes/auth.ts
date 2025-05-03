import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

// Validation schemas
const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Ensure JWT_SECRET is set
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET 환경변수가 설정되어 있지 않습니다.");
}

// 라우터를 함수로 변경하여 prisma를 주입받음
export function createAuthRouter(prisma: PrismaClient) {
  const router = express.Router();

  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: 회원가입
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [name, email, password]
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       201:
   *         description: 회원가입 성공
   *       400:
   *         description: 잘못된 입력 또는 중복 이메일
   */
  // Register a new user
  router.post("/register", async (req, res) => {
    try {
      // Validate request body
      const validation = registerSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ errors: validation.error.format() });
      }

      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "이미 등록된 이메일입니다." });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, jwtSecret as string, {
        expiresIn: "7d",
      });

      // Return user data (excluding password) and token
      return res.status(201).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      console.error("Register error:", error);
      return res
        .status(500)
        .json({ message: "회원가입 중 오류가 발생했습니다." });
    }
  });

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: 로그인
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [email, password]
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: 로그인 성공
   *       400:
   *         description: 잘못된 입력
   *       401:
   *         description: 인증 실패
   */
  // Login user
  router.post("/login", async (req, res) => {
    try {
      // Validate request body
      const validation = loginSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ errors: validation.error.format() });
      }

      const { email, password } = req.body;

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res
          .status(401)
          .json({ message: "이메일 또는 비밀번호가 올바르지 않습니다." });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "이메일 또는 비밀번호가 올바르지 않습니다." });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, jwtSecret as string, {
        expiresIn: "7d",
      });

      // Return user data (excluding password) and token
      return res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      return res
        .status(500)
        .json({ message: "로그인 중 오류가 발생했습니다." });
    }
  });

  return router;
}

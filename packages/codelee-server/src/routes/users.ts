import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../middleware/auth";

export function createUsersRouter(prisma: PrismaClient) {
  const router = express.Router();

  /**
   * @swagger
   * /users/me:
   *   get:
   *     summary: 내 프로필 조회
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: 내 프로필 정보
   *       401:
   *         description: 인증 필요
   */
  router.get("/me", authenticate, async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "인증 정보가 없습니다." });
      }
      const userId = req.user.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, createdAt: true },
      });
      if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error("Get user profile error:", error);
      return res
        .status(500)
        .json({ message: "프로필을 가져오는 중 오류가 발생했습니다." });
    }
  });

  /**
   * @swagger
   * /users/me/comments:
   *   get:
   *     summary: 내가 작성한 댓글 목록 조회
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         description: 페이지 번호
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: 페이지당 개수
   *     responses:
   *       200:
   *         description: 내 댓글 목록
   *       401:
   *         description: 인증 필요
   */
  router.get("/me/comments", authenticate, async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "인증 정보가 없습니다." });
      }
      const userId = req.user.id;
      const { page = "1", limit = "10" } = req.query;
      const pageNumber = Number.parseInt(page as string);
      const limitNumber = Number.parseInt(limit as string);
      const skip = (pageNumber - 1) * limitNumber;

      const [comments, totalCount] = await Promise.all([
        prisma.comment.findMany({
          where: { authorId: userId },
          include: {
            file: { select: { name: true, path: true } },
            commit: { select: { message: true, date: true } },
            replies: { select: { id: true } },
          },
          orderBy: { createdAt: "desc" },
          skip,
          take: limitNumber,
        }),
        prisma.comment.count({ where: { authorId: userId } }),
      ]);

      const totalPages = Math.ceil(totalCount / limitNumber);

      return res.status(200).json({
        comments,
        pagination: {
          total: totalCount,
          page: pageNumber,
          limit: limitNumber,
          totalPages,
        },
      });
    } catch (error) {
      console.error("Get user comments error:", error);
      return res
        .status(500)
        .json({ message: "댓글을 가져오는 중 오류가 발생했습니다." });
    }
  });

  return router;
}

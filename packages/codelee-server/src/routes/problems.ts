import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../middleware/auth";

export function createProblemsRouter(prisma: PrismaClient) {
  const router = express.Router();

  /**
   * @swagger
   * /problems:
   *   get:
   *     summary: 문제 목록 조회
   *     tags: [Problems]
   *     parameters:
   *       - in: query
   *         name: difficulty
   *         schema:
   *           type: string
   *         description: 난이도 필터
   *       - in: query
   *         name: techStack
   *         schema:
   *           type: string
   *         description: 기술스택 필터
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
   *         description: 문제 목록
   */
  router.get("/", async (req, res) => {
    try {
      const { difficulty, techStack, page = "1", limit = "10" } = req.query;

      const pageNumber = Number.parseInt(page as string);
      const limitNumber = Number.parseInt(limit as string);
      const skip = (pageNumber - 1) * limitNumber;

      // Build filter conditions
      const where: any = {};

      if (difficulty) {
        where.difficulty = difficulty;
      }

      if (techStack) {
        where.techStacks = {
          some: {
            name: {
              equals: techStack as string,
            },
          },
        };
      }

      // Get problems with pagination
      const [problems, totalCount] = await Promise.all([
        prisma.problem.findMany({
          where,
          include: {
            techStacks: true,
          },
          skip,
          take: limitNumber,
          orderBy: {
            updatedAt: "desc",
          },
        }),
        prisma.problem.count({ where }),
      ]);

      // Calculate total pages
      const totalPages = Math.ceil(totalCount / limitNumber);

      res.status(200).json({
        problems,
        pagination: {
          total: totalCount,
          page: pageNumber,
          limit: limitNumber,
          totalPages,
        },
      });
    } catch (error) {
      console.error("Get problems error:", error);
      res
        .status(500)
        .json({ message: "문제 목록을 가져오는 중 오류가 발생했습니다." });
    }
  });

  /**
   * @swagger
   * /problems/{id}:
   *   get:
   *     summary: 문제 상세 조회
   *     tags: [Problems]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: 문제 ID
   *     responses:
   *       200:
   *         description: 문제 상세 정보
   *       401:
   *         description: 인증 필요
   *       404:
   *         description: 문제 없음
   */
  router.get("/:id", authenticate, async (req, res) => {
    try {
      const { id } = req.params;

      const problem = await prisma.problem.findUnique({
        where: { id },
        include: {
          techStacks: true,
          commits: {
            include: {
              files: true,
            },
            orderBy: {
              date: "desc",
            },
          },
        },
      });

      if (!problem) {
        res.status(404).json({ message: "문제를 찾을 수 없습니다." });
        return;
      }

      res.status(200).json(problem);
    } catch (error) {
      console.error("Get problem error:", error);
      res
        .status(500)
        .json({ message: "문제를 가져오는 중 오류가 발생했습니다." });
    }
  });

  return router;
}
